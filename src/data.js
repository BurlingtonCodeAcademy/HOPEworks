import React from 'react';

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            input: null,
            forms: null
        }
        this.showVictimizationCount = this.showVictimizationCount.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/forms");
        const formsObj = await response.json();
        this.setState({forms: formsObj})
    }

    showVictimizationCount (forms, incident) {
        if (forms) {
            let theCount = 0;
            forms.forEach((form) => {
                let incidentArray = form.data.incidents;
                incidentArray.forEach((incidentTwo) => {
                    if (incidentTwo.victimization.includes(incident)) {
                        theCount++;
                        console.log(incident)
                    }
                })
            })
            return <p>This many {incident}'s occurred: {theCount}</p>
        } else {
            return <p>loading form data...</p>;
        }
    }

    showHomelessCount(forms) {
        if (forms && document.getElementById("Homelessness").value === "Homeless") {
            let theCount = 0;
            forms.forEach((form) => {
                console.log(form.data.miscellaneousCharacteristics)//this is an array.
                let homelessArray = form.data.miscellaneousCharacteristics;
                    //console.log(homeless)//this is actually a string
                    if (homelessArray.includes("Homeless")) {
                        theCount++;
                    }

             })
            return <p>This many are homeless: {theCount}</p>
        }else{
            return <p>fetching homeless data...</p>
        }
    }

    handleInputChange = () => {
   this.setState({input: document.getElementById("input").value})
    }

    render() {
      return (
          <div id="data-page">
            <h1>this is the data page</h1>
            <form id="Victimizations">
            <select id="input" onChange={this.handleInputChange}>
            <option  disabled selected value="">Victimization</option> 
            <option value="Rape">Rape</option>
            <option value="Attempted Rape">Attempted Rape</option>
            <option value="Sex Trafficking">Sex Trafficking</option>
            <option value="Child Sexual Abuse">Child Sexual Abuse</option>
            <option value="Drug Facilitated SV">Drug Facilitated SV</option>
            <option value="Stalking">Stalking</option>
            <option value="Sexaul Harassment">Sexaul Harassment</option>
            <option value="Domestic Violence">Domestic Violence</option>
            <option value="Other">Other</option>
            </select>
            </form>
            <form>
            <select id="Homelessness" onChange={this.handleInputChange}>
            <option disabled selected value="">Homelessness</option> 
            <option value="Homeless">Yes</option> 
            <option value="">No</option>           
            </select>
            </form>
            <form>
            <select id="Schools" onChange={this.handleInputChange}>
            <option disabled selected value="">Schools</option> 
            <option value="UVM">University of Vermont</option>
            <option value="Champlain">Champlain College</option>
            <option value="CCV">Community College Of Vermont</option>
            <option value="St.Mikes">Saint Michaels College</option>
            </select>
            </form>
            
            {this.showVictimizationCount(this.state.forms, this.state.input)}
            {this.showHomelessCount(this.state.forms)}
          </div>
           
      )
    }  
}

export default Data; 