package service

import (
	"context"

	"tunneler/internal/domain"
)

type UserService struct {
	authRepo    domain.UserRepository
	sessionRepo domain.SessionRepository
}

func NewUserService(auth domain.UserRepository, session domain.SessionRepository) *UserService {
	return &UserService{
		authRepo:    auth,
		sessionRepo: session,
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
	data, session, err := s.authRepo.Login(ctx, user)
	if err != nil {
		return nil, err
	}

	if err := s.sessionRepo.SaveSession(ctx, session); err != nil {
		return nil, err
	}

	return data, nil
}

func (s *UserService) Logout(ctx context.Context) error {
	_ = s.authRepo.Logout(ctx)

	if err := s.sessionRepo.DeleteSession(ctx); err != nil {
		return err
	}

	return nil
}
