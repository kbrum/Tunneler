package domain

import "context"

type Session struct {
	AccessToken  string
	RefreshToken string
	TokenType    string
	ExpiresIn    int
	ExpiresAt    int64
	User         User
}

type SessionRepository interface {
	SaveSession(ctx context.Context, session *Session) error
	GetSession(ctx context.Context) (*Session, error)
	DeleteSession(ctx context.Context) error
}
