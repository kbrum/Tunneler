package infra

type SSHSessionSchema struct {
	Name      string `json:"session_name"`
	IP        string `json:"session_ip"`
	Port      int    `json:"ssh_port"`
	UserID    string `json:"user_id"`
	KeyID     string `json:"key_id"`
	Folder    string `json:"folder_id"`
	Tags      []string `json:"tags"`
}
