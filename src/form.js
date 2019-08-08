import React from 'react';
import { Link } from "react-router-dom";

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }
    render() {
      return (
          <div>
              <div>
                <img id="Logo"></img>
                </div>
            <form id="the-form">
                <br/>
                <div>
                    <h1>H.O.P.E. Works</h1>
                    <h2>SURVIVOR INTAKE FORM</h2>
                    </div>
                <div id="all-fields">
                    <br/>
                    <label for="first-name">Name of Service User</label>
                    <br/>
                    <input id="first-name" placeholder="First Name"></input>
                    <input placeholder="Last Name/Initial"></input>
                    <br/>
                    <label for="contact-date">Date of contact</label>
                    <br/>
                    <input type="date" id="contact-date"></input>
                    <br/>
                    <label for="advocate-initials">Advocate Initials</label>
                    <br/>
                    <input id="advocate-initials" placeholder="Initials" maxlength="2"></input>
                    <br/>
                    <label for="city-town">City/Town</label>
                    <br/>
                    <input id="city-town" placeholder="City/Town"></input>
                    <br/>
                    <label for="phone">Phone Number</label>
                    <br/>
                    <input id="phone" type="tel" placeholder="802-123-4567"></input>
                    <br/>
                    <div id="survivor-type">
                        <label>
                            <input name="survivor-type" value="Primary Survivor" type="radio"/>Primary Survivor
                        </label>
                        <br/>
                        <label>
                           <input name="survivor-type" value="Secondary Survivor" type="radio"/>Secondary Survivor
                        </label>
                    </div>
                    <label for="survivor-gender">Gender</label>
                    <br/>
                    <select id="survivor-gender">
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Intersex">Intersex</option>
                        <option value="M→F">M→F</option>
                        <option value="F→M">F→M</option>
                        <option value="Questioning">Questioning</option>
                        <option value="Self Defined">Self Defined</option>
                    </select>
                    <br/>
                    <label for="dob">Date of Birth</label>
                    <br/>
                    <input type="date" id="dob"></input>
                    <br/>
                    <label for="age-range">Age (range)</label>
                    <div id="age-range">
                        <label>
                            <input name="age-range" value="0-12" type="radio"/>0-12
                        </label>
                        <br/>
                        <label>
                           <input name="age-range" value="13-17" type="radio"/>13-17
                        </label>
                        <br/>
                        <label>
                           <input name="age-range" value="18-21" type="radio"/>18-21
                        </label>
                        <br/>
                        <label>
                           <input name="age-range" value="22-24" type="radio"/>22-24
                        </label>
                        <br/>
                        <label>
                           <input name="age-range" value="25-59" type="radio"/>25-59
                        </label>
                        <br/>
                        <label>
                           <input name="age-range" value="60+" type="radio"/>60+
                        </label>
                    </div>
                    <label for="language">Language</label>
                    <div id="language">
                        <label>
                            <input name="language" value="English" type="radio"/>English
                        </label>
                        <br/>
                        <label>
                           <input name="language" value="Limited English Proficiency" type="radio"/>Limited English Proficiency
                        </label>
                        <br/>
                        <label>
                           <input name="language" value="ASL" type="radio"/>ASL
                        </label>
                        <br/>
                        <label>
                            <input name="language" type="radio"/>Other:
                            <input type="text" name="language"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        </label>
                    </div>
                    <label for="ethnicity">Ethnicity</label>
                    <div id="ethnicity">
                        <input type="checkbox" name="ethnicity" value="Asian"/>Asian
                        <br/>
                        <input type="checkbox" name="ethnicity" value="Black/African American"/>Black/African American
                        <br/>
                        <input type="checkbox" name="ethnicity" value="Hispanic/Latino"/>Hispanic/Latino
                        <br/>
                        <input type="checkbox" name="ethnicity" value="Native American/Alaskan"/>Native American/Alaskan
                        <br/>
                        <input type="checkbox" name="ethnicity" value="Native Hawaiian/Pacific Islander"/>Native Hawaiian/Pacific Islander
                        <br/>
                        <input type="checkbox" name="ethnicity" value="White/Caucasian"/>White/Caucasian
                        <br/>
                        <input type="checkbox" name="ethnicity" value="Unknown"/>Unknown
                        <br/>
                        <input type="checkbox" name="ethnicity" value="Other"/>Other:
                        <input type="text" name="ethnicity"/>
                    </div>
                    <label for="number-children">Number of Children in Household</label>
                    <br/>
                    <input id="number-children" type="number" min="0" max="30"></input>
                    <br/>
                    <label for="disability">Disability (self-disclosed)</label>
                    <div id="disability">
                        <label>
                            <input name="disability" value="yes" type="radio"/>Yes
                        </label>
                        <br/>
                        <label>
                           <input name="disability" value="no" type="radio"/>No
                        </label>
                    </div>
                    <label for="characteristics">Misc. Characteristics</label>
                    <div id="characteristics">
                        <input type="checkbox" name="characteristics" value="Deaf/Hard of Hearing"/>Deaf/Hard of Hearing
                        <br/>
                        <input type="checkbox" name="characteristics" value="LGBTQ+"/>LGBTQ+
                        <br/>
                        <input type="checkbox" name="characteristics" value="Refugee/Recent Immigrant"/>Refugee/Recent Immigrant
                        <br/>
                        <input type="checkbox" name="characteristics" value="Homeless"/>Homeless
                        <br/>
                        <input type="checkbox" name="characteristics" value="Low Income"/>Low Income
                        <br/>
                        <input type="checkbox" name="characteristics" value="White/Caucasian"/>White/Caucasian
                        <br/>
                        <input type="checkbox" name="characteristics" value="Unknown"/>Unknown
                        <br/>
                    </div>
                </div>
                <button>submit</button>
            </form>
            <Link to={{ pathname: '/home' }}><button>back</button></Link>
          </div>
      )
    }  
}

export default Form;