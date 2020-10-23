select * 
FROM donos d
JOIN dono_status ds ON ds.dono_status_id = d.dono_status
WHERE dono_status = 2 AND carrier_id = $1 OR dono_status = 2 AND giver_id = $1;