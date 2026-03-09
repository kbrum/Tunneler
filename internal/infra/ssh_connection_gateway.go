package infra

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net"
	"strings"
	"sync"
	"time"

	"golang.org/x/crypto/ssh"
)

type SSHConnectionGateway struct {
	logger *slog.Logger

	mu      sync.RWMutex
	client  *ssh.Client
	session *ssh.Session
	stdin   io.WriteCloser
	stdout  io.Reader
	stderr  io.Reader
	done    chan error
}

func NewSSHConnectionGateway(logger *slog.Logger) *SSHConnectionGateway {
	return &SSHConnectionGateway{logger: logger}
}

func (g *SSHConnectionGateway) DialSession(ctx context.Context, hostIP string, port string, password string, username string) error {
	host := strings.TrimSpace(hostIP)
	sshPort := strings.TrimSpace(port)
	sshPassword := strings.TrimSpace(password)
	sshUser := strings.TrimSpace(username)

	if host == "" {
		return errors.New("host IP cannot be empty")
	}
	if sshPort == "" {
		return errors.New("port cannot be empty")
	}
	if sshPassword == "" {
		return errors.New("password cannot be empty")
	}
	if sshUser == "" {
		return errors.New("username cannot be empty")
	}

	config := &ssh.ClientConfig{
		User: sshUser,
		Auth: []ssh.AuthMethod{
			ssh.Password(sshPassword),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		Timeout:         10 * time.Second,
	}

	address := net.JoinHostPort(host, sshPort)
	conn, err := ssh.Dial("tcp", address, config)
	if err != nil {
		g.logger.Error("failed to dial", slog.String("error", err.Error()))
		return err
	}

	session, err := conn.NewSession()
	if err != nil {
		_ = conn.Close()
		g.logger.Error("failed to create session", slog.String("error", err.Error()))
		return err
	}

	stdin, err := session.StdinPipe()
	if err != nil {
		_ = session.Close()
		_ = conn.Close()
		g.logger.Error("failed to create stdin pipe", slog.String("error", err.Error()))
		return err
	}

	stdout, err := session.StdoutPipe()
	if err != nil {
		_ = session.Close()
		_ = conn.Close()
		g.logger.Error("failed to create stdout pipe", slog.String("error", err.Error()))
		return err
	}

	stderr, err := session.StderrPipe()
	if err != nil {
		_ = session.Close()
		_ = conn.Close()
		g.logger.Error("failed to create stderr pipe", slog.String("error", err.Error()))
		return err
	}

	if err := session.Shell(); err != nil {
		_ = session.Close()
		_ = conn.Close()
		g.logger.Error("failed to start shell", slog.String("error", err.Error()))
		return err
	}

	done := make(chan error, 1)
	go func() {
		done <- session.Wait()
		close(done)
	}()

	g.mu.Lock()
	_ = g.disconnectSessionLocked()
	g.client = conn
	g.session = session
	g.stdin = stdin
	g.stdout = stdout
	g.stderr = stderr
	g.done = done
	g.mu.Unlock()

	return nil
}

func (g *SSHConnectionGateway) ConnectSessionAsync(ctx context.Context, hostIP string, port string, password string, username string) error {

	go func() {
		if err := g.DialSession(ctx, hostIP, port, password, username); err != nil {
			g.logger.Error("failed to connect async", slog.String("error", err.Error()))
		}
	}()

	go func() {
		if ctx == nil {
			return
		}

		select {
		case <-ctx.Done():
			if err := g.DisconnectSession(context.Background()); err != nil {
				g.logger.Error("failed to disconnect after context cancel", slog.String("error", err.Error()))
			}
		}
	}()

	return nil
}

func (g *SSHConnectionGateway) Stdin() (io.WriteCloser, error) {
	g.mu.RLock()
	defer g.mu.RUnlock()

	if g.stdin == nil {
		return nil, errors.New("stdin is not initialized")
	}

	return g.stdin, nil
}

func (g *SSHConnectionGateway) Stdout() (io.Reader, error) {
	g.mu.RLock()
	defer g.mu.RUnlock()

	if g.stdout == nil {
		return nil, errors.New("stdout is not initialized")
	}

	return g.stdout, nil
}

func (g *SSHConnectionGateway) Stderr() (io.Reader, error) {
	g.mu.RLock()
	defer g.mu.RUnlock()

	if g.stderr == nil {
		return nil, errors.New("stderr is not initialized")
	}

	return g.stderr, nil
}

func (g *SSHConnectionGateway) Wait() (<-chan error, error) {
	g.mu.RLock()
	defer g.mu.RUnlock()

	if g.done == nil {
		return nil, errors.New("session wait channel is not initialized")
	}

	return g.done, nil
}

func (g *SSHConnectionGateway) DisconnectSession(ctx context.Context) error {
	g.mu.Lock()
	defer g.mu.Unlock()

	return g.disconnectSessionLocked()
}

func (g *SSHConnectionGateway) disconnectSessionLocked() error {
	var closeErr error

	if g.session != nil {
		if err := g.session.Close(); err != nil {
			closeErr = errors.Join(closeErr, fmt.Errorf("failed to close session: %w", err))
		}
	}

	if g.client != nil {
		if err := g.client.Close(); err != nil {
			closeErr = errors.Join(closeErr, fmt.Errorf("failed to close client: %w", err))
		}
	}

	g.client = nil
	g.session = nil
	g.stdin = nil
	g.stdout = nil
	g.stderr = nil
	g.done = nil

	if closeErr != nil {
		g.logger.Error("failed to disconnect session", slog.String("error", closeErr.Error()))
	}

	return closeErr
}
