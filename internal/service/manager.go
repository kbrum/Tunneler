package service

import (
	"tunneler/internal/infra"
)

type ServiceManager struct {
	UserService *UserService
	SSHService  *SSHService
}

func NewServiceManager(infra *infra.InfraManager) *ServiceManager {
	return &ServiceManager{
		UserService: NewUserService(infra.UserInfra, infra.SessionInfra),
		SSHService:  NewSSHService(infra.UserInfra, infra.SessionInfra, infra.SSHSessionInfra),
	}
}
