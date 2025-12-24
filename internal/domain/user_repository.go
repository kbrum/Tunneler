package domain

import "context"

type UserRepository interface {
	Create(ctx context.Context, user *User) error
	Login(ctx context.Context, user *User) (*Session, error)
	LoginGoogleProvider(ctx context.Context, user *User) (*Session, error)
	LoginGithubProvider(ctx context.Context, user *User) (*Session, error)
	Logout(ctx context.Context, session *Session) error
	GetUser(ctx context.Context, session *Session) (*User, error)
	UpdateName(ctx context.Context, session *Session) error
	UpdateEmail(ctx context.Context, session *Session) error
	UpdatePassword(ctx context.Context, session *Session) error
	UpdateUsername(ctx context.Context, session *Session) error
	Delete(ctx context.Context, session *Session) error
}
