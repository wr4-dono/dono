SELECT * 
FROM donos d
JOIN pictures p ON p.dono_id = d.dono_id
WHERE d.giver_id = $1 AND d.dono_status=3
ORDER BY d.created_at DESC;