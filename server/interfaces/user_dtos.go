package interfaces

type CreateUserDTO struct {
	Id                  string `json:"id"`
	FirstName           string `json:"firstName"`
	LastName            string `json:"lastName"`
	EmailAddress        string `json:"emailAddress"`
	PhoneNumber         string `json:"phoneNumber"`
	Role                string `json:"role"`
	MinHourlyRate       int    `json:"minHourlyRate"`
	MaxHourlyRate       int    `json:"maxHourlyRate"`
	PreferredBlockchain string `json:"preferredBlockchain"`
}
