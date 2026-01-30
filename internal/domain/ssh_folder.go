package domain

import (
	"context"
)

type SSHFolder struct {
	ID         string
	UserID     string
	FolderName string
}

type SSHFolderRepository interface {
	CreateSSHFolder(ctx context.Context, folder *SSHFolder) error
	GetSSHFolders(ctx context.Context, userID string) ([]*SSHFolder, error)
	UpdateSSHFolder(ctx context.Context, folder *SSHFolder) error
	DeleteSSHFolder(ctx context.Context, folderID string) error
}
