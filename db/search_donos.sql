SELECT * 
FROM donos d
JOIN pictures p ON p.dono_id = d.dono_id
WHERE dono_status = $1 AND title ILIKE ($2)