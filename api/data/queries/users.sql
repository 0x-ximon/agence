-- name: CreateUser :one
INSERT INTO users (name, user_name, email_address)
VALUES ($1, $2, $3) RETURNING *;

-- name: GetUser :one
SELECT * FROM users
WHERE ID = $1 LIMIT 1;

-- name: FindUserByEmail :one
SELECT * FROM users
WHERE email_address = $1 LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users;

-- name: DeleteUser :exec
DELETE FROM users
WHERE ID = $1;
