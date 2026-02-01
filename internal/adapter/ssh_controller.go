package adapter

import (
	"context"

	"tunneler/internal/domain"
	"tunneler/internal/dto"
	"tunneler/internal/service"
)

type SSHController struct {
	SSHService *service.SSHService
	ctx        context.Context
}

func NewSSHController(SSHService *service.SSHService) *SSHController {
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

func (c *SSHController) GetSSHSession() (*dto.GetSessionResponseDTO, error) {
	_, err := c.SSHService.GetSSHSessions(c.ctx)
	if err != nil {
		return nil, err
	}

	return nil, nil
}
