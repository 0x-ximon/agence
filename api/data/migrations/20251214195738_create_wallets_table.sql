-- +goose Up
-- +goose StatementBegin
CREATE TYPE NETWORK AS ENUM ('ETHEREUM', 'SOLANA');

CREATE TABLE
  wallets (
    ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    address TEXT NOT NULL UNIQUE,
    network NETWORK NOT NULL,
    owner UUID NOT NULL REFERENCES users(ID),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ DEFAULT NULL
  )
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE wallets;
DROP TYPE NETWORK;
-- +goose StatementEnd
