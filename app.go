package main

import (
	"context"

	"tunneler/internal/adapter"
)

type App struct {
	ctx     context.Context
	manager *adapter.ControllerManager
}

func NewApp(manager *adapter.ControllerManager) *App {
	return &App{
		manager: manager,
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.manager.StartupAll(ctx)
}
