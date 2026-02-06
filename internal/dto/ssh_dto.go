package dto

type CreateSessionRequestDTO struct {
	Name     string `json:"name"`
	IP       string `json:"ip"`
	Port     int    `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	FolderID string `json:"folder_id"`
	KeyID    string `json:"key_id"`
	AuthType string `json:"auth_type"`
}

type CreateSessionResponseDTO struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	IP        string `json:"ip"`
	Port      int    `json:"port"`
	User      string `json:"user"`
	Status    string `json:"status"`
	AuthType  string `json:"auth_type"`
	LastLogin string `json:"last_login"`
}

type CreateFolderRequestDTO struct {
	Name string `json:"name"`
}

type CreateFolderResponseDTO struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type GetSessionRequestDTO struct {
	ID string `json:"id"`
}

type GetSessionResponseDTO struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	IP        string `json:"ip"`
	Port      int    `json:"port"`
	User      string `json:"user"`
	Status    string `json:"status"`
	AuthType  string `json:"auth_type"`
	LastLogin string `json:"last_login"`
}

type UpdateSessionRequestDTO struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
	IP       string `json:"ip"`
	Port     int    `json:"port"`
	User     string `json:"user"`
	Status   string `json:"status"`
	AuthType string `json:"auth_type"`
}

type UpdateSessionResponseDTO struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	IP       string `json:"ip"`
	Port     int    `json:"port"`
	User     string `json:"user"`
	Status   string `json:"status"`
	AuthType string `json:"auth_type"`
}
