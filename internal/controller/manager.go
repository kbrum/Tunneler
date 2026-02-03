package controller

import (
	"context"

	"tunneler/internal/service"
)

type ControllerManager struct {
	UserController *UserController
	SSHController  *SSHController
}

func NewControllerManager(serviceManager *service.ServiceManager) *ControllerManager {
	return &ControllerManager{
		UserController: NewUserController(serviceManager.UserService),
		SSHController:  NewSSHController(serviceManager.SSHService),
	}
}

func (cm *ControllerManager) GetAll() []interface{ any } {
	return []interface{ any }{
		cm.UserController,
		cm.SSHController,
	}
}

func (cm *ControllerManager) StartupAll(ctx context.Context) {
	cm.UserController.Startup(ctx)
	cm.SSHController.Startup(ctx)
}
