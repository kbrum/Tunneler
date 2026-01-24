package dto

type CreateSSHSessionRequestDTO struct {
	SSHSessionName string
	SSHSessionIP   string
	SSHSessionPort int
	Tags           []string
	FolderID       string
}

type CreateSSHSessionResponseDTO struct {
	ID             string
	SSHSessionName string
	SSHSessionIP   string
	SSHSessionPort int
}

type CreateFolderRequestDTO struct {
	FolderName string
}

type CreateFolderResponseDTO struct {
	ID         string
	FolderName string
}
