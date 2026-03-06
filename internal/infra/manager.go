package infra

import (
	"database/sql"
	"log/slog"

	"tunneler/internal/domain"

	"github.com/supabase-community/supabase-go"
)

type InfraManager struct {
	Client             *supabase.Client
	UserInfra          domain.UserRepository
	SSHSessionInfra    domain.SSHSessionRepository
	SessionInfra       domain.SessionRepository
	KeyringInfra       domain.KeyringRepository
	SSHConnectionInfra domain.SSHConnectionGateway
}

func NewInfraManager(db *sql.DB, client *supabase.Client, logger *slog.Logger) *InfraManager {
	return &InfraManager{
		Client:             client,
		UserInfra:          NewSupabaseUserRepository(client),
		SSHSessionInfra:    NewSupabaseSSHSessionRepository(client),
		SessionInfra:       NewSqliteSessionRepository(db),
		KeyringInfra:       NewKeyringRepository("tunneler"),
		SSHConnectionInfra: NewSSHConnectionGateway(logger),
	}
}
