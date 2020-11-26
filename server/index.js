const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt');
const saltRounds = 10



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginpro'
})

app.use(cors());
app.use(express.json());
app.use(cors ({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
    session({
        key: "ID",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 *24, 
        },
    })
);


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

app.get("./signin", (req, res) => {
    if( req.session.user ) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false});
    }
});

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE Email = ?",
        email,
        (err, result) => {
            if (err) {
                console.log("error");
                res.send({err: err});
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].Password, (error,response)=> {
                    if(response) {
                        req.session.user = result;
                        console.log("Succeedful");
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        console.log("Wrong password");
                        res.send({ message: "Wrong password"});
                        
                    }
                });
            } else {
                console.log("Wrong email/password");
                res.send({ message: "Wrong email/password"});

            }

        }
        
    );
    

});

app.listen( 3001, () => {
    console.log("running on port 3001");
});