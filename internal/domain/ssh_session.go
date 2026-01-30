package domain

import (
	"context"
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
	CreateSSHSession(ctx context.Context, sshSession *SSHSession) error
	GetSSHSessions(ctx context.Context) ([]*SSHSession, error)
	GetSSHSessionTags(ctx context.Context, userID string) ([]string, error)
	UpdateSSHSession(ctx context.Context, sshSession *SSHSession) error
	DeleteSSHSession(ctx context.Context, sessionID string) error
}
