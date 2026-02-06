package infra

import (
	"log"
	"os"

	"github.com/supabase-community/supabase-go"
)

func NewSupabaseClient() (*supabase.Client, error) {
	client, err := supabase.NewClient(os.Getenv("SUPABASE_URL"), os.Getenv("PUBLIC_SUPABASE_KEY"), &supabase.ClientOptions{
		Schema: "ssh",
	})
	if err != nil {
		log.Fatal(err)
	}
	return client, err
}
