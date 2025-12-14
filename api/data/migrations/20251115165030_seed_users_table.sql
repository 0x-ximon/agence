-- +goose Up
-- +goose StatementBegin
INSERT INTO
    users (name, user_name, email_address)
VALUES
    ('John Carmack', 'john.carmark', 'john.carmack@email.com'),
    ('Alice Johnson', 'alice.johnson', 'alice.johnson@email.com'),
    ('Bob Smith', 'bob.smith', 'bob.smith@email.com'),
    ('Jane Doe', 'jane.doe', 'jane.doe@email.com'),
    ('Charlie Wilson', 'charlie.wilson', 'charlie.wilson@email.com');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM
    users
WHERE email_address IN
    ('john.carmack@email.com', 'jane.doe@email.com', 'bob.smith@email.com', 'alice.johnson@email.com', 'charlie.wilson@email.com');
-- +goose StatementEnd
