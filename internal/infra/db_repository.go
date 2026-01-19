package infra

import (
	"context"
	"database/sql"

	"tunneler/internal/domain"
)

type SqliteSessionRepository struct {
	db *sql.DB
}

func NewSqliteSessionRepository(db *sql.DB) *SqliteSessionRepository {
	return &SqliteSessionRepository{db: db}
}

func (r *SqliteSessionRepository) SaveSession(ctx context.Context, session *domain.Session) error {
	query := `
        INSERT OR REPLACE INTO session (id, access_token, refresh_token, token_type, expires_in, expires_at, user_id)
        VALUES (1, ?, ?, ?, ?, ?, ?);
    `
	_, err := r.db.ExecContext(ctx, query,
		session.AccessToken,
		session.RefreshToken,
		session.TokenType,
		session.ExpiresIn,
		session.ExpiresAt,
		session.User.ID,
	)
	return err
}

func (r *SqliteSessionRepository) GetSession(ctx context.Context) (*domain.Session, error) {
	query := `SELECT access_token, refresh_token, token_type, expires_in, expires_at, user_id FROM session WHERE id = 1`

	var s domain.Session
	err := r.db.QueryRowContext(ctx, query).Scan(
		&s.AccessToken,
		&s.RefreshToken,
		&s.TokenType,
		&s.ExpiresIn,
		&s.ExpiresAt,
		&s.User.ID,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return &s, nil
}

func (r *SqliteSessionRepository) DeleteSession(ctx context.Context) error {
	_, err := r.db.ExecContext(ctx, "DELETE FROM session WHERE id = 1")
	return err
}
