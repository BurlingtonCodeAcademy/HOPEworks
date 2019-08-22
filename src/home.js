import React from 'react';
import { Link } from "react-router-dom";
import Hw from './images/hw.png';

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
            <div style={{height: "1px"}}></div>
            <img className="home-logo" src={Hw} alt="Hope Works"/>
            <h1 id="home-page-text">User Home Page</h1>
            <div id="the-links">
                <Link to={{ pathname: "/form" }}>
                    <div className="link-box" id="new-form-box">
                        <h3 className="link-box-text">Create a New Form</h3>
                    </div>
                </Link>
                <Link to={{ pathname: "/forms" }}>
                    <div className="link-box" id="view-forms-box">
                        <h3 className="link-box-text">View Submitted Forms</h3>
                    </div>
                </Link>
                <Link to={{ pathname: "/data" }}>
                    <div className="link-box" id="view-data-box">
                        <h3 className="link-box-text">View Data</h3>
                    </div>
                </Link>
            </div>
            <Link to={{ pathname: "/" }}><button id="log-out-home">Log Out</button></Link>
        </div>
      )
    }  
}

export default Home;