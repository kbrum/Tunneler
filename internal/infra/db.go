package infra

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

func NewSQLiteConnection(dbPath string) (*sql.DB, error) {
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(1)

	if err := createTables(db); err != nil {
		return nil, err
	}

	return db, nil
}

func createTables(db *sql.DB) error {
	query := `
	CREATE TABLE IF NOT EXISTS session (
		id INTEGER PRIMARY KEY CHECK (id = 1),
		access_token TEXT NOT NULL,
		refresh_token TEXT,
		token_type TEXT,
		expires_in INTEGER,
		expires_at INTEGER,
		user_id TEXT
	);`

	_, err := db.Exec(query)
	return err
}
