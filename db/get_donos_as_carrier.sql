SELECT * 
FROM donos d
JOIN pictures p ON p.dono_id = d.dono_id
WHERE carrier_id = $1 AND dono_status=3
ORDER BY created_at DESC;