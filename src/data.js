import React from 'react';

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            forms: null
        }
        this.showStalkingCount = this.showStalkingCount.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/forms");
        const formsObj = await response.json();
        this.setState({forms: formsObj})
    }

    showStalkingCount (forms) {
        if (forms) {
            let theCount = 0;
            forms.forEach((form) => {
                let incidentArray = form.data.incidents;
                incidentArray.forEach((incident) => {
                    if (incident.victimization.includes("Stalking")) {
                        theCount++;
                    }
                })
            })
            return <p>this many stalking incidents occurred: {theCount}</p>
        } else {
            return <p>loading form data...</p>;
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
            {this.showStalkingCount(this.state.forms)}
          </div>
           
      )
    }  
}

export default Data; 