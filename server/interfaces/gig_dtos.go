package interfaces

type CreateGigDTO struct {
	Title         string  `json:"title"`
	Description   string  `json:"description"`
	MinHourlyRate int     `json:"minHourlyRate"`
	MaxHourlyRate int     `json:"maxHourlyRate"`
	Agency        string  `json:"agency"`
	Ace           *string `json:"ace"`
	Kind          string  `json:"kind"`
	BindingAmount int64   `json:"bindingAmount"`
}
