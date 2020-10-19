INSERT INTO users
(username, hash, zip_code, email)
VALUES
($1, $2, $3, $4)

returning user_id, username, zip_code, email;