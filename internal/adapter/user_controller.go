package adapter

import (
	"context"

	"tunneler/internal/dto"
	"tunneler/internal/service"
)

type UserController struct {
	userService *service.UserService
	ctx         context.Context
}

func NewUserController(userService *service.UserService) *UserController {
	return &UserController{
		userService: userService,
	}
}

func (c *UserController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *UserController) CreateUser(email, password, name, username string) error {
	req := dto.CreateUserRequest{
		Email:    email,
		Password: password,
		Name:     name,
		Username: username,
	}

	return c.userService.Create(c.ctx, req)
}

func (c *UserController) LoginUser(email, password string) (*dto.SessionResponse, error) {
	req := dto.LoginRequest{
		Email:    email,
		Password: password,
	}

	return c.userService.Login(c.ctx, req)
}
