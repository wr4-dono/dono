INSERT INTO users
(username, hash, user_state, zip_code, email)
VALUES
($1, $2, $3, $4, $5)

returning user_id, username, user_state, zip_code, email;