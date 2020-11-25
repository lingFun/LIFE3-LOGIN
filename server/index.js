const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");



const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginpro'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.send("hello life3");
});

app.post("/signup",(req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    // const confirmpassword = req.body.confirmpassword;

    db.query(
        "INSERT INTO users (FirstName, LastName, UserName, Email, Password) VALUES (?,?,?,?,?)",
        [firstname, lastname, username, email, password],
        (err, result) => {
          res.send({err: err});
        }
      );
});

app.post("/signin", (req, res) => {
    console.log("4");
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE Email = ? AND Password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                console.log("1");
                res.send({err: err});
            }
            if (result.length > 0) {
                console.log("2");
                res.send(result);
            } else {
                console.log("3");
                res.send({ message: "Wrong email/password"});
            }

        }
        
    );
    

});

app.listen( 3001, () => {
    console.log("running on port 3001");
});