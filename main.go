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

	db, err := infra.NewSQLiteConnection("tunneler.db")
	if err != nil {
		log.Fatal("Error creating SQLite connection:", err)
	}
	defer db.Close()

	client, err := infra.CreateSupabaseClient()
	if err != nil {
		log.Fatal("Error creating supabase client:", err)
	}

	sessionRepository := infra.NewSqliteSessionRepository(db)
	userRepository := infra.NewSupabaseUserRepository(client)

	userService := service.NewUserService(userRepository, sessionRepository)

	userController := adapter.NewUserController(userService)

	app := NewApp(userController)

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
			userController, // Agora o Wails vincula o controller com o service completo
		},
	})
	if err != nil {
		log.Fatal("Error:", err.Error())
	}
}
