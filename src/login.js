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
            <form id="login-form">
                <input placeholder="user"></input>
                <input placeholder="pass"></input>
                <Link to={{ pathname: '/home' }}><button>log in</button></Link>
            </form>
        </div>
      )
    }  
}

export default Login;