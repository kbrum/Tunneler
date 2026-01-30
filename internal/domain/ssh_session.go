package domain

import (
	"context"
	"errors"
)

type SSHSession struct {
	ID             string
	SSHSessionName string
	SSHSessionIP   string
	SSHSessionPort int
	Tags           []string
	UserID         string
	KeyID          string
	FolderID       string
}

type SSHSessionRepository interface {
	CreateSSHSession(ctx context.Context, sshSession *SSHSession) (*SSHSession, error)
	GetSSHSession(ctx context.Context, userID string) ([]*SSHSession, error)
	GetSSHSessionTags(ctx context.Context, userID string) ([]string, error)
	UpdateSSHSession(ctx context.Context, sshSession *SSHSession) (*SSHSession, error)
	DeleteSSHSession(ctx context.Context, sessionID string) (bool, error)
}

var (
	EmptyIPError     = errors.New("IP address cannot be empty")
	EmptyPortError   = errors.New("Port cannot be empty")
	EmptyUserIDError = errors.New("User ID cannot be empty")
)

func ValidadeIP(sshSession *SSHSession) error {
	if sshSession.SSHSessionIP == "" {
		return EmptyIPError
	}
	return nil
}

func ValidadePort(sshSession *SSHSession) error {
	if sshSession.SSHSessionPort == 0 {
		return EmptyPortError
	}
	return nil
}

func ValidadeUserID(sshSession *SSHSession) error {
	if sshSession.UserID == "" {
		return EmptyUserIDError
	}
	return nil
}
