package infra

import (
	"context"

	"tunneler/internal/domain"

	"github.com/supabase-community/supabase-go"
)

type SupabaseSSHSessionRepository struct {
	client *supabase.Client
}

func NewSupabaseSSHSessionRepository(client *supabase.Client) *SupabaseSSHSessionRepository {
	return &SupabaseSSHSessionRepository{
		client: client,
	}
}

func (r *SupabaseSSHSessionRepository) CreateSSHSession(ctx context.Context, sshSession *domain.SSHSession) error {
	// Implementation here
	return nil
}

func (r *SupabaseSSHSessionRepository) GetSSHSession(ctx context.Context, sessionID string) ([]*domain.SSHSession, error) {
	// Implementation here
	return nil, nil
}

func (r *SupabaseSSHSessionRepository) GetSSHSessionTags(ctx context.Context, userID string) ([]string, error) {
	// Implementation here
	return nil, nil
}

func (r *SupabaseSSHSessionRepository) UpdateSSHSession(ctx context.Context, sshSession *domain.SSHSession) error {
	// Implementation here
	return nil
}

func (r *SupabaseSSHSessionRepository) DeleteSSHSession(ctx context.Context, sessionID string) error {
	// Implementation here
	return nil
}
