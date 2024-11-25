
const express = require('express'); 
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyparser.json());

// Set the port
const port = process.env.PORT || 3000;

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


//connection mysql database
const db= mysql.createConnection({
    host:'localhost', //running xaamp in localhost
    user:'root', //to run as an administrator
    password:'',
    database:'hr_harmony', //name given
    port:3306 //port number from Xamp
});
//check if database connection is successfull
db.connect(err => {
    if(err){console.log('err')}
    console.log('Database Connected Successfully!!!');
});

app.post('/signup', (req, res) => {
    console.log("performing signup")
    const { username, password } = req.body;
  
    const sql = 'INSERT INTO users (username, password) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = ?);';
    db.query(sql, [username, password, username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error during signup' });
      }
      res.json({ message: 'Signup successful' });
    });
  });
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username exists
    const sqlCheckUser = 'SELECT * FROM users WHERE username = ?';
    db.query(sqlCheckUser, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred during login.' });
        }

        if (results.length === 0) {
            // Username not found
            return res.status(401).json({ error: 'Username not found, please signup.' });
        }

        // Check for both username and password
        const sqlCheckCredentials = 'SELECT * FROM users WHERE username = ? AND password = ?';
        db.query(sqlCheckCredentials, [username, password], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred during login.' });
            }

            if (results.length > 0) {
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid credentials, please use forgot password.' });
            }
        });
    });
});


  app.get('/getAllUsernames',(req,res) => {

    const query = `SELECT username FROM users`;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log("username>>>",results);
        const columnValues = results.map(result => result.username);
        res.json({ columnValues });
      }
    });

    app.put('/changePass', (req, res) => {
      const username = req.body.username;
      const newPassword = req.body.newPassword;
    
      db.query(`UPDATE users SET password=? WHERE username = ?`, [newPassword, username], (err, results) => {
        if (err) {
          console.error('Error updating password:', err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
    
        if (results.affectedRows > 0) {
          console.log('Password updated successfully');
          res.status(200).json({ success: true, message: 'Successfully updated password' });
        } else {
          console.error('No rows affected. Password not updated.');
          res.status(400).json({ success: false, message: 'Failed to update password' });
        }
      });
    });
    
    
    });