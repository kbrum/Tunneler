package domain

import "context"

type UserRepository interface {
	Create(ctx context.Context, user *User) (*User, error)
	Login(ctx context.Context, user *User) (*User, *Session, error)
	LoginGoogleProvider(ctx context.Context, user *User) (*Session, error)
	LoginGithubProvider(ctx context.Context, user *User) (*Session, error)
	Logout(ctx context.Context) error
	UpdateName(ctx context.Context, newName string) error
	UpdateEmail(ctx context.Context, newEmail string) error
	UpdatePassword(ctx context.Context, newPassword string) error
	Delete(ctx context.Context) error
}

type SessionRepository interface {
	SaveSession(ctx context.Context, session *Session) error
	GetSession(ctx context.Context) (*Session, error)
	DeleteSession(ctx context.Context) error
}
