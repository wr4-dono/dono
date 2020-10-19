SELECT AVG(rating)
FROM givers_ratings gr
JOIN donos d ON gr.dono_id = d.dono_id
JOIN users u ON u.user_id = d.giver_id
WHERE user_id = $1;