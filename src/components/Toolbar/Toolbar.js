import React from 'react';

import './Toolbar.css';

const toolbar = props => (
  <header className="toobar">
     <nav className="toolbar_navigation">
        <div className="toolbar_logo"><a href="/">HOPE WORKS</a></div>
        <div className="toolbar_navigation-items">
          <ul className="toolbar_list-items">
            <li><a href="#all-fields">Personal Info</a></li>
            <li><a href="#demographic-content">Demographic</a></li> 
            <li><a href="#incident-information">Incident Info</a></li> 
            <li><a href="#ongoing-services">Communication Details</a></li> 
            <li><a href="#services-provided">Services Provided</a></li> 
            <li><a href="#referrals">Referrals</a></li> 
            <li><a href="#measures">Outcome Measures</a></li> 
            <li><a href="#notes">Notes</a></li> 
          </ul>
        </div>
     </nav>
  </header>
);

export default toolbar; 