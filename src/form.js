import React from 'react';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }

    render() {
      return (
          <form>
              <input placeholder="First Name"></input>
              <input placeholder="Last Initial"></input>
              <button>submit</button>
              <p>etc</p>
          </form>
      )
    }  
}

export default Form;