package service

import (
	"context"

	"tunneler/internal/domain"
	"tunneler/internal/dto"
)

type UserService struct {
	repo domain.UserRepository
}

func NewUserService(repo domain.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Create(ctx context.Context, req dto.CreateUserRequest) error {
	user := &domain.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: req.Password,
	}

	if err := domain.Validate(user); err != nil {
		return err
	}

	return s.repo.Create(ctx, user)
}

func (s *UserService) Login(ctx context.Context, req dto.LoginRequest) (*dto.SessionResponse, error) {
	user := &domain.User{
		Email:    req.Email,
		Password: req.Password,
	}

	session, err := s.repo.Login(ctx, user)
	if err != nil {
		return nil, err
	}

	return &dto.SessionResponse{
		AccessToken:  session.AccessToken,
		RefreshToken: session.RefreshToken,
		ExpiresIn:    session.ExpiresIn,
		UserEmail:    session.User.Email,
	}, nil
}

func (s *UserService) Logout(ctx context.Context, session *domain.Session) error {
	return s.repo.Logout(ctx, session)
}
