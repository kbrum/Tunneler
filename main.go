package main

import (
	"embed"
	"log"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"tunneler/internal/adapter"
	"tunneler/internal/infra"
	"tunneler/internal/service"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	client, err := infra.CreateSupabaseClient()
	if err != nil {
		log.Fatal("Error creating supabase client:", err)
	}

	userRepository := infra.NewSupabaseUserRepository(client)
	userService := service.NewUserService(userRepository)
	userController := adapter.NewUserController(userService)

	// Create an instance of the app structure
	app := NewApp(userController)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "tunneler",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			userController,
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
