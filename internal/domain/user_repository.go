package domain

import "context"

type UserRepository interface {
	Create(ctx context.Context, user *User) error
	Login(ctx context.Context, user *User) (*Session, error)
	GetByID(ctx context.Context, uuid string) (*User, error)
	GetByUsername(ctx context.Context, username string) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	UpdateName(ctx context.Context, user *User) error
	UpdateEmail(ctx context.Context, user *User) error
	UpdatePassword(ctx context.Context, user *User) error
	UpdateUsername(ctx context.Context, user *User) error
	Delete(ctx context.Context, uuid string) error
}
