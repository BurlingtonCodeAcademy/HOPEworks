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
          <Link to={{ pathname: "/form" }}>create new form</Link>
      )
    }  
}

export default Home;