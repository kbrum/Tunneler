package service

import (
	"context"
	"encoding/base64"
	"errors"

	"tunneler/internal/domain"

	"golang.org/x/crypto/argon2"
)

var _ domain.UserService = (*UserService)(nil)

type UserService struct {
	authRepo    domain.UserRepository
	sessionRepo domain.SessionRepository
	keyringRepo domain.KeyringRepository
}

func NewUserService(auth domain.UserRepository, session domain.SessionRepository, keyring domain.KeyringRepository) *UserService {
	return &UserService{
		authRepo:    auth,
		sessionRepo: session,
		keyringRepo: keyring,
	}
}

func (s *UserService) Create(ctx context.Context, user *domain.User) (*domain.User, error) {
	if err := domain.Validate(user); err != nil {
		return nil, err
	}

	data, err := s.authRepo.Create(ctx, user)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *UserService) Login(ctx context.Context, user *domain.User) (*domain.User, error) {
	if user == nil {
		return nil, errors.New("user cannot be nil")
	}

	plainPassword := user.Password

	data, session, err := s.authRepo.Login(ctx, user)
	if err != nil {
		return nil, err
	}

	baseKey := deriveBaseKey(plainPassword, data.ID)
	if err := s.keyringRepo.SetBaseKey(data.ID, base64.StdEncoding.EncodeToString(baseKey)); err != nil {
		return nil, err
	}

	if err := s.sessionRepo.SaveSession(ctx, session); err != nil {
		_ = s.keyringRepo.DeleteBaseKey(data.ID)
		return nil, err
	}

	return data, nil
}

func (s *UserService) Logout(ctx context.Context) error {
	localSession, err := s.sessionRepo.GetSession(ctx)
	if err != nil {
		return err
	}

	_ = s.authRepo.Logout(ctx)

	if localSession != nil && localSession.User.ID != "" {
		err = s.keyringRepo.DeleteBaseKey(localSession.User.ID)
		if err != nil {
			return err
		}
	}

	if err := s.sessionRepo.DeleteSession(ctx); err != nil {
		return err
	}

	return nil
}

func (s *UserService) GetUser(ctx context.Context) (*domain.Session, error) {
	session, err := s.sessionRepo.GetSession(ctx)
	if err != nil {
		return nil, err
	}

	return session, nil
}

func deriveBaseKey(loginPassword string, userID string) []byte {
	stableSalt := []byte("tunneler:basekey:" + userID)

	return argon2.IDKey(
		[]byte(loginPassword),
		stableSalt,
		3,
		64*1024,
		2,
		32,
	)
}
