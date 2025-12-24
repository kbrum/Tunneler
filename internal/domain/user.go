package domain

import (
	"errors"
	"net/mail"
	"unicode"
)

type User struct {
	UUID     string
	Name     string
	Username string
	Email    string
	Password string
}

type Session struct {
	AccessToken  string
	RefreshToken string
	TokenType    string
	ExpiresIn    int
	ExpiresAt    int64
	User         User
}

var (
	NameEmptyError          = errors.New("Name cannot be empty")
	NameSizeError           = errors.New("Name must be between 2 and 100 characters")
	UsernameEmptyError      = errors.New("Username cannot be empty")
	UsernameSizeError       = errors.New("Username must be between 2 and 30 characters")
	UsernameFormatError     = errors.New("Username can only contain letters, numbers, underscores and hyphens")
	EmailEmptyError         = errors.New("Email cannot be empty")
	EmailValidationError    = errors.New("Invalid email, please check and try again")
	PasswordEmptyError      = errors.New("Password cannot be empty")
	PasswordSizeError       = errors.New("Password must be between 8 and 100 characters")
	PasswordComplexityError = errors.New("Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character")
)

func ValidateName(user *User) error {
	if user.Name == "" {
		return NameEmptyError
	}

	if len(user.Name) < 2 || len(user.Name) > 100 {
		return NameSizeError
	}

	return nil
}

func ValidateUsername(user *User) error {
	if user.Username == "" {
		return UsernameEmptyError
	}

	if len(user.Username) < 2 || len(user.Username) > 30 {
		return UsernameSizeError
	}

	for _, char := range user.Username {
		if !unicode.IsLetter(char) && !unicode.IsNumber(char) && char != '_' && char != '-' {
			return UsernameFormatError
		}
	}

	return nil
}

func ValidateEmail(user *User) error {
	if user.Email == "" {
		return EmailValidationError
	}

	_, err := mail.ParseAddress(user.Email)
	if err != nil {
		return EmailValidationError
	}

	return nil
}

func ValidatePassword(user *User) error {
	if user.Password == "" {
		return PasswordEmptyError
	}

	if len(user.Password) < 8 || len(user.Password) > 100 {
		return PasswordSizeError
	}

	var number, upper, lower, special bool

	for _, char := range user.Password {
		switch {
		case unicode.IsNumber(char):
			number = true
		case unicode.IsUpper(char):
			upper = true
		case unicode.IsLower(char):
			lower = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			special = true
		}
	}

	if !number || !upper || !lower || !special {
		return PasswordComplexityError
	}

	return nil
}

func Validate(user *User) error {
	if err := ValidateName(user); err != nil {
		return err
	}
	if err := ValidateUsername(user); err != nil {
		return err
	}
	if err := ValidateEmail(user); err != nil {
		return err
	}
	if err := ValidatePassword(user); err != nil {
		return err
	}
	return nil
}
