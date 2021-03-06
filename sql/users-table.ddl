DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
    "id"        UUID PRIMARY KEY NOT NULL,
    "login"     VARCHAR(50) UNIQUE NOT NULL,
    "password"  VARCHAR(64) NOT NULL,
    "age"       INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
