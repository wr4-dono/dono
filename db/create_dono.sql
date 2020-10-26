INSERT INTO donos
(giver_id, zip_code, dono_state, title, description, price, multiple_people, truck_trailer)
VALUES
($1,$2,$3,$4,$5,$6,$7,$8)
RETURNING dono_id;