UPDATE donos
SET zip_code = $2, dono_state = $3, title = $4, description = $5, price= $6, multiple_people = $7, truck_trailer = $8
WHERE dono_id = $1;