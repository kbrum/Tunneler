package domain

import (
	"context"
)

type SSHKey struct {
	ID          string
	Label       string
	KeyType     string
	PublicKey   string
	PrivateKey  string
	Fingerprint string
	UserID      string
}

type SSHKeyRepository interface {
	CreateSSHKey(ctx context.Context, sshKey *SSHKey) error
	GetSSHKeys(ctx context.Context, userID string) ([]*SSHKey, error)
	UpdateSSHKey(ctx context.Context, sshKey *SSHKey) error
	DeleteSSHKey(ctx context.Context, keyID string) error
}
