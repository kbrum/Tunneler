package infra

import (
	"context"
	"os"

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

func (r *SupabaseSSHSessionRepository) getClient(token string) (*supabase.Client, error) {
	if token == "" {
		return r.client, nil
	}
	opts := &supabase.ClientOptions{
		Schema: "ssh",
		Headers: map[string]string{
			"Authorization": "Bearer " + token,
		},
	}
	return supabase.NewClient(os.Getenv("SUPABASE_URL"), os.Getenv("PUBLIC_SUPABASE_KEY"), opts)
}

func (r *SupabaseSSHSessionRepository) CreateSSHSession(ctx context.Context, token string, sshSession *domain.SSHSession, userID string, hashedPassword string, keyID string) (*domain.SSHSession, error) {
	client, err := r.getClient(token)
	if err != nil {
		return nil, err
	}

	SSHSessionDB := SSHSessionSchema{
		Name:     sshSession.Name,
		IP:       sshSession.IP,
		Port:     sshSession.Port,
		User:     sshSession.User,
		Password: hashedPassword,
		UserID:   userID,
		KeyID:    keyID,
		AuthType: sshSession.AuthType,
		Metadata: domain.SSHSessionMetadata{
			Audit: domain.SSHSessionAudit{
				LastExitCode: sshSession.Metadata.Audit.LastExitCode,
				LastReason:   sshSession.Metadata.Audit.LastReason,
			},
			Security: domain.SSHSessionSecurity{
				Fingerprint: sshSession.Metadata.Security.Fingerprint,
				KnownHost:   sshSession.Metadata.Security.KnownHost,
			},
			Inventory: domain.SSHSessionInventory{
				Distro: sshSession.Metadata.Inventory.Distro,
				Kernel: sshSession.Metadata.Inventory.Kernel,
			},
		},
	}

	var data []SSHSessionSchema

	_, err = client.From("ssh_sessions").
		Insert(SSHSessionDB, false, "", "representation", "estimated").
		ExecuteToWithContext(ctx, &data)
	if err != nil {
		return nil, err
	}

	res := &domain.SSHSession{
		ID:     data[0].ID,
		Name:   data[0].Name,
		IP:     data[0].IP,
		Port:   data[0].Port,
		User:   data[0].User,
		UserID: data[0].UserID,
		KeyID:  data[0].KeyID,
		Metadata: domain.SSHSessionMetadata{
			Audit: domain.SSHSessionAudit{
				LastExitCode: data[0].Metadata.Audit.LastExitCode,
				LastReason:   data[0].Metadata.Audit.LastReason,
			},
			Security: domain.SSHSessionSecurity{
				Fingerprint: data[0].Metadata.Security.Fingerprint,
				KnownHost:   data[0].Metadata.Security.KnownHost,
			},
			Inventory: domain.SSHSessionInventory{
				Distro: data[0].Metadata.Inventory.Distro,
				Kernel: data[0].Metadata.Inventory.Kernel,
			},
		},
	}

	return res, nil
}

func (r *SupabaseSSHSessionRepository) GetSSHSessions(ctx context.Context, token string, userID string) ([]*domain.SSHSession, error) {
	client, err := r.getClient(token)
	if err != nil {
		return nil, err
	}

	var data []SSHSessionSchema

	_, err = client.From("ssh_sessions").
		Select("*", "estimated", false).
		Eq("user_id", userID).
		ExecuteToWithContext(ctx, &data)
	if err != nil {
		return nil, err
	}

	res := make([]*domain.SSHSession, len(data))
	for i, item := range data {
		res[i] = &domain.SSHSession{
			ID:        item.ID,
			Name:      item.Name,
			IP:        item.IP,
			Port:      item.Port,
			User:      item.User,
			Status:    item.Status,
			AuthType:  item.AuthType,
			UserID:    item.UserID,
			KeyID:     item.KeyID,
			LastLogin: item.LastLogin,
			Metadata: domain.SSHSessionMetadata{
				Audit: domain.SSHSessionAudit{
					LastExitCode: item.Metadata.Audit.LastExitCode,
					LastReason:   item.Metadata.Audit.LastReason,
				},
				Security: domain.SSHSessionSecurity{
					Fingerprint: item.Metadata.Security.Fingerprint,
					KnownHost:   item.Metadata.Security.KnownHost,
				},
				Inventory: domain.SSHSessionInventory{
					Distro: item.Metadata.Inventory.Distro,
					Kernel: item.Metadata.Inventory.Kernel,
				},
			},
		}
	}

	return res, nil
}

func (r *SupabaseSSHSessionRepository) GetSSHSessionByID(ctx context.Context, token string, sessionID string) (*domain.SSHSession, error) {
	client, err := r.getClient(token)
	if err != nil {
		return nil, err
	}

	var data SSHSessionSchema

	_, err = client.From("ssh_sessions").
		Select("*", "estimated", false).
		Eq("id", sessionID).
		ExecuteTo(&data)
	if err != nil {
		return nil, err
	}

	res := &domain.SSHSession{
		ID:       data.ID,
		Name:     data.Name,
		IP:       data.IP,
		Port:     data.Port,
		User:     data.User,
		Status:   data.Status,
		AuthType: data.AuthType,
		KeyID:    data.KeyID,
	}

	return res, nil
}

func (r *SupabaseSSHSessionRepository) GetPassword(ctx context.Context, token string, sessionID string) (string, error) {
	client, err := r.getClient(token)
	if err != nil {
		return "", err
	}

	var data SSHSessionSchema

	_, err = client.From("ssh_sessions").
		Select("password", "estimated", false).
		Eq("id", sessionID).
		ExecuteTo(&data)
	if err != nil {
		return "", err
	}

	return data.Password, nil
}

func (r *SupabaseSSHSessionRepository) UpdateSSHSession(ctx context.Context, token string, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	client, err := r.getClient(token)
	if err != nil {
		return nil, err
	}

	SSHSessionDB := SSHSessionSchema{
		ID:       sshSession.ID,
		Name:     sshSession.Name,
		IP:       sshSession.IP,
		Password: sshSession.Password,
		Port:     sshSession.Port,
		User:     sshSession.User,
		KeyID:    sshSession.KeyID,
	}

	var data SSHSessionSchema

	_, err = client.From("ssh_sessions").
		Update(SSHSessionDB, "representation", "estimated").
		Eq("id", sshSession.ID).
		ExecuteToWithContext(ctx, &data)
	if err != nil {
		return nil, err
	}

	res := &domain.SSHSession{
		ID:    data.ID,
		Name:  data.Name,
		IP:    data.IP,
		Port:  data.Port,
		User:  data.User,
		KeyID: data.KeyID,
	}

	return res, nil
}

func (r *SupabaseSSHSessionRepository) DeleteSSHSession(ctx context.Context, token string, sessionID string) (bool, error) {
	client, err := r.getClient(token)
	if err != nil {
		return false, err
	}

	_, _, err = client.From("ssh_sessions").
		Delete("representation", "estimated").
		Eq("id", sessionID).
		ExecuteWithContext(ctx)
	if err != nil {
		return false, err
	}

	return true, nil
}
