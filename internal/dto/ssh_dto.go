package dto

type CreateSSHSessionRequestDTO struct {
	SSHSessionName     string `json:"ssh_session_name"`
	SSHSessionIP       string `json:"ssh_session_ip"`
	SSHSessionPort     int    `json:"ssh_session_port"`
	SSHSessionUser     string `json:"ssh_session_user"`
	FolderID           string `json:"folder_id"`
	KeyID              string `json:"key_id"`
	SSHSessionAuthType string `json:"ssh_session_auth_type"`
}

type CreateSSHSessionResponseDTO struct {
	ID                 string `json:"id"`
	SSHSessionName     string `json:"ssh_session_name"`
	SSHSessionIP       string `json:"ssh_session_ip"`
	SSHSessionPort     int    `json:"ssh_session_port"`
	SSHSessionUser     string `json:"ssh_session_user"`
	SSHSessionStatus   string `json:"ssh_session_status"`
	SSHSessionAuthType string `json:"ssh_session_auth_type"`
	LastLogin          string `json:"last_login"`
}

type CreateFolderRequestDTO struct {
	FolderName string `json:"folder_name"`
}

type CreateFolderResponseDTO struct {
	ID         string `json:"id"`
	FolderName string `json:"folder_name"`
}

type GetSessionResponseDTO struct {
	ID                 string `json:"id"`
	SSHSessionName     string `json:"ssh_session_name"`
	SSHSessionIP       string `json:"ssh_session_ip"`
	SSHSessionPort     int    `json:"ssh_session_port"`
	SSHSessionUser     string `json:"ssh_session_user"`
	SSHSessionStatus   string `json:"ssh_session_status"`
	SSHSessionAuthType string `json:"ssh_session_auth_type"`
	LastLogin          string `json:"last_login"`
}
