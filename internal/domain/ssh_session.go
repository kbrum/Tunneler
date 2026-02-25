package domain

import (
	"context"
	"errors"
	"time"
)

type Status string

const (
	StatusOffline Status = "offline"
	StatusActive  Status = "active"
	StatusPending Status = "pending"
	StatusClosed  Status = "closed"
	StatusFailed  Status = "failed"
)

type AuthType string

const (
	AuthTypePassword AuthType = "password"
	AuthTypeKey      AuthType = "key"
	AuthTypeBoth     AuthType = "both"
)

type SSHSessionAudit struct {
	LastExitCode int    `json:"last_exit_code"`
	LastReason   string `json:"last_reason"`
}

type SSHSessionSecurity struct {
	Fingerprint string `json:"fingerprint"`
	KnownHost   bool   `json:"known_host"`
}

type SSHSessionInventory struct {
	Distro string `json:"distro"`
	Kernel string `json:"kernel"`
}

type SSHSessionMetadata struct {
	Audit     SSHSessionAudit     `json:"audit"`
	Security  SSHSessionSecurity  `json:"security"`
	Inventory SSHSessionInventory `json:"inventory"`
}

type SSHSession struct {
	ID        string
	CreatedAt time.Time
	Name      string
	User      string
	Password  string
	IP        string
	Port      int
	Status    Status
	AuthType  AuthType
	UserID    string
	KeyID     string
	LastLogin time.Time
	Metadata  SSHSessionMetadata
}

type SSHSessionRepository interface {
	CreateSSHSession(ctx context.Context, token string, sshSession *SSHSession, userID string, hashedPassword string, keyID string) (*SSHSession, error)
	GetSSHSessions(ctx context.Context, token string, userID string) ([]*SSHSession, error)
	GetSSHSessionByID(ctx context.Context, token string, sessionID string) (*SSHSession, error)
	GetPassword(ctx context.Context, token string, sessionID string) (string, error)
	UpdateSSHSession(ctx context.Context, token string, sshSession *SSHSession) (*SSHSession, error)
	DeleteSSHSession(ctx context.Context, token string, sessionID string) (bool, error)
}

type SSHSessionService interface {
	CreateSSHSession(ctx context.Context, sshSession *SSHSession) (*SSHSession, error)
	GetSSHSessions(ctx context.Context) ([]*SSHSession, error)
	HashPassword(password string) (string, error)
	VerifyPassword(password string, hashedPassword string) (bool, error)
	GetSSHSessionByID(ctx context.Context, sessionID string) (*SSHSession, error)
	UpdateSSHSession(ctx context.Context, sshSession *SSHSession) (*SSHSession, error)
	DeleteSSHSession(ctx context.Context, sessionID string) (bool, error)
}

var (
	EmptyIPError        = errors.New("IP address cannot be empty")
	EmptyPortError      = errors.New("Port cannot be empty")
	EmptyUserIDError    = errors.New("User ID cannot be empty")
	EmptySessionIDError = errors.New("Session ID cannot be empty")
	ErrInvalidSessionID = errors.New("Invalid session ID")
	ErrInvalidStatus    = errors.New("Invalid status")
	ErrInvalidAuthType  = errors.New("Invalid auth type")
)

func ValidadeIP(sshSession *SSHSession) error {
	if sshSession.IP == "" {
		return EmptyIPError
	}
	return nil
}

func ValidadePort(sshSession *SSHSession) error {
	if sshSession.Port == 0 {
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

func (s Status) IsStatusValid() error {
	switch s {
	case StatusOffline, StatusActive, StatusPending, StatusClosed, StatusFailed:
		return nil
	default:
		return ErrInvalidStatus
	}
}

func (a AuthType) IsAuthTypeValid() error {
	switch a {
	case AuthTypePassword, AuthTypeKey, AuthTypeBoth:
		return nil
	default:
		return ErrInvalidAuthType
	}
}

func ValidadeSSHSession(sshSession *SSHSession) error {
	if err := ValidadeIP(sshSession); err != nil {
		return err
	}
	if err := ValidadePort(sshSession); err != nil {
		return err
	}
	if err := ValidadeUserID(sshSession); err != nil {
		return err
	}
	if err := sshSession.Status.IsStatusValid(); err != nil {
		return err
	}
	if err := sshSession.AuthType.IsAuthTypeValid(); err != nil {
		return err
	}
	return nil
}
