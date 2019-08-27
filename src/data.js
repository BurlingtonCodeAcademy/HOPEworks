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
  }

  //age range countergit [p]

  


  formsCounter(forms) {
    if (forms) {
      return (<p>There are {forms.length} forms total.</p>)
    }
  }


showEthnicityCount(forms) {
  if (forms) {
    let theCount = 0;
    forms.forEach(form => {
      let ethnicityArray = form.data.ethnicity|| [];
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
        if(form.data.miscellaneousCharacteristics) {
        let homelessArray = form.data.miscellaneousCharacteristics;
        if (homelessArray.includes("Homeless")) {
          theCount++;
        }}
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
    return (<p>There are this many {displayGender} survivors: {theCount}</p>);
  }
  }

  showSchoolCount(forms) {
    if (forms) {
      let theCount = 0;
      let displaySchool = document.getElementById("Schools").value
      forms.forEach(form => {
        let school = form.data.nameOfSchool;
        if (school === displaySchool) {
          theCount++;
        }
      });
      return (<p>There are this many survivors from {displaySchool}: {theCount}</p>);
    }
  }
  
  showAgeRange (forms) {
    if (!forms) {
      return <p>getting the forms (age range)</p>
    } else if (forms) {
      let ageRange = document.getElementById("Age-Range").value
      let theCount = 0;

      let ageLow;
      let ageHigh;

      if (ageRange==="60+") {
        ageLow = 60;
        ageHigh = 1000000000;
      } else {
        let ageArray = ageRange.split("-")
        ageArray = ageArray.map((string) => Number(string))
        ageLow = ageArray[0];
        ageHigh = ageArray[1];
      }

      for (let form of forms) {
        let theForm = form.data
        let ageType = null;                 // if we know the DOB, we can display an exact current age and exact age at time of contact.
        if (theForm.dateOfBirth && theForm.dateOfBirth!=="") {
            ageType = "dob"
        } else if (theForm.ageRange && theForm.ageRange[0]!=="") { //if we only have an age range, we will have to approximate current age.
            ageType = "range"
        }

        let contactDateArray; //apparently this variable has to be declared outside the below conditional or literally the whole app breaks
          
        if (ageType==="dob" || ageType==="range") {
          contactDateArray = theForm.contactDate.split("-") //theForm.contactDate: YYYY-MM-DD => ["YYYY", "MM", "DD"]
          contactDateArray.push(contactDateArray[0]) //["YYYY", "MM", "DD", "YYYY"]
          contactDateArray = contactDateArray.slice(1, 4) //["MM", "DD", "YYYY"]
          contactDateArray = contactDateArray.map((string) => Number(string)) //[MM, DD, YYYY] (numbers)
        }
        
        if (ageType==="dob") {
          let birthDateArray = theForm.dateOfBirth.split("-") //theForm.birthDate: YYYY-MM-DD => ["YYYY", "MM", "DD"]
          birthDateArray.push(birthDateArray[0]) //["YYYY", "MM", "DD", "YYYY"]
          birthDateArray = birthDateArray.slice(1, 4) //["MM", "DD", "YYYY"]
          birthDateArray = birthDateArray.map((string) => Number(string)) //[MM, DD, YYYY] (numbers)

          let ageAtContact = contactDateArray[2] - birthDateArray[2]
          if (contactDateArray[0] - birthDateArray[0] < 0) { //months
              ageAtContact--
          } else if ((contactDateArray[0] - birthDateArray[0] === 0) && (contactDateArray[1] - birthDateArray[1] < 0)) { //same month, not up to the day yet
              ageAtContact--              //age at contact found if age was entered in dob
          }

          if (ageLow <= ageAtContact && ageAtContact <= ageHigh) {
            theCount++
          }

        } else if (ageType==="range") {
          let lowEst = Number(theForm.ageRange[0])
          let highEst = Number(theForm.ageRange[1])
          let ageEst = Math.floor((lowEst + highEst)/2)

          if (ageLow <= ageEst && ageEst <= ageHigh) {
            theCount++
          }
        }
      }
      return (<p>There are {theCount} profiles in this {ageRange} age group</p>);
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
        <form id="Victimizations">
          <select id="input" onChange={this.handleInputChange}>
            <option disabled selected value="">
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
        <form id="drop-down-data">
          <select id="Homelessness" onChange={this.handleInputChange}>
            <option disabled selected value="">
              Homelessness
            </option>
            <option value="Homeless">Yes</option>
            <option value="">No</option>
          </select>
        </form>
        <form id="drop-down-data">
          <select id="Schools" onChange={this.handleInputChange}>
            <option disabled selected value="">
              Schools
            </option>
            <option value="UVM">University of Vermont</option>
            <option value="Champlain">Champlain College</option>
            <option value="CCV">Community College Of Vermont</option>
            <option value="St.Mikes">Saint Michaels College</option>
            <option value="Colchester High School">
              Colchester High School
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
        <form id="drop-down-data">
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
        <form id="drop-down-data">
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
        <form id="drop-down-data">
          <select id="Age-Range" onChange={this.handleInputChange}>
            <option disabled selected value="">Age Range</option>
            <option value="0-12">0-12</option>
            <option value="13-17">13-17</option>
            <option value="18-21">18-21</option>
            <option value="22-24">22-24</option>
            <option value="25-59">25-59</option>
            <option value="60+">60+</option>
          </select>
        </form>
        {this.formsCounter(this.state.forms)}
        {this.showVictimizationCount(this.state.forms, this.state.input)}
        {this.showHomelessCount(this.state.forms)}
        {this.showGenderCount(this.state.forms)}
        {this.showEthnicityCount(this.state.forms)}
        {this.showSchoolCount(this.state.forms)}
        {this.showAgeRange(this.state.forms)}
      </div>
    );
  }
}

export default Data;
