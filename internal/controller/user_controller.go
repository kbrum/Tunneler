package controller

import (
	"context"

	"tunneler/internal/domain"
	"tunneler/internal/dto"
)

type UserController struct {
	userService domain.UserService
	ctx         context.Context
}

func NewUserController(userService domain.UserService) *UserController {
	return &UserController{
		userService: userService,
	}
}

func (c *UserController) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *UserController) CreateUser(req dto.CreateUserRequestDTO) (*dto.CreateUserResponseDTO, error) {
	user := &domain.User{
		Email:    req.Email,
		Password: req.Password,
		Name:     req.Name,
	}

	data, err := c.userService.Create(c.ctx, user)
	if err != nil {
		return nil, err
	}

	res := &dto.CreateUserResponseDTO{
		ID:    data.ID,
		Name:  data.Name,
		Email: data.Email,
	}

	return res, nil
}

func (c *UserController) LoginUser(req dto.LoginRequestDTO) (*dto.LoginResponseDTO, error) {
	user := &domain.User{
		Email:    req.Email,
		Password: req.Password,
	}

	data, err := c.userService.Login(c.ctx, user)
	if err != nil {
		return nil, err
	}

	res := &dto.LoginResponseDTO{
		ID:    data.ID,
		Name:  data.Name,
		Email: data.Email,
	}

	return res, nil
}

func (c *UserController) LogoutUser() error {
	return c.userService.Logout(c.ctx)
}

func (c *UserController) GetUser() (*dto.AuthStatusResponseDTO, error) {
	session, err := c.userService.GetUser(c.ctx)
	if err != nil {
		return &dto.AuthStatusResponseDTO{
			Auth: false,
		}, err
	}

	if session == nil {
		return &dto.AuthStatusResponseDTO{
			Auth: false,
		}, nil
	}

	res := &dto.AuthStatusResponseDTO{
		ID:    session.User.ID,
		Email: session.User.Email,
		Auth:  true,
	}

	return res, nil
}
