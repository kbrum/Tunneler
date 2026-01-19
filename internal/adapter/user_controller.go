package adapter

import (
	"context"

	"tunneler/internal/domain"
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

func (c *UserController) CreateUser(req dto.CreateUserRequest) (*dto.CreateUserResponse, error) {
	user := &domain.User{
		Email:    req.Email,
		Password: req.Password,
		Name:     req.Name,
	}

	data, err := c.userService.Create(c.ctx, user)
	if err != nil {
		return nil, err
	}

	return &dto.CreateUserResponse{
		ID:    data.ID,
		Name:  data.Name,
		Email: data.Email,
	}, nil
}

func (c *UserController) LoginUser(req dto.LoginRequest) error {
	user := &domain.User{
		Email:    req.Email,
		Password: req.Password,
	}

	err := c.userService.Login(c.ctx, user)
	if err != nil {
		return err
	}

	return nil
}

func (c *UserController) LogoutUser(req dto.LogoutRequest) error {
	session := &domain.Session{
		AccessToken: req.AccessToken,
	}
	return c.userService.Logout(c.ctx, session)
}
