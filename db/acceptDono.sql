UPDATE donos
SET carrier_id = $1
WHERE dono_id = $2
RETURNING *;