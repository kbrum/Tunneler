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
		Name:     sshSession.Name,
		IP:       sshSession.IP,
		Port:     sshSession.Port,
		User:     sshSession.User,
		UserID:   sshSession.UserID,
		KeyID:    sshSession.KeyID,
		FolderID: sshSession.FolderID,
		Metadata: domain.SSHSessionMetadata{
			Audit: domain.SSHSessionAudit{
				LastExitCode: sshSession.Metadata.Audit.LastExitCode,
				LastReason:   sshSession.Metadata.Audit.LastReason,
			},
			Security: domain.SSHSessionSecurity{
				Fingerprint: sshSession.Metadata.Security.Fingerprint,
				KnownHost:   sshSession.Metadata.Security.KnownHost,
			},
			UI: domain.SSHSessionUI{
				Theme:    sshSession.Metadata.UI.Theme,
				FontSize: sshSession.Metadata.UI.FontSize,
			},
			Inventory: domain.SSHSessionInventory{
				Distro: sshSession.Metadata.Inventory.Distro,
				Kernel: sshSession.Metadata.Inventory.Kernel,
			},
		},
	}

	var data []SSHSessionSchema

	_, err := r.client.From("ssh_sessions").
		Insert(SSHSessionDB, false, "", "representation", "estimated").
		ExecuteTo(&data)
	if err != nil {
		return nil, err
	}

	res := &domain.SSHSession{
		ID:       data[0].ID,
		Name:     data[0].Name,
		IP:       data[0].IP,
		Port:     data[0].Port,
		User:     data[0].User,
		UserID:   data[0].UserID,
		KeyID:    data[0].KeyID,
		FolderID: data[0].FolderID,
		Metadata: domain.SSHSessionMetadata{
			Audit: domain.SSHSessionAudit{
				LastExitCode: data[0].Metadata.Audit.LastExitCode,
				LastReason:   data[0].Metadata.Audit.LastReason,
			},
			Security: domain.SSHSessionSecurity{
				Fingerprint: data[0].Metadata.Security.Fingerprint,
				KnownHost:   data[0].Metadata.Security.KnownHost,
			},
			UI: domain.SSHSessionUI{
				Theme:    data[0].Metadata.UI.Theme,
				FontSize: data[0].Metadata.UI.FontSize,
			},
			Inventory: domain.SSHSessionInventory{
				Distro: data[0].Metadata.Inventory.Distro,
				Kernel: data[0].Metadata.Inventory.Kernel,
			},
		},
	}

	return res, nil
}

func (r *SupabaseSSHSessionRepository) GetSSHSessions(ctx context.Context, userID string) ([]*domain.SSHSession, error) {
	var data []SSHSessionSchema

	_, err := r.client.From("ssh_sessions").
		Select("*", "estimated", false).
		Eq("user_id", userID).
		ExecuteTo(&data)
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
			FolderID:  item.FolderID,
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
				UI: domain.SSHSessionUI{
					Theme:    item.Metadata.UI.Theme,
					FontSize: item.Metadata.UI.FontSize,
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

func (r *SupabaseSSHSessionRepository) UpdateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	SSHSessionDB := SSHSessionSchema{
		ID:       sshSession.ID,
		Name:     sshSession.Name,
		IP:       sshSession.IP,
		Port:     sshSession.Port,
		User:     sshSession.User,
		KeyID:    sshSession.KeyID,
		FolderID: sshSession.FolderID,
	}

	var data SSHSessionSchema

	_, err := r.client.From("ssh_sessions").
		Update(SSHSessionDB, "representation", "estimated").
		Eq("id", sshSession.ID).
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
		KeyID:    data.KeyID,
		FolderID: data.FolderID,
	}

	return res, nil
}

func (r *SupabaseSSHSessionRepository) DeleteSSHSession(ctx context.Context, sessionID string) (bool, error) {
	_, _, err := r.client.From("ssh_sessions").
		Delete("representation", "estimated").
		Eq("id", sessionID).
		Execute()
	if err != nil {
		return false, err
	}

	return true, nil
}
