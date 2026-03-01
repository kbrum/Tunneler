package infra

import (
	"context"
	"log/slog"
)

type SSHConnectionGateway struct {
	logger *slog.Logger
}

func NewSSHConnectionGateway(logger *slog.Logger) *SSHConnectionGateway {
	return &SSHConnectionGateway{logger: logger}
}

func (g *SSHConnectionGateway) ConnectSession(ctx context.Context, hostIP string, port string, password string, username string) error {
	return nil
}

func (g *SSHConnectionGateway) DisconnectSession(ctx context.Context, hostIP string, port string, password string, username string) error {
	return nil
}
