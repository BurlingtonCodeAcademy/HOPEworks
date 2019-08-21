import React from "react";
import Hw from './images/hw.png';

class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      input: null,
      forms: null
    };
    this.showVictimizationCount = this.showVictimizationCount.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/forms");
    const formsObj = await response.json();
    this.setState({ forms: formsObj });
    console.log(formsObj)
  }

  //counter for how many forms

  //schools counter for surrounding colleges and HS with an other bar

  //age range counter

  


  formsCounter(forms) {
    if (forms) {
      return (<p>There are {forms.length} forms total.</p>)
    }
  }


showEthnicityCount(forms) {
  if (forms) {
    let theCount = 0;
    forms.forEach(form => {
    let ethnicityArray = form.data.ethnicity;
    ethnicityArray.forEach(ethnicity => {
      if (ethnicity === document.getElementById("Ethnicity").value) {
        theCount++;
      } 
    })
    })
 return (<p>There are this many {document.getElementById("Ethnicity").value}: {theCount}</p>)
  }
}

  showVictimizationCount(forms, incident) {
    if (!forms) {
      return <p>Loading form data...</p>;
    } else if (forms && !incident) {
      return <p>Waiting for input...</p>
    } else if (forms && incident) {
      let theCount = 0;
      forms.forEach(form => {
        let incidentArray = form.data.incidents;
        incidentArray.forEach(incidentTwo => {
          if (incidentTwo.victimization.includes(incident)) {
           theCount++;
          }
        });
      });
      return (
        <p>
          This many {incident}'s occurred: {theCount}
        </p>
      );
    } 
  }

  showHomelessCount(forms) {
    if (forms && document.getElementById("Homelessness").value === "Homeless") {
      let theCount = 0;
      forms.forEach(form => {
        let homelessArray = form.data.miscellaneousCharacteristics;
        if (homelessArray.includes("Homeless")) {
          theCount++;
        }
      });
      return <p>This many are homeless: {theCount}</p>;
    } else {
      return <p>Fetching homelessness data...</p>;
    }
  }


showGenderCount(forms) {
  if (forms) {
    let theCount = 0;
    let displayGender = document.getElementById("Gender").value
    forms.forEach(form => {
      let gender = form.data.survivorGender;
      if (gender === displayGender) {
        theCount++;
      }
    });
    return (<p>There are this many {displayGender}'s: {theCount}</p>);
  }
  }


  

handleInputChange = () => {
    this.setState({ input: document.getElementById("input").value });
  };

  render() {
    return (
      <div id="data-page">
         <img className="hw-logo-data" src={Hw} alt="Hope Works"/>
         <h1 id="data-page-title">Data</h1>
        <form className="drop-down-data" id="Victimizations">
          <select id="input" onChange={this.handleInputChange}>
            <option className="drop-down-data-text" disabled selected value="">
              Victimization
            </option>
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
        <form className="drop-down-data">
          <select id="Homelessness" onChange={this.handleInputChange}>
            <option disabled selected value="">
              Homelessness
            </option>
            <option value="Homeless">Yes</option>
            <option value="">No</option>
          </select>
        </form>
        <form className="drop-down-data">
          <select id="Schools" onChange={this.handleInputChange}>
            <option disabled selected value="">
              Schools
            </option>
            <option value="UVM">University of Vermont</option>
            <option value="Champlain">Champlain College</option>
            <option value="CCV">Community College Of Vermont</option>
            <option value="St.Mikes">Saint Michaels College</option>
            <option value="Colcherster High School">
              Colcherster High School
            </option>
            <option value="South Burlington High School">
              South Burlington High School
            </option>
            <option value="Winooski High School">Winooski High School</option>
            <option value="Burlington High School">
              Burlington High School
            </option>
            <option value="Essex High School">Essex High School</option>
            <option value="Rock Point School">Rock Point School</option>
            <option value="Rice Memorial High School">
              Rice Memorial High School
            </option>
            <option value="Champlain Valley Union High School">
              Champlain Valley Union High School
            </option>
            <option value="Milton High School">Milton High School</option>
            <option value="Mount Mansfield Union High School">
              Mount Mansfield Union High School
            </option>
            <option value="Lake Champlain Waldorf School">
              Lake Champlain Waldorf School
            </option>
            <option value="">Other</option>
          </select>
        </form>
        <form className="drop-down-data">
          <select id="Ethnicity" onChange={this.handleInputChange}>
          <option disabled selected value="">
              Ethnicity
            </option>
            <option value="Asian">Asian</option>
            <option value="Black/African American">
              Black/African American
            </option>
            <option value="Hispanic/Latino">
              Hispanic/Latino American
            </option>
            <option value="Native American/Alaskan">
              Native American/Alaskan
            </option>
            <option value="Native Hawaiian/Pacific Islander">
              Native Hawaiian/Pacific Islander
            </option>
            <option value="White/Caucasian">White/Caucasian</option>
            <option value="Unknown">Unknown</option>
            <option value="">Other</option>
          </select>
        </form>
        <form className="drop-down-data">
            <select id="Gender" onChange={this.handleInputChange}>
            <option disabled selected value="">Gender</option>
            <option value="Unknown">Unknown</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Intersex">Intersex</option>
            <option value="M→F">M→F</option>
            <option value="F→M">F→M</option>
            <option value="Questioning">Questioning</option>
            <option value="Undifined">Undifined</option>
            </select>
        </form>

        {this.showVictimizationCount(this.state.forms, this.state.input)}
        {this.showHomelessCount(this.state.forms)}
        {this.showGenderCount(this.state.forms)}
        {this.showEthnicityCount(this.state.forms)}
        {this.formsCounter(this.state.forms)}
      </div>
    );
  }
}

export default Data;
