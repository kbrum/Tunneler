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

func (r *SupabaseSSHSessionRepository) CreateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	SSHSessionDB := SSHSessionSchema{
		Name:   sshSession.SSHSessionName,
		IP:     sshSession.SSHSessionIP,
		Port:   sshSession.SSHSessionPort,
		UserID: sshSession.UserID,
		KeyID:  sshSession.KeyID,
		Folder: sshSession.FolderID,
		Tags:   sshSession.Tags,
	}

	var data []SSHSessionSchema

	_, err := r.client.From("ssh_sessions").
		Insert(SSHSessionDB, false, "", "representation", "none").
		ExecuteTo(&data)

	res := &domain.SSHSession{}

	if err != nil {
		return nil, err
	}

	return nil, nil
}

func (r *SupabaseSSHSessionRepository) GetSSHSession(ctx context.Context, sessionID string) ([]*domain.SSHSession, error) {
	// Implementation here
	return nil, nil
}

func (r *SupabaseSSHSessionRepository) GetSSHSessionTags(ctx context.Context, userID string) ([]string, error) {
	// Implementation here
	return nil, nil
}

func (r *SupabaseSSHSessionRepository) UpdateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	// Implementation here
	return nil, nil
}

func (r *SupabaseSSHSessionRepository) DeleteSSHSession(ctx context.Context, sessionID string) (bool, error) {
	// Implementation here
	return false, nil
}
