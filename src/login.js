import React from 'react';
// import { Link } from "react-router-dom";
import Hw from '/Users/spotspot/code/hopeworks/src/images/hw.png';
import SignIn from '/Users/spotspot/code/hopeworks/src/images/sign-in-google.png';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }

    render() {
        return (
          <div className="login-container">
          <div className="login-contents">  
            <img className="hw-logo" src={Hw} alt="Hope Works"/>
              <div className="w3">
               <div className="signin-form profile">
                <h3 id="login-message">We Believe Survivors. We Support Survivors.</h3>
                <div className="main">
                 <div className="login-form">
                  <form action="/" method="post">
                    <input id="login-box" type="text" name="logemail" placeholder="E-mail" required="" />
                    <input id="login-box" type="password" name="logpassword" placeholder="Password" required="" />
                     <div className="tp">
                     <input className="login-button" type="submit" value="LOGIN" />
                     </div>
                     <br />
                     <img className="google-logo" src={SignIn} alt="Sign in with Google"/>
                    </form>
                   </div>
                  </div>
              </div>
             </div>
           </div>
          </div> 
        )
    }
}

export default Login;