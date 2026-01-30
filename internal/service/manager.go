package service

import (
	"tunneler/internal/infra"
)

type ServiceManager struct {
	UserService *UserService
}

func NewServiceManager(infra *infra.InfraManager) *ServiceManager {
	return &ServiceManager{
		UserService: NewUserService(infra.UserInfra, infra.SessionRepository),
	}
}
