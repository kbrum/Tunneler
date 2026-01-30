package infra

import (
	"database/sql"

	"tunneler/internal/domain"

	"github.com/supabase-community/supabase-go"
)

type InfraManager struct {
	Client            *supabase.Client
	UserInfra         domain.UserRepository
	SSHSessionInfra   domain.SSHSessionRepository
	SessionRepository domain.SessionRepository
}

func NewInfraManager(db *sql.DB, client *supabase.Client) *InfraManager {
	return &InfraManager{
		Client:            client,
		UserInfra:         NewSupabaseUserRepository(client),
		SSHSessionInfra:   NewSupabaseSSHSessionRepository(client),
		SessionRepository: NewSqliteSessionRepository(db),
	}
}
