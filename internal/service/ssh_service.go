package service

import (
	"context"

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

func (s *SSHService) CreateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	if err := domain.ValidadeSSHSession(sshSession); err != nil {
		return nil, err
	}

	localSession, err := s.sessionRepo.GetSession(ctx)
	if err != nil {
		return nil, err
	}

	userID := localSession.User.ID

	data, err := s.sshRepo.CreateSSHSession(ctx, sshSession, userID, "", "")
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) GetSSHSessions(ctx context.Context) ([]*domain.SSHSession, error) {
	localSession, err := s.sessionRepo.GetSession(ctx)
	if err != nil {
		return nil, err
	}

	userID := localSession.User.ID

	res, err := s.sshRepo.GetSSHSessions(ctx, userID)
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
	data, err := s.sshRepo.GetSSHSessionByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) UpdateSSHSession(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	if err := domain.ValidadeSSHSession(sshSession); err != nil {
		return nil, err
	}

	data, err := s.sshRepo.UpdateSSHSession(ctx, sshSession)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) DeleteSSHSession(ctx context.Context, sessionID string) (bool, error) {
	bool, err := s.sshRepo.DeleteSSHSession(ctx, sessionID)
	if err != nil {
		return bool, err
	}

	return bool, nil
}
