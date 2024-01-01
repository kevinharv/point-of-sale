CREATE TABLE IF NOT EXISTS users (
    id          BIGSERIAL PRIMARY KEY
    first_name  VARCHAR(255)
    middle_name VARCHAR(255)
    last_name   VARCHAR(255)
    birthdate   TIMESTAMP

);

CREATE TABLE IF NOT EXISTS permissions (
    id            BIGSERIAL PRIMARY KEY
    userID        BIGSERIAL REFERENCES users(id)
    administrator BOOLEAN
);