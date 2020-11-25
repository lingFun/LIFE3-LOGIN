const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const bcrypt = require('bcrypt');
const saltRounds = 10



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

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users (FirstName, LastName, UserName, Email, Password) VALUES (?,?,?,?,?)",
            [firstname, lastname, username, email, hash],
            (err, result) => {
              res.send({err: err});
            }
          );
    })

});

app.post("/signin", (req, res) => {
    console.log("4");
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE Email = ?;",
        email,
        (err, result) => {
            if (err) {
                console.log("error");
                res.send({err: err});
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].Password, (error,response)=> {
                    if(response) {
                        console.log("succeed");
                        res.send(result);
                    } else {
                        console.log("Wrong password");
                        res.send({ message: "Wrong password"});
                        
                    }
                });
            } else {
                console.log("Wrong email");
                res.send({ message: "Wrong email"});

            }

        }
        
    );
    

});

app.listen( 3001, () => {
    console.log("running on port 3001");
});