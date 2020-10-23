SELECT u.email FROM users u
JOIN donos d ON d.giver_id = u.user_id
WHERE d.giver_id = $1;