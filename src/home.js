import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }

    render() {
      return (
          <div id="home">
              <h1>Welcome! This is the Home page. Below are the features:</h1>
              <Link to={{ pathname: "/form" }}>create new form</Link>
              <p>change my account info</p>
              <p>(admin) manage accounts</p>
              <Link to={{ pathname: "/forms" }}>View submitted forms</Link>
              <p>view survivor profiles</p>
              <ul>
                  <li>search for a survivor</li>
                  <li>list them all</li>
              </ul>
              <p>2. view aggregate data</p>
              <Link to={{ pathname: "/" }}><button>log out (dummy link to login)</button></Link>
          </div>
      )
    }  
}

export default Home;