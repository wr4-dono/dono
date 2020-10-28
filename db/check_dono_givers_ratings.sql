  SELECT * 
  FROM donos d
  JOIN givers_ratings gr ON d.dono_id = gr.dono_id
  WHERE gr.dono_id = $1