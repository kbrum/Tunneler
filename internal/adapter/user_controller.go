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

func (c *UserController) LoginUser(req dto.LoginRequest) (*dto.LoginResponse, error) {
	user := &domain.User{
		Email:    req.Email,
		Password: req.Password,
	}

	data, err := c.userService.Login(c.ctx, user)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		ID:    data.ID,
		Name:  data.Name,
		Email: data.Email,
	}, nil
}

func (c *UserController) LogoutUser() error {
	return c.userService.Logout(c.ctx)
}

func (c *UserController) GetUser() (*dto.AuthStatusResponse, error) {
	session, err := c.userService.GetUser(c.ctx)
	if err != nil {
		return &dto.AuthStatusResponse{
			Auth: false,
		}, err
	}

	if session == nil {
		return &dto.AuthStatusResponse{
			Auth: false,
		}, nil
	}

	return &dto.AuthStatusResponse{
		ID:    session.User.ID,
		Email: session.User.Email,
		Auth:  true,
	}, nil
}
