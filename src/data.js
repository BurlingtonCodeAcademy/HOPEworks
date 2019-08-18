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
              <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
      </form>
          </div>
           
      )
    }  
}

export default Data; 