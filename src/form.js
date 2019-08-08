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
<<<<<<< HEAD
=======
                    <label for="identifier">Other identifier(s) for service user</label>
                    <br/>
                    <input id="identifier" placeholder="Favorite color, etc."></input>
                    <br/>
>>>>>>> be8f97448e03537b9a95d42afe192313f030927e
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
                    <hr/>
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
                        <input type="checkbox" name="characteristics" value="White/Caucasian"/>College student/affiliated with a college
                        <br/>
                        <label for="name-of-school">Name of school:</label>
                        <input id="name-of-school" type="text" name="characteristics"/>
                        <br/>
                    </div>
                    <label for="hear-about">How did the service user hear about HOPE Works?</label>
                    <br/>
                    <input id="hear-about" placeholder="Name of referrer"></input>
                    <hr/>
                    <label for="victimization">Victimization</label>
                    <div id="victimization">
                        <input type="checkbox" name="victimization" value="Rape"/>Rape
                        <br/>
                        <input type="checkbox" name="victimization" value="Attempted Rape"/>Attempted Rape
                        <br/>
                        <input type="checkbox" name="victimization" value="Sex Trafficking"/>Sex Trafficking
                        <br/>
                        <input type="checkbox" name="victimization" value="Child Sexual Abuse"/>Child Sexual Abuse
                        <br/>
                        <input type="checkbox" name="victimization" value="Drug Facilitated SV"/>Drug Facilitated SV
                        <br/>
                        <input type="checkbox" name="victimization" value="Stalking"/>Stalking
                        <br/>
                        <input type="checkbox" name="victimization" value="Sexual Harassment"/>Sexual Harassment
                        <br/>
                        <input type="checkbox" name="victimization" value="Domestic Violence"/>Domestic Violence
                        <br/>
                        <input type="checkbox" name="victimization" value="Other"/>Other: 
                        <input type="text" name="victimization"/>
                    </div>
                    <label for="perp-relationship">Perpetrator Relationship</label>
                    <div id="perp-relationship">
                        <input type="checkbox" name="perp-relationship" value="Acquaitance"/>Acquaitance
                        <br/>
                        <input type="checkbox" name="perp-relationship" value="Intimate Partner"/>Intimate Partner
                        <br/>
                        <input type="checkbox" name="perp-relationship" value="Family/Household Member"/>Family/Household Member
                        <br/>
                        <input type="checkbox" name="perp-relationship" value="Dating Relationship"/>Dating Relationship
                        <br/>
                        <input type="checkbox" name="perp-relationship" value="Stranger"/>Stranger
                        <br/>
                        <input type="checkbox" name="perp-relationship" value="Other"/>Other: 
                        <input type="text" name="perp-relationship"/>
                    </div>
                    <label for="perp-gender">Perpetrator Gender</label>
                    <br/>
                    <select id="perp-gender">
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Intersex">Intersex</option>
                        <option value="M→F">M→F</option>
                        <option value="F→M">F→M</option>
                        <option value="Questioning">Questioning</option>
                        <option value="Self Defined">Self Defined</option>
                    </select>
                    <hr/>
                    <label for="protection-asst">Protection Order Assistance</label>
                    <div id="protection-asst">
                        <div>
                            <label>
                                <input name="order-length" value="Temporary Order" type="radio"/>Temporary Order
                            </label>
                            <br/>
                            <label>
                                <input name="order-length" value="Final Order" type="radio"/>Final Order
                            </label>
                        </div>
                        <br/>
                        <div>
                            <label>
                                <input name="order-type" value="Adult: DV" type="radio"/>Adult: DV
                            </label>
                            <br/>
                            <label>
                                <input name="order-type" value="Adult: Stalking" type="radio"/>Adult: Stalking
                            </label>
                            <br/>
                            <label>
                                <input name="order-type" value="Adult: SV" type="radio"/>Adult: SV
                            </label>
                            <br/>
                            <label>
                                <input name="order-type" value="OBO Child: CSA" type="radio"/>OBO Child: CSA
                            </label>
                            <br/>
                            <label>
                                <input name="order-type" value="OBO Child: Other" type="radio"/>OBO Child: Other
                            </label>
                        </div>
                        <br/>
                        <div>
                            <label>
                                <input name="order-granted" value="Granted" type="radio"/>Granted
                            </label>
                            <br/>
                            <label>
                                <input name="order-granted" value="Denied" type="radio"/>Denied
                            </label>
                            <br/>
                            <label>
                                <input name="order-granted" value="Unknown" type="radio"/>Unknown
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <label for="partially-served">Partially Served</label>
                    <br/>
                    <label for="partially-served">A service user did not receive all the services requested because of:</label>
                    <div id="partially-served">
                        <input type="checkbox" name="partially-served" value="Hours of Operation"/>Hours of Operation
                        <br/>
                        <input type="checkbox" name="partially-served" value="Lack of Child Care"/>Lack of Child Care
                        <br/>
                        <input type="checkbox" name="partially-served" value="Program Reach Capacity"/>Program Reach Capacity
                        <br/>
                        <input type="checkbox" name="partially-served" value="Limited Resources/Priority Setting"/>Limited Resources/Priority Setting
                        <br/>
                        <input type="checkbox" name="partially-served" value="Safety/Security Risks (Perpetrator Generated)"/>Safety/Security Risks (Perpetrator Generated)
                        <br/>
                        <input type="checkbox" name="partially-served" value="Services Not Appropriate for Person"/>Services Not Appropriate for Person
                        <br/>
                        <input type="checkbox" name="partially-served" value="Transportation"/>Transportation
                    </div>
                    <hr/>
                    <label for="notes">Notes</label>
                    <br/>
                    <textarea id="notes"></textarea>
                    <hr/>
                    <h2>Ongoing Services</h2>
                    <label for="safe-to-call">Safe to call back?</label>
                    <div id="safe-to-call">
                        <label>
                            <input name="safe-to-call" value="Yes" type="radio"/>Yes
                        </label>
                        <br/>
                        <label>
                           <input name="safe-to-call" value="No" type="radio"/>No
                        </label>
                        <br/>
                        <label>
                           <input name="safe-to-call" value="Unknown" type="radio"/>Unknown
                        </label>
                    </div>
                    <br/>
                    <label for="safe-to-leave-message">Safe to leave a message?</label>
                    <div id="safe-to-leave-message">
                        <label>
                            <input name="safe-to-leave-message" value="Yes" type="radio"/>Yes
                        </label>
                        <br/>
                        <label>
                           <input name="safe-to-leave-message" value="No" type="radio"/>No
                        </label>
                        <br/>
                        <label>
                           <input name="safe-to-leave-message" value="Unknown" type="radio"/>Unknown
                        </label>
                    </div>
                    <br/>
                    <label for="first-time">First time caller?</label>
                    <div id="first-time">
                        <label>
                            <input name="first-time" value="Yes" type="radio"/>Yes
                        </label>
                        <br/>
                        <label>
                           <input name="first-time" value="No" type="radio"/>No
                        </label>
                        <br/>
                        <label>
                           <input name="first-time" value="Unknown" type="radio"/>Unknown
                        </label>
                    </div>
                    <br/>
                    <label for="contact">Contact</label>
                    <br/>
                    <label for="contact">(indicate the number of contacts through each method per day)</label>
                    <div id="contact">
                        <label>
                            <input type="number"/>Calls with Service User
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>In-person with Service User
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Web Chat
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>On Behalf of Service User
                        </label>
                    </div>
                    <br/>
                    <div id="time-call">Total time spent
                    <br/>
                    <input type="checkbox" name="time-call" value="Hours of Operation"/>15 min
                        <br/>
                        <input type="checkbox" name="time-call" value="Lack of Child Care"/>30 min
                        <br/>
                        <input type="checkbox" name="time-call" value="Program Reach Capacity"/>45 min
                        <br/>
                        <input type="checkbox" name="time-call" value="Limited Resources/Priority Setting"/>60 min
                        <br/>
                        <input type="checkbox" name="time-call" value="Other"/>Other (in hours): 
                        <input type="text" name="time-call"/>
                    </div>
                    <hr/>
                    <label>Services Provided</label>
                    <div id="contact">
                        <label>
                            <input type="number"/>Information and Referral
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Emotional Support
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Crisis Support
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Safety Planning
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Housing Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Economic Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Education Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Employment Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Health Care Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Immigration Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Other Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>SANE Exam Accompaniment
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Protection Order**
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Other Civil Legal Support
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Criminal Legal Support
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Language Services
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Health Care Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Immigration Advocacy
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Child Related Services
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Victims Comp Claim Assistance
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Safe home entered
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Safe home exited
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Transportation
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Medical Assistance
                            <input type="text"/>
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Groups
                            <input type="text"/>
                        </label>
                        <br/>
                        <label>
                            <input type="number"/>Partially Served**
                        </label>
                    </div>
                    <hr/>
                    <label for="referrals">Referrals</label>
                    <br/>
                    <label for="referrals">to/from</label>
                    <div id="referrals">
                        <input type="checkbox" name="referrals" value="to 211"/>
                        <input type="checkbox" name="referrals" value="from 211"/>211
                        <br/>
                        <input type="checkbox" name="referrals" value="to Campus Services"/>
                        <input type="checkbox" name="referrals" value="from Campus Services"/>Campus Services
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to CUSI/State's Attorney/CAC"/>
                        <input type="checkbox" name="referrals" value="from CUSI/State's Attorney/CAC"/>CUSI/State's Attorney/CAC
                        <br/>
                        <input type="checkbox" name="referrals" value="to DCF"/>
                        <input type="checkbox" name="referrals" value="from DCF"/>DCF
                        <br/>
                        <input type="checkbox" name="referrals" value="to Disability Org"/>
                        <input type="checkbox" name="referrals" value="from Disability Org"/>Disability Org
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to DIVAS/Corrections/P+P"/>
                        <input type="checkbox" name="referrals" value="from DIVAS/Corrections/P+P"/>DIVAS/Corrections/P+P
                        <br/>
                        <input type="checkbox" name="referrals" value="to DVAS"/>
                        <input type="checkbox" name="referrals" value="from DVAS"/>DVAS
                        <br/>
                        <input type="checkbox" name="referrals" value="to Financial Assistance Org"/>
                        <input type="checkbox" name="referrals" value="from Financial Assistance Org"/>Financial Assistance Org
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Financial Empowerment Programming"/>
                        <input type="checkbox" name="referrals" value="from Financial Empowerment Programming"/>Financial Empowerment Programming
                        <br/>
                        <input type="checkbox" name="referrals" value="to Health Centers"/>
                        <input type="checkbox" name="referrals" value="from Health Centers"/>Health Centers
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to HOPE Works Clinical Therapist"/>
                        <input type="checkbox" name="referrals" value="from HOPE Works Clinical Therapist"/>HOPE Works Clinical Therapist
                        <br/>
                        <input type="checkbox" name="referrals" value="to Housing Org"/>
                        <input type="checkbox" name="referrals" value="from Housing Org"/>Housing Org
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Immigrant Org"/>
                        <input type="checkbox" name="referrals" value="from Immigrant Org"/>Immigrant Org
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to LGBTQ Org"/>
                        <input type="checkbox" name="referrals" value="from LGBTQ Org"/>LGBTQ Org
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to National Guard/Military Services"/>
                        <input type="checkbox" name="referrals" value="from National Guard/Military Services"/>National Guard/Military Services
                        <br/>
                        <input type="checkbox" name="referrals" value="to Network Program"/>
                        <input type="checkbox" name="referrals" value="from Network Program"/>Network Program
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Police Department"/>
                        <input type="checkbox" name="referrals" value="from Police Department"/>Police Department
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Out of State Rape Crisis Services"/>
                        <input type="checkbox" name="referrals" value="from Out of State Rape Crisis Services"/>Out of State Rape Crisis Services
                        <br/>
                        <input type="checkbox" name="referrals" value="to RAINN"/>
                        <input type="checkbox" name="referrals" value="from RAINN"/>RAINN
                        <br/>
                        <input type="checkbox" name="referrals" value="to SANE"/>
                        <input type="checkbox" name="referrals" value="from SANE"/>SANE
                        <br/>
                        <input type="checkbox" name="referrals" value="to Support Group"/>
                        <input type="checkbox" name="referrals" value="from Support Group"/>Support Group
                        <br/>
                        <input type="checkbox" name="referrals" value="to Therapist List"/>
                        <input type="checkbox" name="referrals" value="from Therapist List"/>Therapist List
                        <br/>
                        <input type="checkbox" name="referrals" value="to Youth Org"/>
                        <input type="checkbox" name="referrals" value="from Youth Org"/>Youth Org
                        <input type="text" name="referrals"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Other"/>
                        <input type="checkbox" name="referrals" value="from Other"/>Other
                        <input type="text" name="referrals"/>
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