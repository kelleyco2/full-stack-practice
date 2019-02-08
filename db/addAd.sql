update users
set adurl = $1,
    rate = $2,
    per = $3
where email = $4
returning *;