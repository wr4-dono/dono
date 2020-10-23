SELECT u.email FROM users u
JOIN donos d ON d.carrier_id = u.user_id
WHERE d.carrier_id = $1;