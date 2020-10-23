SELECT u.username, cl.message
FROM chat_log cl 
JOIN chat c ON cl.chat_id = c.chat_id  
JOIN users u ON cl.sender_id = u.user_id
WHERE cl.chat_id = $1
ORDER BY cl.chat_log ASC;