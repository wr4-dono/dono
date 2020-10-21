SELECT * FROM favorites f
JOIN users u ON u.user_id = f.user_id
JOIN donos d ON d.dono_id = f.dono_id 
JOIN pictures p on p.dono_id = d.dono_id
WHERE u.user_id = $1;