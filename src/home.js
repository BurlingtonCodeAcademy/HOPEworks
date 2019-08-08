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
          <div>
              <Link to={{ pathname: "/form" }}>create new form</Link>
              <br/>
              <Link to={{ pathname: "/" }}><button>log out</button></Link>
          </div>
      )
    }  
}

export default Home;