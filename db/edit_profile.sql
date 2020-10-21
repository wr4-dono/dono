UPDATE users
SET username = $2, zip_code = $3, email = $4
WHERE user_id = $1
returning user_id, username, zip_code, email;