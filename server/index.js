const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10

const jwt = require("jsonwebtoken");

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
app.use(bodyParser.json());

app.use(
    session({
        key: "ID",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24, 
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
    const confirmpassword = req.body.confirmpassword;

    db.query(
        "SELECT * FROM users WHERE Email = ?",
        email,
        (err, result) => {
            if (err) {
                console.log("error");
                res.send({err: err});
            }
            if (result.length > 0) {
                res.send("error: existing email");
            }
        });
    
    if(password === confirmpassword) {        
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err) {
                console.log(err);
            }
            db.query(
                "INSERT INTO users (FirstName, LastName, UserName, Email, Password) VALUES (?,?,?,?,?)",
                [firstname, lastname, username, email, hash],
                (err, result) => {
                    console.log(err);
                    res.send({err: err});
                }
                );
            })
    } else {
        res.send("confirm password is not match");
    }

});

const verifyJWT = (req, res, next) => {
    const token = req.headers("x-access-token")

    if(!token) {
        res.send("Need a token.")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({ auth: false, message: "you failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

app.get("/isUserAuth", verifyJWT, (req,res)=>{
    res.send("you are authenticated")
})

app.get("/signin", (req, res) => {
    // res.send("signin3001");
    if( req.session.users ) {
        res.send({ loggedIn: true, users: req.session.users });
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
                        console.log("Succeedful");
                        
                        const id = result[0].ID;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300,
                        })
                        req.session.users = result;

                        console.log(req.session.users);
                        res.send(result);
                        res.redirect('http://localhost:3000/empower');
                        res.json({auth: true, token: token, result: result});
                        // hashHistory.push('/')
                    } else {
                        console.log("Wrong password");
                        // res.send({ message: "Wrong password"});
                        res.json({auth: false, message: "wrong username/password"});
                    }
                });
            } else {
                console.log("Wrong email/password");
                // res.send({ message: "Wrong email/password"});
                res.json({auth: false, message: "no user exists"});

            }

        }
        
    );
    

});

app.listen( 3001, () => {
    console.log("running on port 3001");
});