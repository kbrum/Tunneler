package infra

import (
	"fmt"

	"tunneler/internal/domain"

	"github.com/zalando/go-keyring"
)

var _ domain.KeyringRepository = (*KeyringRepository)(nil)

type KeyringRepository struct {
	serviceName string
}

func NewKeyringRepository(serviceName string) *KeyringRepository {
	return &KeyringRepository{serviceName: serviceName}
}

func (r *KeyringRepository) SetBaseKey(userID string, baseKey string) error {
	return keyring.Set(r.serviceName, r.baseKeyAccount(userID), baseKey)
}

func (r *KeyringRepository) GetBaseKey(userID string) (string, error) {
	return keyring.Get(r.serviceName, r.baseKeyAccount(userID))
}

func (r *KeyringRepository) DeleteBaseKey(userID string) error {
	err := keyring.Delete(r.serviceName, r.baseKeyAccount(userID))
	if err == keyring.ErrNotFound {
		return nil
	}
	return err
}

func (r *KeyringRepository) baseKeyAccount(userID string) string {
	return fmt.Sprintf("%s:base_key", userID)
}
