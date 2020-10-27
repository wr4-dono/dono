UPDATE users
SET username = $2, user_state = $3, zip_code = $4, email = $5
WHERE user_id = $1
returning user_id, username, user_state, zip_code, email;