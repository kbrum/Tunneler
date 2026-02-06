package infra

import (
	"time"

	"tunneler/internal/domain"
)

type SSHSessionSchema struct {
	ID        string                    `json:"id,omitempty"`
	CreatedAt time.Time                 `json:"created_at"`
	Name      string                    `json:"session_name"`
	Password  string                    `json:"password"`
	User      string                    `json:"remote_user"`
	IP        string                    `json:"session_ip"`
	Port      int                       `json:"ssh_port"`
	Status    domain.Status             `json:"status,omitempty"`
	AuthType  domain.AuthType           `json:"auth_type,omitempty"`
	UserID    string                    `json:"user_id"`
	KeyID     string                    `json:"key_id,omitempty"`
	LastLogin time.Time                 `json:"last_login"`
	Metadata  domain.SSHSessionMetadata `json:"metadata"`
}
