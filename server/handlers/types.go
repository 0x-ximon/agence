package handlers

type Credentials struct {
	EmailAddress string `json:"email_address"`
	Password     string `json:"password,omitempty"`
	OTP          string `json:"otp,omitempty"`
}

type Result struct {
	Message string `json:"message"`
	Error   error  `json:"error,omitempty"`
	Data    any    `json:"data,omitempty"`
}
