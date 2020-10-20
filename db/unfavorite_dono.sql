DELETE FROM favorites
WHERE user_id  = $1 AND favorites_id = $2;