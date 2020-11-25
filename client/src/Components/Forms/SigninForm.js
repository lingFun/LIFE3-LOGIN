import React, { Component, useState } from "react";
import Axios from "axios";

export default function SigninForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => (
    Axios.post("http://localhost:3001/signin", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response.data);
    })
  );

    return (
        <div id="signin" className="container">
        <form className="modal-content" method="post">
        
        {/* <?php login_validation();
                display_message(); ?> */}
        <h1>Life3 Member Sign in</h1>
       
        <label htmlFor="useremail"><b>User email</b></label>
        <input type="text" placeholder="Enter user email" name="Uemail" required
          onChange={(e) => {setEmail(e.target.value);}}/>
    
        <label htmlFor="password"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="Upass" required
          onChange={(e) => {setPassword(e.target.value);}}/>
        <p>Don't have a account? <a href="signup.php">Sign up</a> first!</p>

        <div className="clearfix">
            <button type="button"  className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn" onClick={signin}><b>Sign in</b></button>
        </div>
        
        <input type="checkbox" name="remember"/><span> Remember Me</span>
        <a href="recover.php" className="floatright"><u>Forget Password?</u></a>
        
        </form>
    </div>
    );
  
}
