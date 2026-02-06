package controller

import (
	"context"

	"tunneler/internal/domain"
	"tunneler/internal/dto"
)

type SSHController struct {
	SSHService domain.SSHSessionService
	ctx        context.Context
}

func NewSSHController(SSHService domain.SSHSessionService) *SSHController {
	return &SSHController{
		SSHService: SSHService,
	}
}

func (c *SSHController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *SSHController) CreateSSHSession(req dto.CreateSessionRequestDTO) (*dto.CreateSessionResponseDTO, error) {
	sshSession := &domain.SSHSession{
		Name:     req.Name,
		IP:       req.IP,
		Port:     req.Port,
		User:     req.User,
		Password: req.Password,
		KeyID:    req.KeyID,
		AuthType: domain.AuthType(req.AuthType),
	}

	data, err := c.SSHService.CreateSSHSession(c.ctx, sshSession)
	if err != nil {
		return nil, err
	}

	res := &dto.CreateSessionResponseDTO{
		ID:        data.ID,
		Name:      data.Name,
		IP:        data.IP,
		Port:      data.Port,
		User:      data.User,
		Status:    string(data.Status),
		AuthType:  string(data.AuthType),
		LastLogin: data.LastLogin.String(),
	}

	return res, nil
}

func (c *SSHController) GetSSHSessions() ([]*dto.GetSessionResponseDTO, error) {
	sessions, err := c.SSHService.GetSSHSessions(c.ctx)
	if err != nil {
		return nil, err
	}

	res := make([]*dto.GetSessionResponseDTO, len(sessions))
	for i, session := range sessions {
		res[i] = &dto.GetSessionResponseDTO{
			ID:        session.ID,
			Name:      session.Name,
			IP:        session.IP,
			Port:      session.Port,
			User:      session.User,
			Status:    string(session.Status),
			AuthType:  string(session.AuthType),
			LastLogin: session.LastLogin.String(),
		}
	}

	return res, nil
}

func (c *SSHController) GetSSHSessionByID(req dto.GetSessionRequestDTO) (*dto.GetSessionResponseDTO, error) {
	session, err := c.SSHService.GetSSHSessionByID(c.ctx, req.ID)
	if err != nil {
		return nil, err
	}

	res := &dto.GetSessionResponseDTO{
		ID:        session.ID,
		Name:      session.Name,
		IP:        session.IP,
		Port:      session.Port,
		User:      session.User,
		Status:    string(session.Status),
		AuthType:  string(session.AuthType),
		LastLogin: session.LastLogin.String(),
	}

	return res, nil
}

func (c *SSHController) UpdateSSHSession(req dto.UpdateSessionRequestDTO) (*dto.UpdateSessionResponseDTO, error) {
	sshSession := &domain.SSHSession{
		ID:       req.ID,
		Name:     req.Name,
		Password: req.Password,
		IP:       req.IP,
		Port:     req.Port,
		User:     req.User,
		Status:   domain.Status(req.Status),
		AuthType: domain.AuthType(req.AuthType),
	}

	data, err := c.SSHService.UpdateSSHSession(c.ctx, sshSession)
	if err != nil {
		return nil, err
	}

	res := &dto.UpdateSessionResponseDTO{
		ID:       data.ID,
		Name:     data.Name,
		IP:       data.IP,
		Port:     data.Port,
		User:     data.User,
		Status:   string(data.Status),
		AuthType: string(data.AuthType),
	}

	return res, nil
}

func (c *SSHController) DeleteSSHSession(sessionID string) (bool, error) {
	bool, err := c.SSHService.DeleteSSHSession(c.ctx, sessionID)
	if err != nil {
		return bool, err
	}

	return bool, nil
}
