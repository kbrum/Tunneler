package service

import (
	"context"

	"tunneler/internal/domain"
)

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

func (s *SSHService) UpdateSSHSesion(ctx context.Context, sshSession *domain.SSHSession) (*domain.SSHSession, error) {
	if err := domain.ValidadeSSHSession(sshSession); err != nil {
		return nil, err
	}

	data, err := s.sshRepo.UpdateSSHSession(ctx, sshSession)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (s *SSHService) DeleteSSHSesion(ctx context.Context, sessionID string) (bool, error) {
	bool, err := s.sshRepo.DeleteSSHSession(ctx, sessionID)
	if err != nil {
		return bool, err
	}

	return bool, nil
}
