SELECT * 
FROM donos d 
JOIN pictures p ON p.dono_id = d.dono_id
WHERE d.dono_id = $1;