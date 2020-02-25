const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fse',
  password: 'password',
  port: 5432,
})
pool.query('SELECT * FROM USERS', (err, res) => {
  console.log(err, res.rows[0])
  pool.end()
})
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'fse',
//   password: 'password',
//   port: 5432,
// })
// client.connect()
// client.query('SELECT * FROM USERS', (err, res) => {
//   console.log(err, res)
//   client.end()
// })