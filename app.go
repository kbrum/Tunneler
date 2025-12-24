package main

import (
	"context"

	"tunneler/internal/adapter"
)

type App struct {
	ctx            context.Context
	userController *adapter.UserController
}

func NewApp(userController *adapter.UserController) *App {
	return &App{
		userController: userController,
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.userController.Startup(ctx)
}
