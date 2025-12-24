package infra

import (
	"context"

	"tunneler/internal/domain"

	"github.com/supabase-community/gotrue-go/types"
	"github.com/supabase-community/supabase-go"
)

type SupabaseUserRepository struct {
	session *domain.Session
	client  *supabase.Client
}

func NewSupabaseUserRepository(client *supabase.Client) *SupabaseUserRepository {
	return &SupabaseUserRepository{
		client: client,
	}
}

func (s *SupabaseUserRepository) Create(ctx context.Context, user *domain.User) error {
	req := types.SignupRequest{
		Email:    user.Email,
		Password: user.Password,
		Data: map[string]interface{}{
			"name":     user.Name,
			"username": user.Username,
		},
	}

	_, err := s.client.Auth.Signup(req)
	if err != nil {
		return err
	}

	return nil
}

func (s *SupabaseUserRepository) Login(ctx context.Context, user *domain.User) (*domain.Session, error) {
	session, err := s.client.Auth.SignInWithEmailPassword(user.Email, user.Password)
	if err != nil {
		return nil, err
	}

	return &domain.Session{
		AccessToken:  session.AccessToken,
		RefreshToken: session.RefreshToken,
		TokenType:    session.TokenType,
		ExpiresIn:    session.ExpiresIn,
		ExpiresAt:    session.ExpiresAt,
		User: domain.User{
			Email: session.User.Email,
		},
	}, nil
}

func (s *SupabaseUserRepository) LoginGoogleProvider(ctx context.Context, user *domain.User) (*domain.Session, error) {
	// TODO: Implement Google Login
	return nil, nil
}

func (s *SupabaseUserRepository) LoginGithubProvider(ctx context.Context, user *domain.User) (*domain.Session, error) {
	// TODO: Implement Github Login
	return nil, nil
}

func (s *SupabaseUserRepository) Logout(ctx context.Context, session *domain.Session) error {
	err := s.client.Auth.Logout()
	if err != nil {
		return err
	}

	return nil
}

func (s *SupabaseUserRepository) GetUser(ctx context.Context, session *domain.Session) (*domain.User, error) {
	return &domain.User{}, nil
}

func (s *SupabaseUserRepository) UpdateName(ctx context.Context, session *domain.Session) error {
	return nil
}

func (s *SupabaseUserRepository) UpdateEmail(ctx context.Context, session *domain.Session) error {
	return nil
}

func (s *SupabaseUserRepository) UpdatePassword(ctx context.Context, session *domain.Session) error {
	return nil
}

func (s *SupabaseUserRepository) UpdateUsername(ctx context.Context, session *domain.Session) error {
	return nil
}

func (s *SupabaseUserRepository) Delete(ctx context.Context, session *domain.Session) error {
	return nil
}
