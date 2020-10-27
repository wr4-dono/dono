-- INSERT INTO favorites
-- (dono_id, user_id, title)
-- VALUES ($1, $2, $3);
-- SELECT u.id, d.dono_id, d.title FROM donos d
-- JOIN favorites f ON d.title = f.title 
-- JOIN users u ON u.id = d.dono_id
-- WHERE u.id = $1
INSERT INTO favorites 
(user_id, dono_id)
VALUES 
($1, $2);



