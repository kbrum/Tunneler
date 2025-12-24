package infra

import (
	"context"

	"tunneler/internal/domain"

	"github.com/supabase-community/gotrue-go/types"
	"github.com/supabase-community/supabase-go"
)

type SupabaseUserRepository struct {
	client *supabase.Client //nolint:unused
	ctx    context.Context  //nolint:unused
}

func (s SupabaseUserRepository) CreateUser(ctx context.Context, client *supabase.Client, user *domain.User) (*types.SignupResponse, error) {
	req := types.SignupRequest{
		Email:    user.Email,
		Password: user.Password,
		Data: map[string]interface{ any }{
			"name":     user.Name,
			"username": user.Username,
		},
	}

	response, err := client.Auth.Signup(req)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func (s SupabaseUserRepository) GetUserByID(ctx context.Context, id int) (*domain.User, error) {
	return &domain.User{}, nil
}

func (s SupabaseUserRepository) GetUserByUsername(ctx context.Context, username string) (*domain.User, error) {
	return &domain.User{}, nil
}

func (s SupabaseUserRepository) GetUserByEmail(ctx context.Context, email string) (*domain.User, error) {
	return &domain.User{}, nil
}

func (s SupabaseUserRepository) UpdateUser(ctx context.Context, user *domain.User) error {
	return nil
}

func (s SupabaseUserRepository) DeleteUser(ctx context.Context, id int) error {
	return nil
}
