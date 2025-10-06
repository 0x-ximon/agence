package models

import (
	"errors"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id                  string `json:"id"`
	FirstName           string `json:"firstName"`
	LastName            string `json:"lastName"`
	PhoneNumber         string `json:"phoneNumber"`
	EmailAddress        string `json:"emailAddress"`
	Role                string `json:"role"`
	MinHourlyRate       int    `json:"minHourlyRate"`
	MaxHourlyRate       int    `json:"maxHourlyRate"`
	PreferredBlockchain string `json:"preferredBlockchain"`
}

type UserRepository interface {
	SaveUser(user *User) (*User, error)
	FindUserById(id string) (*User, error)
	FindUserByEmail(email string) (*User, error)
	FindAllUsers() (*[]User, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserModel(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

func (r *userRepository) SaveUser(user *User) (*User, error) {
	err := r.db.Create(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) FindUserByEmail(email string) (*User, error) {
	var user User
	err := r.db.Where("email_address = ?", email).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("user not found")
	}

	return &user, nil
}

func (r *userRepository) FindAllUsers() (*[]User, error) {
	var users []User
	err := r.db.Find(&users).Error

	if err != nil {
		return nil, err
	}

	return &users, nil
}

func (r *userRepository) FindUserById(id string) (*User, error) {
	var user User
	err := r.db.Where("id = ?", id).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
