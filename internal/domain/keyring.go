package domain

type KeyringRepository interface {
	SetBaseKey(userID string, baseKey string) error
	GetBaseKey(userID string) (string, error)
	DeleteBaseKey(userID string) error
}
