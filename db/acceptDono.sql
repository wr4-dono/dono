UPDATE donos
SET carrier_id = $1, dono_status = 2
WHERE dono_id = $2
RETURNING *;