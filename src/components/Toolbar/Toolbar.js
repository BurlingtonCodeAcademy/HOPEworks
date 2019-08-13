import React from 'react';

import './Toolbar.css';

const toolbar = props => (
  <header className="toobar">
     <nav className="toolbar_navigation">
        <div></div>
        <div className="toolbar_logo"><a href="/">HOPE WORKS</a></div>
        <div className="toolbar_navigation-items">
          <ul>
            <li><a href="#all-fields">Personal Information</a></li>
            <li><a href="#demographic-content">Demographic</a></li> 
            <li><a href="#incident-information">Incident Information</a></li> 
            <li><a href="#ongoing-services">Communication Details</a></li> 
            <li><a href="#services-provided">Services Provided</a></li> 
            <li><a href="#referrals-h">Referrals</a></li> 
            <li><a href="#measures">Outcome Measures</a></li> 
            <li><a href="#notes">Notes</a></li> 
          </ul>
        </div>
     </nav>
  </header>
);

export default toolbar; 