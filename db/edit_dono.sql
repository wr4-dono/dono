UPDATE donos
SET zip_code = $2, title = $3, description = $4, price= $5, multiple_people = $6, truck_trailer = $7
WHERE dono_id = $1;