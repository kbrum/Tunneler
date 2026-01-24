package domain

import "context"

type UserRepository interface {
	Create(ctx context.Context, user *User) (*User, error)
	Login(ctx context.Context, user *User) (*User, *Session, error)
	LoginGoogleProvider(ctx context.Context, user *User) (*Session, error)
	LoginGithubProvider(ctx context.Context, user *User) (*Session, error)
	Logout(ctx context.Context) error
	UpdateUser(ctx context.Context, user *User) error
	Delete(ctx context.Context) error
}
