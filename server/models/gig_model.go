package models

import (
	"gorm.io/gorm"
)

type Gig struct {
	gorm.Model
	Title         string  `json:"title"`
	Description   string  `json:"description"`
	MinHourlyRate int     `json:"minHourlyRate"`
	MaxHourlyRate int     `json:"maxHourlyRate"`
	Agency        string  `json:"agency"`
	Ace           *string `json:"ace"`
	Status        string  `json:"status"`
	Kind          string  `json:"kind"`
	BindingAmount int64   `json:"bindingAmount"`
}

type GigRepository interface {
	SaveGig(gig *Gig) (*Gig, error)
	FindGigById(id string) (*Gig, error)
	FindGigByStatus(status string) (*Gig, error)
	FindAllGigs() (*[]Gig, error)
}

type gigRepository struct {
	db *gorm.DB
}

func NewGigModel(db *gorm.DB) GigRepository {
	return &gigRepository{db}
}

func (r *gigRepository) SaveGig(gig *Gig) (*Gig, error) {
	err := r.db.Create(&gig).Error
	if err != nil {
		return nil, err
	}

	return gig, nil
}

func (r *gigRepository) FindGigById(id string) (*Gig, error) {
	var gig Gig
	err := r.db.Where("id = ?", id).First(&gig).Error
	if err != nil {
		return nil, err
	}
	return &gig, nil
}

func (r *gigRepository) FindGigByStatus(status string) (*Gig, error) {
	var gig Gig
	err := r.db.Where("status = ?", status).First(&gig).Error
	if err != nil {
		return nil, err
	}
	return &gig, nil
}

func (r *gigRepository) FindAllGigs() (*[]Gig, error) {
	var gigs []Gig
	err := r.db.Find(&gigs).Error
	if err != nil {
		return nil, err
	}
	return &gigs, nil
}
