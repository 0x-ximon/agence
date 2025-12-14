-- name: CreateWallet :one
INSERT INTO wallets (address, network, owner)
VALUES ($1, $2, $3) RETURNING *;

-- name: GetWallet :one
SELECT * FROM wallets
WHERE ID = $1 LIMIT 1;

-- name: FindWalletByAddress :one
SELECT * FROM wallets
WHERE address = $1 LIMIT 1;

-- name: FindWalletsByOwner :many
SELECT * FROM wallets
WHERE owner = $1;

-- name: DeleteWallet :exec
DELETE FROM wallets
WHERE ID = $1;
