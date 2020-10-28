  SELECT * 
  FROM donos d
  JOIN carriers_ratings cr ON d.dono_id = cr.dono_id
  WHERE cr.dono_id = $1