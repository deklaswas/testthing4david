const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Use the cors middleware
app.use(cors());

console.log('peo')

//set up connection with DB using our .env info
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//try to connect to database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  //if successful connection, log it in console
  console.log('Connected to MySQL');
});

//get the database here but authetincate token
app.get('/api/users', authenticateToken, (req, res) => {


    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  
});

app.post('/api/login', (req,res) => {

  const username = req.body.name
  const password = req.body.password

  console.log(username)

  if (username !== "root") res.json("error");

  const user = { name: username, password: password }

  const accessToken = jwt.sign(user, process.env.DB_ACCESS_TOKEN)
  res.json( {accessToken: accessToken} )
})

//show a user
app.head('/api/users/:id', (req, res) => {
  const {id} = req.params;
  db.query('SELECT * FROM users WHERE ID=?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/users', authenticateToken, (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, name, email });
  });
});

app.delete('/api/users/:ID', authenticateToken, (req, res) => {
  const {ID} = req.params;
  console.log(ID);
  db.query('DELETE FROM users WHERE ID = ?', [ID], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, ID });
  });
});

//'UPDATE users SET name = ? WHERE email = ?'
app.put('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ? WHERE email = ?', [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, name, email });
  });
});

app.post('/api/login', (req, res) => {
  const username = req.body.username
  const user = {name: username}

  const accessToken = jwt.sign(user, process.env.DB_ACCESS_TOKEN)
  res.json({ accessToken: accessToken })
})


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  //verify token
  jwt.verify(token, process.env.DB_ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)

    if (user.name !== "root") res.json("error");

    req.user = user
    next()
  })
}


const port = process.env.PORT || 7272;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});