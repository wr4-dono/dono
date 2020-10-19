SELECT AVG(rating)
FROM carriers_ratings cr
JOIN donos d ON cr.dono_id = d.dono_id
JOIN users u ON u.user_id = d.carrier_id
WHERE user_id = $1;