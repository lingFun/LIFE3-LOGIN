import React, { Component, useState } from "react";
import Axios from "axios";


export default function SignupForm() {

    const [firstnameReg, setFirstnameReg] = useState("");
    const [lastnameReg, setLastnameReg] = useState("");
    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const signup = () => (
      Axios.post("http://localhost:3001/signup", {
        firstname: firstnameReg,
        lastname: lastnameReg,
        email: emailReg,
        username: usernameReg,
        password: passwordReg,
      }).then((response) => {
        console.log(response);
      })
    );


    return (
      <div id="signup" className="container">
        <form method="post">
          {/* <?php user_validation();
                display_message(); ?> */}
          <h1>Life3 Member Sign Up</h1>
          
          <label htmlFor="firstname"><b>First Name</b></label>
          <input type="text" placeholder="Enter first name" name="FirstName" required
            onChange={(e) => {setFirstnameReg(e.target.value);}}/>
          <label htmlFor="lastname"><b>Last Name</b></label>
          <input type="text" placeholder="Enter last name" name="LastName" required
            onChange={(e) => {setLastnameReg(e.target.value);}}/>

          <label htmlFor="username"><b>User Name</b></label>
          <input type="text" placeholder="Enter username" name="UserName" required
            onChange={(e) => {setUsernameReg(e.target.value);}}/>

          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="Enter email" name="Email" required
            onChange={(e) => {setEmailReg(e.target.value);}}/>
      
          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="Password" required
            onChange={(e) => {setPasswordReg(e.target.value);}}/>
      
          <label htmlFor="confirm-password"><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" name="CPassword" required/>
             {/* onChange={(e) => {setConfirmpasswordReg(e.target.value);}} */}
      
      
          <p>By creating an account you agree to our Terms & Privacy.</p>
      
          <div className="clearfix">
            <button type="button" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn" onClick={signup}><b>Sign Up</b></button>
          </div>
            
        </form>
    </div>  
    );
  
}
