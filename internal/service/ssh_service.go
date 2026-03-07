package service

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"strings"
	"time"

	"tunneler/internal/domain"

	"github.com/google/uuid"
	"golang.org/x/crypto/argon2"
)

const encryptedPasswordParts = 3

var _ domain.SSHSessionService = (*SSHService)(nil)

type SSHService struct {
	authRepo    domain.UserRepository
	sessionRepo domain.SessionRepository
	sshRepo     domain.SSHSessionRepository
}

func NewSSHService(auth domain.UserRepository, session domain.SessionRepository, ssh domain.SSHSessionRepository) *SSHService {
	return &SSHService{
		authRepo:    auth,
		sessionRepo: session,
		sshRepo:     ssh,
	}
}

func (s *SSHService) ensureValidSession(ctx context.Context) (*domain.Session, error) {
	session, err := s.sessionRepo.GetSession(ctx)
	if err != nil {
		return nil, err
	}

	if time.Now().Unix() > session.ExpiresAt-60 {
		newSession, err := s.authRepo.RefreshToken(ctx, session.RefreshToken)
		if err != nil {
			return nil, err
		}

		if err := s.sessionRepo.SaveSession(ctx, newSession); err != nil {
			return nil, err
		}
		return newSession, nil
	}

	return session, nil
}

func (s *SSHService) CreateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	sshSession.UserID = localSession.User.ID
	sshSession.Status = domain.StatusOffline

	if err := domain.ValidadeSSHSession(sshSession); err != nil {
		return nil, err
	}

	salt, err := s.GenerateSalt(ctx, 16)
	if err != nil {
		return nil, err
	}

	encryptedPassword, err := s.EncryptPassword(ctx, sshSession.Password, salt)
	if err != nil {
		return nil, err
	}

	data, err := s.sshRepo.CreateSSHSession(ctx, localSession.AccessToken, sshSession, sshSession.UserID, encryptedPassword, sshSession.KeyID)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) DeriveSessionKey(loginPassword string, salt []byte) ([]byte, error) {
	if loginPassword == "" {
		return nil, errors.New("login password cannot be empty")
	}
	if len(salt) < 16 {
		return nil, errors.New("salt must be at least 16 bytes")
	}

	key := argon2.IDKey(
		[]byte(loginPassword),
		salt,
		3,
		64*1024,
		2,
		32,
	)

	return key, nil
}

func (s *SSHService) GenerateSalt(ctx context.Context, size int) ([]byte, error) {
	if size < 16 {
		return nil, fmt.Errorf("salt size must be >= 16 bytes")
	}
	salt := make([]byte, size)
	if _, err := rand.Read(salt); err != nil {
		return nil, err
	}
	return salt, nil
}

func (s *SSHService) EncryptPassword(ctx context.Context, password string, salt []byte) (string, error) {
	if password == "" {
		return "", errors.New("password cannot be empty")
	}

	key, err := s.DeriveSessionKey(password, salt)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return "", err
	}

	ciphertext := gcm.Seal(nil, nonce, []byte(password), nil)

	saltBase64 := base64.StdEncoding.EncodeToString(salt)
	nonceBase64 := base64.StdEncoding.EncodeToString(nonce)
	ciphertextBase64 := base64.StdEncoding.EncodeToString(ciphertext)

	return strings.Join([]string{saltBase64, nonceBase64, ciphertextBase64}, ":"), nil
}

func (s *SSHService) DecryptPassword(ctx context.Context, password string, encryptedPassword string) (string, error) {
	if password == "" {
		return "", errors.New("password cannot be empty")
	}

	parts := strings.Split(encryptedPassword, ":")
	if len(parts) != encryptedPasswordParts {
		return "", errors.New("invalid encrypted password payload")
	}

	salt, err := base64.StdEncoding.DecodeString(parts[0])
	if err != nil {
		return "", err
	}

	nonce, err := base64.StdEncoding.DecodeString(parts[1])
	if err != nil {
		return "", err
	}

	ciphertext, err := base64.StdEncoding.DecodeString(parts[2])
	if err != nil {
		return "", err
	}

	key, err := s.DeriveSessionKey(password, salt)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	plainPassword, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", err
	}

	return string(plainPassword), nil
}

func (s *SSHService) GetSSHSessions(ctx context.Context) ([]*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	userID := localSession.User.ID

	res, err := s.sshRepo.GetSSHSessions(ctx, localSession.AccessToken, userID)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func validateSessionID(sessionID string) (string, error) {
	trimmedSessionID := strings.TrimSpace(sessionID)
	if trimmedSessionID == "" {
		return "", domain.EmptySessionIDError
	}

	if _, err := uuid.Parse(trimmedSessionID); err != nil {
		return "", domain.ErrInvalidSessionID
	}

	return trimmedSessionID, nil
}

func (s *SSHService) GetSSHSessionByID(ctx context.Context, sessionID string) (*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	validatedSessionID, err := validateSessionID(sessionID)
	if err != nil {
		return nil, err
	}

	data, err := s.sshRepo.GetSSHSessionByID(ctx, localSession.AccessToken, validatedSessionID)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) ConnectSession(ctx context.Context) error {
	return nil
}

func (s *SSHService) DisconnectSession(ctx context.Context) error {
	return nil
}

func (s *SSHService) UpdateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	validatedSessionID, err := validateSessionID(sshSession.ID)
	if err != nil {
		return nil, err
	}

	sshSession.ID = validatedSessionID
	sshSession.UserID = localSession.User.ID

	if sshSession.Password != "" {
		salt, err := s.GenerateSalt(ctx, 16)
		if err != nil {
			return nil, err
		}

		encryptedPassword, err := s.EncryptPassword(ctx, sshSession.Password, salt)
		if err != nil {
			return nil, err
		}
		sshSession.Password = encryptedPassword
	}

	if err := domain.ValidadeSSHSession(sshSession); err != nil {
		return nil, err
	}

	data, err := s.sshRepo.UpdateSSHSession(ctx, localSession.AccessToken, sshSession)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) DeleteSSHSession(ctx context.Context, sessionID string) (bool, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return false, err
	}

	validatedSessionID, err := validateSessionID(sessionID)
	if err != nil {
		return false, err
	}

	bool, err := s.sshRepo.DeleteSSHSession(ctx, localSession.AccessToken, validatedSessionID)
	if err != nil {
		return bool, err
	}

	return bool, nil
}
