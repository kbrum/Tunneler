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

type Auth_type string

const (
	AuthTypePassword Auth_type = "password"
	AuthTypeKey      Auth_type = "key"
	AuthTypeBoth     Auth_type = "both"
)

type SSHSessionAudit struct {
	LastExitCode int    `json:"last_exit_code"`
	LastReason   string `json:"last_reason"`
}

type SSHSessionSecurity struct {
	Fingerprint string `json:"fingerprint"`
	KnownHost   bool   `json:"known_host"`
}

type SSHSessionUI struct {
	Theme    string `json:"theme"`
	FontSize int    `json:"font_size"`
}

type SSHSessionInventory struct {
	Distro string `json:"distro"`
	Kernel string `json:"kernel"`
}

type SSHSessionMetadata struct {
	Audit     SSHSessionAudit     `json:"audit"`
	Security  SSHSessionSecurity  `json:"security"`
	UI        SSHSessionUI        `json:"ui"`
	Inventory SSHSessionInventory `json:"inventory"`
}

type SSHSession struct {
	ID        string
	CreatedAt time.Time
	Name      string
	User      string
	IP        string
	Port      int
	Status    Status
	AuthType  Auth_type
	UserID    string
	KeyID     string
	FolderID  string
	LastLogin time.Time
	Metadata  SSHSessionMetadata
}

type SSHSessionRepository interface {
	CreateSSHSession(ctx context.Context, sshSession *SSHSession) (*SSHSession, error)
	GetSSHSessions(ctx context.Context, userID string) ([]*SSHSession, error)
	UpdateSSHSession(ctx context.Context, sshSession *SSHSession) (*SSHSession, error)
	DeleteSSHSession(ctx context.Context, sessionID string) (bool, error)
}

var (
	EmptyIPError       = errors.New("IP address cannot be empty")
	EmptyPortError     = errors.New("Port cannot be empty")
	EmptyUserIDError   = errors.New("User ID cannot be empty")
	ErrInvalidStatus   = errors.New("Invalid status")
	ErrInvalidAuthType = errors.New("Invalid auth type")
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

func (s Status) IsStatusValid() (bool, error) {
	switch s {
	case StatusOffline, StatusActive, StatusPending, StatusClosed, StatusFailed:
		return true, nil
	default:
		return false, ErrInvalidStatus
	}
}

func (a Auth_type) IsAuthTypeValid() (bool, error) {
	switch a {
	case AuthTypePassword, AuthTypeKey, AuthTypeBoth:
		return true, nil
	default:
		return false, ErrInvalidAuthType
	}
}
