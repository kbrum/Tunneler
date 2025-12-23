package infra

import (
	"log"
	"os"

	"github.com/supabase-community/supabase-go"
)

func CreateSupabaseClient() (*supabase.Client, error) {
	client, err := supabase.NewClient(os.Getenv("SUPABASE_URL"), os.Getenv("SUPABASE_KEY"), &supabase.ClientOptions{})
	if err != nil {
		log.Fatal(err)
	}
	return client, err
}
