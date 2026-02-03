package main

import (
	"context"

	"tunneler/internal/controller"
)

type App struct {
	ctx     context.Context
	manager *controller.ControllerManager
}

func NewApp(manager *controller.ControllerManager) *App {
	return &App{
		manager: manager,
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.manager.StartupAll(ctx)
}
