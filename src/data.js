import React from 'react';

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }

    render() {
      return (
          <div id="data-page">
              <h1>this is the data page</h1>
          </div>
      )
    }  
}

export default Data;