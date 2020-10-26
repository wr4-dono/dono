SELECT * 
FROM donos d
JOIN pictures p ON p.dono_id = d.dono_id
WHERE d.dono_status = $1 AND d.title ILIKE ($2) AND d.dono_state = $3;