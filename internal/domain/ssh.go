package domain

type SSHSession struct {
	ID             string
	SSHSessionName string
	SSHSessionIP   string
	SSHSessionPort int
	Tags           []string
	UserID         string
	KeyID          string
	FolderID       string
}

type SSHKey struct {
	ID          string
	Label       string
	KeyType     string
	PublicKey   string
	PrivateKey  string
	Fingerprint string
	UserID      string
}

type SSHFolder struct {
	ID         string
	UserID     string
	FolderName string
}
