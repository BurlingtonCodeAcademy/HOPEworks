import React from 'react';
import { Link } from "react-router-dom";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }

    render() {
        return (
            <div>
                <h1>HOPEWORKS🚀 </h1>
                <div class="main">
                    <div class="w3">
                        <div class="signin-form profile">
                            <h3>Login</h3>
                            <div class="login-form">
                                <form action="/home" method="post">
                                    <input type="text" name="logemail" placeholder="E-mail" required="" />
                                    <input type="password" name="logpassword" placeholder="Password" required="" />
                                    <div class="tp">
                                        <input type="submit" value="LOGIN NOW" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;


