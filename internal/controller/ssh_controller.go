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

func (c *SSHController) CreateSSHSession(req dto.CreateSSHSessionRequestDTO) (*dto.CreateSSHSessionResponseDTO, error) {
	sshSession := &domain.SSHSession{
		Name:     req.SSHSessionName,
		IP:       req.SSHSessionIP,
		Port:     req.SSHSessionPort,
		User:     req.SSHSessionUser,
		FolderID: req.FolderID,
		KeyID:    req.KeyID,
		AuthType: domain.AuthType(req.SSHSessionAuthType),
	}

	data, err := c.SSHService.CreateSSHSession(c.ctx, sshSession)
	if err != nil {
		return nil, err
	}

	res := &dto.CreateSSHSessionResponseDTO{
		ID:                 data.ID,
		SSHSessionName:     data.Name,
		SSHSessionIP:       data.IP,
		SSHSessionPort:     data.Port,
		SSHSessionUser:     data.User,
		SSHSessionStatus:   string(data.Status),
		SSHSessionAuthType: string(data.AuthType),
		LastLogin:          data.LastLogin.String(),
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
			ID:                 session.ID,
			SSHSessionName:     session.Name,
			SSHSessionIP:       session.IP,
			SSHSessionPort:     session.Port,
			SSHSessionUser:     session.User,
			SSHSessionStatus:   string(session.Status),
			SSHSessionAuthType: string(session.AuthType),
			LastLogin:          session.LastLogin.String(),
		}
	}

	return res, nil
}

func (c *SSHController) GetSSHSessionByID(req dto.GetSessionRequestDTO) (*dto.GetSessionResponseDTO, error) {
	session, err := c.SSHService.GetSSHSessionByID(c.ctx, req.SessionID)
	if err != nil {
		return nil, err
	}

	res := &dto.GetSessionResponseDTO{
		ID:                 session.ID,
		SSHSessionName:     session.Name,
		SSHSessionIP:       session.IP,
		SSHSessionPort:     session.Port,
		SSHSessionUser:     session.User,
		SSHSessionStatus:   string(session.Status),
		SSHSessionAuthType: string(session.AuthType),
		LastLogin:          session.LastLogin.String(),
	}

	return res, nil
}

func (c *SSHController) UpdateSSHSession(req dto.UpdateSessionRequestDTO) (*dto.UpdateSessionResponseDTO, error) {
	sshSession := &domain.SSHSession{
		ID:       req.ID,
		Name:     req.SSHSessionName,
		IP:       req.SSHSessionIP,
		Port:     req.SSHSessionPort,
		User:     req.SSHSessionUser,
		Status:   domain.Status(req.SSHSessionStatus),
		AuthType: domain.AuthType(req.SSHSessionAuthType),
	}

	data, err := c.SSHService.UpdateSSHSession(c.ctx, sshSession)
	if err != nil {
		return nil, err
	}

	res := &dto.UpdateSessionResponseDTO{
		ID:                 data.ID,
		SSHSessionName:     data.Name,
		SSHSessionIP:       data.IP,
		SSHSessionPort:     data.Port,
		SSHSessionUser:     data.User,
		SSHSessionStatus:   string(data.Status),
		SSHSessionAuthType: string(data.AuthType),
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
