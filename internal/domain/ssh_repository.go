package domain

import "context"

type SSHSessionRepository interface {
	CreateSSHSession(ctx context.Context, sshSession *SSHSession) error
	CreateFolder(ctx context.Context, folderName string) (*SSHFolder, error)
	CreateKey(ctx context.Context, sshFolder *SSHFolder) error
	GetSSHSessions(ctx context.Context) ([]*SSHSession, error)
	GetSSHSessionTags(ctx context.Context, userID string) ([]string, error)
	GetSSHFolders(ctx context.Context, userID string) ([]*SSHFolder, error)
	GetSSHKeys(ctx context.Context, userID string) ([]*SSHKey, error)
	UpdateSSHSession(ctx context.Context, userID string) error
	UpdateSSHFolder(ctx context.Context, userID string) (*SSHFolder, error)
	UpdateSSHKey(ctx context.Context, userID string) error
	DeleteSSHFolder(ctx context.Context, userID string) error
	DeleteSSHKey(ctx context.Context, userID string) error
	DeleteSSHSession(ctx context.Context, userID string) error
}
