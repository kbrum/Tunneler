package infra

import (
	"context"

	"tunneler/internal/domain"

	"github.com/supabase-community/gotrue-go/types"
	"github.com/supabase-community/supabase-go"
)

type SupabaseUserRepository struct {
	client *supabase.Client
}

func NewSupabaseUserRepository(client *supabase.Client) *SupabaseUserRepository {
	return &SupabaseUserRepository{
		client: client,
	}
}

func (s *SupabaseUserRepository) Create(ctx context.Context, user *domain.User) (*domain.User, error) {
	req := types.SignupRequest{
		Email:    user.Email,
		Password: user.Password,
		Data: map[string]interface{}{
			"name": user.Name,
		},
	}

	data, err := s.client.Auth.Signup(req)
	if err != nil {
		return nil, err
	}

	res := &domain.User{
		ID:    data.User.ID.String(),
		Name:  data.User.UserMetadata["name"].(string),
		Email: data.User.Email,
	}
	return res, nil
}

func (s *SupabaseUserRepository) Login(ctx context.Context, user *domain.User) (*domain.User, *domain.Session, error) {
	data, err := s.client.Auth.SignInWithEmailPassword(user.Email, user.Password)
	if err != nil {
		return nil, nil, err
	}

	sessionResponse := &domain.Session{
		AccessToken:  data.Session.AccessToken,
		RefreshToken: data.Session.RefreshToken,
		TokenType:    data.Session.TokenType,
		ExpiresIn:    data.Session.ExpiresIn,
		ExpiresAt:    data.Session.ExpiresAt,
		User: domain.User{
			ID:    data.User.ID.String(),
			Name:  data.User.UserMetadata["name"].(string),
			Email: data.User.Email,
		},
	}

	userResponse := &domain.User{
		ID:    data.User.ID.String(),
		Name:  data.User.UserMetadata["name"].(string),
		Email: data.User.Email,
	}

	return userResponse, sessionResponse, nil
}

func (s *SupabaseUserRepository) LoginGoogleProvider(ctx context.Context, user *domain.User) (*domain.Session, error) {
	return nil, nil
}

func (s *SupabaseUserRepository) LoginGithubProvider(ctx context.Context, user *domain.User) (*domain.Session, error) {
	return nil, nil
}

func (s *SupabaseUserRepository) Logout(ctx context.Context) error {
	err := s.client.Auth.Logout()
	if err != nil {
		return err
	}

	return nil
}

func (s *SupabaseUserRepository) UpdateUser(ctx context.Context, user *domain.User) error {
	return nil
}

func (s *SupabaseUserRepository) Delete(ctx context.Context) error {
	return nil
}
