package service

import (
	"context"
	"time"

	"tunneler/internal/domain"

	"golang.org/x/crypto/bcrypt"
)

var _ domain.SSHSessionService = (*SSHService)(nil)

type SSHService struct {
	authRepo    domain.UserRepository
	sessionRepo domain.SessionRepository
	sshRepo     domain.SSHSessionRepository
}

func NewSSHService(auth domain.UserRepository, session domain.SessionRepository, ssh domain.SSHSessionRepository) *SSHService {
	return &SSHService{
		authRepo:    auth,
		sessionRepo: session,
		sshRepo:     ssh,
	}
}

func (s *SSHService) ensureValidSession(ctx context.Context) (*domain.Session, error) {
	session, err := s.sessionRepo.GetSession(ctx)
	if err != nil {
		return nil, err
	}

	if time.Now().Unix() > session.ExpiresAt-60 {
		newSession, err := s.authRepo.RefreshToken(ctx, session.RefreshToken)
		if err != nil {
			return nil, err
		}

		if err := s.sessionRepo.SaveSession(ctx, newSession); err != nil {
			return nil, err
		}
		return newSession, nil
	}

	return session, nil
}

func (s *SSHService) CreateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	sshSession.UserID = localSession.User.ID
	sshSession.Status = domain.StatusOffline

	if err := domain.ValidadeSSHSession(sshSession); err != nil {
		return nil, err
	}

	hashedPassword, err := s.HashPassword(sshSession.Password)
	if err != nil {
		return nil, err
	}

	data, err := s.sshRepo.CreateSSHSession(ctx, localSession.AccessToken, sshSession, sshSession.UserID, hashedPassword, sshSession.KeyID)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) GetSSHSessions(ctx context.Context) ([]*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	userID := localSession.User.ID

	res, err := s.sshRepo.GetSSHSessions(ctx, localSession.AccessToken, userID)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (s *SSHService) HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

func (s *SSHService) VerifyPassword(hashedPassword string, password string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return false, err
	}

	return true, nil
}

func (s *SSHService) GetSSHSessionByID(ctx context.Context, sessionID string) (*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	data, err := s.sshRepo.GetSSHSessionByID(ctx, localSession.AccessToken, sessionID)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) UpdateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return nil, err
	}

	sshSession.UserID = localSession.User.ID

	if err := domain.ValidadeSSHSession(sshSession); err != nil {
		return nil, err
	}

	data, err := s.sshRepo.UpdateSSHSession(ctx, localSession.AccessToken, sshSession)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) DeleteSSHSession(ctx context.Context, sessionID string) (bool, error) {
	localSession, err := s.ensureValidSession(ctx)
	if err != nil {
		return false, err
	}

	bool, err := s.sshRepo.DeleteSSHSession(ctx, localSession.AccessToken, sessionID)
	if err != nil {
		return bool, err
	}

	return bool, nil
}
