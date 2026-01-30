package adapter

import (
	"context"

	"tunneler/internal/service"
)

type ControllerManager struct {
	UserController *UserController
}

func NewControllerManager(serviceManager *service.ServiceManager) *ControllerManager {
	return &ControllerManager{
		UserController: NewUserController(serviceManager.UserService),
	}
}

func (cm *ControllerManager) GetAll() []interface{ any } {
	return []interface{ any }{
		cm.UserController,
	}
}

func (cm *ControllerManager) StartupAll(ctx context.Context) {
	cm.UserController.Startup(ctx)
}
