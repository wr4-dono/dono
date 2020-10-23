DELETE FROM pictures
WHERE dono_id =$1;

DELETE FROM donos
WHERE dono_id = $1;