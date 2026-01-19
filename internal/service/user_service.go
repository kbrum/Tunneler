package service

import (
	"context"

	"tunneler/internal/domain"
)

type UserService struct {
	repo domain.UserRepository
}

func NewUserService(repo domain.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Create(ctx context.Context, user *domain.User) (*domain.User, error) {
	if err := domain.Validate(user); err != nil {
		return nil, err
	}

	data, err := s.repo.Create(ctx, user)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *UserService) Login(ctx context.Context, user *domain.User) error {
	return s.repo.Login(ctx, user)
}

func (s *UserService) Logout(ctx context.Context, session *domain.Session) error {
	return s.repo.Logout(ctx, session)
}
