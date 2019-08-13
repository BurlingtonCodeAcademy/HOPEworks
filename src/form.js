import React from 'react';
import { Link } from "react-router-dom";

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            numIncidents: 1,
            numOrders: 1
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayIncidents = this.displayIncidents.bind(this);
        this.numIncidentsChange = this.numIncidentsChange.bind(this);
        this.numOrdersChange = this.numOrdersChange.bind(this);
        this.displayOrders = this.displayOrders.bind(this);
    }

    handleSubmit (evnt) {
        evnt.preventDefault();

        let firstName = document.getElementById('first-name');
        let lastName = document.getElementById('last-name')
        let identifiers = document.getElementById('identifiers');
        let advocateInitials = document.getElementById('advocate-initials');
        let contactDate = document.getElementById('contact-date');
        let cityTown = document.getElementById('city-town');
        let phone = document.getElementById('phone');
        let survivorGender = document.getElementById('survivor-gender');
        let dob = document.getElementById('dob')
        let numberChildren = document.getElementById('number-children');
        let nameOfSchool = document.getElementById("name-of-school");
        let referrer = document.getElementById("hear-about");
        let perpGender = document.getElementById("perp-gender");
        let contactCall = document.getElementById("contact-calls")
        let contactInPerson = document.getElementById("contact-in-person")
        let contactWebChat = document.getElementById("contact-web-chat")
        let contactOnBehalf = document.getElementById("contact-on-behalf")
        let servicesProvided = {
            
        }
        let notes = document.getElementById("notes")
        
        theData = {
            firstName: firstName.value,
            lastName: lastName.value,
            otherIdentifiers: identifiers.value,
            advocateInitials: advocateInitials.value,
            contactDate: contactDate.value,
            city: cityTown.value,
            phone: phone.value,
            survivorType: radioButtonValue("survivor-type"),
            survivorGender: survivorGender.value,
            dob: dob.value,
            ageRange: radioButtonValue("age-range"),
            language: radioButtonValue("language"),
            ethnicity: checkBoxValues("ethnicity"),
            numberChildren: numberChildren.value,
            disability: radioButtonValue("disability"),
            miscChars: checkBoxValues("characteristics"),
            nameOfSchool: nameOfSchool.value,
            referrer: referrer.value,
            victimization: checkBoxValues("victimization"),
            perpRelation: checkBoxValues("perp-relationship"),
            perpGender: perpGender.value,
            protectionOrder: {
                length: radioButtonValue("order-length"),
                type: radioButtonValue("order-type"),
                granted: radioButtonValue("order-granted")
            },
            partiallyServedReasons: checkBoxValues("partially-served"),
            safeToCall: radioButtonValue("safe-to-call"),
            safeToLeaveMessage: radioButtonValue("save-to-leave-message"),
            firstTime: radioButtonValue("first-time"),
            contactTypes: {
                calls: contactCall.value,
                inPerson: contactInPerson.value,
                webChat: contactWebChat.value,
                onBehalf: contactOnBehalf.value
            },
            timeSpent: radioButtonValue("time-call"),
            servicesProvided: {
                informationAndReferral: servicesProvided.informationAndReferral.value,
                emotionalSupport: servicesProvided.emotionalSupport.value,
                crisisSupport: servicesProvided.crisisSupport.value,
                safetyPlanning: servicesProvided.safetyPlanning.value,
                housingAdvocacy: servicesProvided.housingAdvocacy.value,
                economicAdvocacy: servicesProvided.economicAdvocacy.value,
                educationAdvocacy: servicesProvided.educationAdvocacy.value,
                employmentAdvocacy: servicesProvided.employmentAdvocacy.value,
                healthCareAdvocacy: servicesProvided.healthCareAdvocacy.value,
                immigrationAdvocacy: servicesProvided.immigrationAdvocacy.value,
                otherAdvocacy: servicesProvided.otherAdvocacy.value,
                saneExamAccompaniment: servicesProvided.saneExamAccompaniment.value,
                protectionOrder: servicesProvided.protectionOrder.value,
                otherCivilLegalSupport: servicesProvided.otherCivilLegalSupport.value,
                criminalLegalSupport: servicesProvided.criminalLegalSupport.value,
                languageServices: servicesProvided.languageServices.value,
                childRelatedServices: servicesProvided.childRelatedServices.value,
                victimsCompClaimAssistance: servicesProvided.victimsCompClaimAssistance.value,
                safeHomeEntered: servicesProvided.safeHomeEntered.value,
                safeHomeExited: servicesProvided.safeHomeExited.value,
                transportation: servicesProvided.transportation.value,
                medicalAssistance: [servicesProvided.medicalAssistance[0].value, servicesProvided.medicalAssistance[1].value],
                groups: [servicesProvided.groups[0].value, servicesProvided.groups[1].value],
                partiallyServed: servicesProvided.partiallyServed.value
            },
            referrals: referralValues("referrals"),
            outcomeMeasures: radioButtonValue("plan-for-safety"),
            communityResources: radioButtonValue("community-resources"),
            rightsAndOptions: radioButtonValue("rights-options"),
            notes: notes.value
        }
        console.log(theData);
    }

    numIncidentsChange (evnt) {
        this.setState({numIncidents: evnt.target.value})
    }

    displayIncidents (num) {
        let newNum = num;
        if (num > 10) {
            newNum = 0;
        }
        let i = 0;
        let listItems = [];
        while (i < newNum) {
            listItems.push(
                <div key={i}>
                    <label htmlFor="victimization">Victimization #{i + 1}</label>
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
                        <input type="text" name="victimization" className="inline-input"/>
                    </div>
                    <label htmlFor="perp-relationship">Perpetrator #{i+1} Relationship</label>
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
                        <input type="text" name="perp-relationship" className="inline-input"/>
                    </div>
                    <label htmlFor="perp-gender">Perpetrator #{i+1} Gender</label>
                    <br/>
                    <select id="perp-gender">
                        <option value="Unknown">Unknown</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Intersex">Intersex</option>
                        <option value="M→F">M→F</option>
                        <option value="F→M">F→M</option>
                        <option value="Questioning">Questioning</option>
                        <option value="Self Defined">Self Defined</option>
                    </select>
                    <br/>
                </div>)
            i++;
        }
        if (num > 10) {
            return (
                <h4>Sorry, {num} is too many victimizations!</h4>
            )
        } else {
            return (
                <div id="victimizations">{listItems}</div>
            )
        }
    }
      
    numOrdersChange (evnt) {
        this.setState({numOrders: evnt.target.value})
    }

    displayOrders (num) {
        let newNum = num;
        if (num > 10) {
            newNum = 0;
        }
        let i = 0;
        let listItems = [];
        while (i < newNum) {
            listItems.push(
                <div key={i}>
                    <label htmlFor="protection-asst">Protection Order Assistance #{i+1}</label>
                    <div id="protection-asst">
                        <div>
                            <input name="order-length" value="Temporary Order" type="radio"/>Temporary Order
                            <br/>
                            <input name="order-length" value="Final Order" type="radio"/>Final Order
                        </div>
                        <br/>
                        <div>
                            <input name="order-type" value="Adult: DV" type="radio"/>Adult: DV
                            <br/>
                            <input name="order-type" value="Adult: Stalking" type="radio"/>Adult: Stalking
                            <br/>
                            <input name="order-type" value="Adult: SV" type="radio"/>Adult: SV
                            <br/>
                            <input name="order-type" value="OBO Child: CSA" type="radio"/>OBO Child: CSA
                            <br/>
                            <input name="order-type" value="OBO Child: Other" type="radio"/>OBO Child: Other
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
                </div>
                )
            i++;
        }
        if (num > 10) {
            return (
                <h4>Sorry, {num} is too many orders!</h4>
            )
        } else {
            return (
                <div id="victimizations">{listItems}</div>
            )
        }
    }

    render() {
      return (
          <div id="form-page">
            <form id="the-form">
                <Link to={{ pathname: '/home' }}><button>back</button></Link>
                <div id="title">
                    <h1>H.O.P.E. Works</h1>
                    <h2>SURVIVOR INTAKE FORM</h2>
                    </div>
                <div id="all-fields">
                    <br/>
                  <div class="column-a">
                    <label htmlFor="first-name">Name of Service User </label>
                    <br/>
                    <input id="first-name" placeholder="First Name"></input>
                    <input id="last-name" placeholder="Last Name/Initial"></input>
                    <br/>
                    <label htmlFor="identifiers">Other identifiers for Service User </label>
                    <br/> 
                    <input id="identifiers" placeholder="Favorite color, etc."></input>
                    <br/>
                    <label htmlFor="advocate-initials">Advocate Initials </label>
                    <br/>
                    <input id="advocate-initials" placeholder="Initials" maxLength="2"></input>
                    <br/>
                  </div>
                    <label htmlFor="contact-date">Date of contact </label>
                    <br/>
                    <input type="date" id="contact-date"></input>
                    <br/>
                    <label htmlFor="city-town">City/Town </label>
                    <br/>
                    <input id="city-town" placeholder="City/Town"></input>
                    <br/>
                    <label htmlFor="phone">Phone Number </label>
                    <br/>
                    <input id="phone" type="tel" placeholder="802-123-4567"></input>
                    <br/>
                    <div id="survivor-type">
                        <input name="survivor-type" value="Primary Survivor" type="radio"/>Primary Survivor                       
                        <br/>                       
                        <input name="survivor-type" value="Secondary Survivor" type="radio"/>Secondary Survivor
                        
                    </div>
                    <hr/>
                    <label htmlFor="survivor-gender">Gender</label>
                    <br/>
                    <select id="survivor-gender">
                        <option value="Unknown">Unknown</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Intersex">Intersex</option>
                        <option value="M→F">M→F</option>
                        <option value="F→M">F→M</option>
                        <option value="Questioning">Questioning</option>
                        <option value="Self Defined">Self Defined</option>
                    </select>
                    <br/>
                    <label htmlFor="dob">Date of Birth</label>
                    <br/>
                    <input type="date" id="dob"></input>
                    <br/>
                    <label htmlFor="age-range-0">Approximate Age (range)</label>
                    <br/>
                    <input id="age-range-0" type="number"/>- <input id="age-range-1" type="number"/>
                    <br/>
                    <label htmlFor="language">Language</label>
                    <div id="language">
                        <input name="language" value="English" type="radio"/>English
                        <br/>
                        <input name="language" value="Limited English Proficiency" type="radio"/>Limited English Proficiency
                        <br/>
                        <input name="language" value="ASL" type="radio"/>ASL
                        <br/>
                        <input name="language" type="radio" value="Other"/>Other:
                        <input type="text" name="language" className="inline-input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                    </div>
                    <label htmlFor="ethnicity">Ethnicity</label>
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
                        <input type="text" name="ethnicity" className="inline-input"/>
                    </div>
                    <label htmlFor="number-children">Number of Children in Household</label>
                    <br/>
                    <input id="number-children" type="number" min="0" max="30"></input>
                    <br/>
                    <label htmlFor="disability">Disability (self-disclosed)</label>
                    <div id="disability">
                        <label>
                            <input name="disability" value="yes" type="radio"/>Yes
                        </label>
                        <br/>
                        <label>
                           <input name="disability" value="no" type="radio"/>No
                        </label>
                    </div>
                    <label htmlFor="characteristics">Misc. Characteristics</label>
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
                        <input type="checkbox" name="characteristics" value="College student/affiliated with a college"/>College student/affiliated with a college
                        <br/>
                        <label htmlFor="name-of-school">Name of school:</label>
                        <input id="name-of-school" type="text" name="characteristics" className="inline-input"/>
                        <br/>
                    </div>
                    <label htmlFor="hear-about">How did the service user hear about HOPE Works?</label>
                    <br/>
                    <input id="hear-about" placeholder="Name of referrer"></input>
                    <hr/>
                    <label htmlFor="victimization-count">Number of Incidents</label>
                    <br/>
                    <input id="victimization-count" type="number" onChange={this.numIncidentsChange}/>
                    {this.displayIncidents(this.state.numIncidents)}
                    <hr/>
                    <label htmlFor="order-count">Number of Protection Orders</label>
                    <br/>
                    <input id="order-count" type="number" onChange={this.numOrdersChange}/>
                    <br/>
                    {this.displayOrders(this.state.numOrders)}
                    <hr/>
                    <label htmlFor="partially-served">Partially Served</label>
                    <br/>
                    <label htmlFor="partially-served">A service user did not receive all the services requested because of:</label>
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
                    <h2>Ongoing Services</h2>
                    <label htmlFor="safe-to-call">Safe to call back?</label>
                    <div id="safe-to-call">
                        <input name="safe-to-call" value="Yes" type="radio"/>Yes
                        <br/>
                        <input name="safe-to-call" value="No" type="radio"/>No
                        <br/>
                        <input name="safe-to-call" value="Unknown" type="radio"/>Unknown
                    </div>
                    <br/>
                    <label htmlFor="safe-to-leave-message">Safe to leave a message?</label>
                    <div id="safe-to-leave-message">
                        <input name="safe-to-leave-message" value="Yes" type="radio"/>Yes
                        <br/>
                        <input name="safe-to-leave-message" value="No" type="radio"/>No
                        <br/>
                        <input name="safe-to-leave-message" value="Unknown" type="radio"/>Unknown
                    </div>
                    <br/>
                    <label htmlFor="first-time">First time caller?</label>
                    <div id="first-time">
                        <input name="first-time" value="Yes" type="radio"/>Yes
                        <br/>
                        <input name="first-time" value="No" type="radio"/>No
                        <br/>
                        <input name="first-time" value="Unknown" type="radio"/>Unknown
                    </div>
                    <br/>
                    <label htmlFor="contact">Contact</label>
                    <br/>
                    <label htmlFor="contact">(indicate the number of contacts through each method per day)</label>
                    <div id="contact">
                        <label>
                        <input id="contact-calls" type="number"/>Calls with Service User
                        </label>
                        <br/>
                        <label>
                        <input id="contact-in-person" type="number"/>In-person with Service User
                        </label>
                        <br/>
                        <label>
                        <input id="contact-web-chat" type="number"/>Web Chat
                        </label>
                        <br/>
                        <label>
                        <input id="contact-on-behalf" type="number"/>On Behalf of Service User
                        </label>
                    </div>
                    <br/>
                    <div id="time-call">Total time spent
                    <br/>
                    </div>
                    <div id="time-call">
                        <label>
                        <input name="time-call" value="15 min" type="radio"/>15 min
                        </label>
                        <br/>
                        <label>
                        <input name="time-call" value="30 min" type="radio"/>30 min
                        </label>
                        <br/>
                        <label>
                        <input name="time-call" value="45 min" type="radio"/>45 min
                        </label>
                        <br/>
                        <label>
                        <input name="time-call" value="60 min" type="radio"/>60 min
                        </label>
                        <br/>
                        <label>
                        <input name="time-call" type="radio" value="Other"/>Other (in hours):
                        <input type="number" name="time-call" className="inline-input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        </label>
                    </div>
                    <hr/>
                    <p>Services Provided</p>
                    <label htmlFor="advocacy">Advocacy</label>
                    <div id="advocacy">
                        <input type="checkbox" name="advocacy" value="Economic"/>Economic
                        <br/>
                        <input type="checkbox" name="advocacy" value="Financial"/>Financial
                        <br/>
                        <input type="checkbox" name="advocacy" value="Housing"/>Housing
                        <br/>
                        <input type="checkbox" name="advocacy" value="Education"/>Education
                        <br/>
                        <input type="checkbox" name="advocacy" value="Employment"/>Employment
                        <br/>
                        <input type="checkbox" name="advocacy" value="Immigration"/>Immigrantion
                        <br/>
                        <input type="checkbox" name="advocacy" value="Healthcare"/>Healthcare
                        <br/>
                        <input type="checkbox" name="advocacy" value="Other Civil Legal"/>Other Civil Legal:
                        <input type="text" name="advocacy" className="inline-input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <br/>
                        <br/>
                    </div>
                    <label htmlFor="support">Support</label>
                    <div id="support">
                        <input type="checkbox" name="support" value="Immigration"/>Emotional
                        <br/>                      
                        <input type="checkbox" name="support" value="Crisis"/>Crisis                       
                        <br/>                     
                        <input type="checkbox" name="support" value="Criminal Legal"/>Criminal Legal
                        <br/>
                        <input type="checkbox" name="support" value="Other"/>Other:
                        <input type="text" name="support" className="inline-input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <br/>
                        <br/>
                    </div>
                    <div>
                    <label htmlFor="Medical">Medical</label>
                    <div id="medical"></div>
                        <input type="checkbox" name="medical" value="SANE Exam Accompaniment"/>SANE Exam Accompaniment
                        <br/>
                        <br/> 
                    </div>
                    <label htmlFor="assistance-services">Assistance/Services</label>
                    <div id="assistance-services">
                        <input type="checkbox" name="assistance-services" value="Victims' Compensation Claim"/>Victims' Compensation Claim
                        <br/>
                        <input type="checkbox" name="assistance-services" value="Amount"/>Amount: $
                        <input type="number" name="assistance-services" className="inline-input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <br/>
                        <input type="checkbox" name="assistance-services" value="Language"/>Language
                        <br/>
                        <input type="checkbox" name="assistance-services" value="Transporation"/>Transporation
                        <br/>
                        <input type="checkbox" name="assistance-services" value="Material Assistance"/>Material Assistance
                        <br/>
                            <div id="material-assistance-div">
                             <input type="checkbox" name="assistance-services" value="Bus Pass"/>Bus Pass
                             <br/>
                             <input type="checkbox" name="assistance-services" value="Food Cart"/>Food Cart
                             <br/>
                             <input type="checkbox" name="assistance-services" value="Clothes"/>Clothes
                             <br/>
                             <input type="checkbox" name="assistance-services" value="Hygiene"/>Hygiene
                             <br/>
                             <input type="checkbox" name="assistance-services" value="Hotel"/>Hotel
                             <br/>
                             <input type="checkbox" name="assistance-services" value="other"/>Other
                             <br/>
                             <br/>
                            </div>
                    </div>
                    <label htmlFor="information-referral">Information Referral</label>
                    <div id="information-referral">
                        <input type="checkbox" name="information-referral" value="Information"/>Information
                        <br/>
                        <input type="checkbox" name="information-referral" value="Referral"/>Referral (please see below)
                        <br/>
                        <br/>
                    </div>
                    <label htmlFor="safe-home">Safe Home</label>
                    <div id="safe-home">
                        <input type="checkbox" name="safe-home" value="Date Entered"/>Date Entered 
                        <br/>
                        <input type="date" name="safe-home" className="input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <br/>
                        <input type="checkbox" name="safe-home" value="Date Exited"/>Date Exited
                        <br/>
                        <input type="date" name="safe-home" className="input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <br/>
                        <input type="checkbox" name="safe-home" value="Extension Date"/>Extention Date
                        <br/>
                        <input type="date" name="safe-home" className="input"/>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
                        <br/>
                        <br/>
                    </div>
                    <label htmlFor="groups">Groups</label>
                    <div id="groups">
                        <input type="checkbox" name="groups" value="Groups"/>Groups
                        <input type="text" name="groups" className="inline-input"/>
                        <br/>
                        <br/>   
                    </div>
                    
                    <hr/>
                    <label htmlFor="referrals">Referrals</label>
                    <br/>
                    <label htmlFor="referrals">to/from</label>
                    <div id="referrals">
                        <input type="checkbox" name="referrals" value="to 211"/>
                        <input type="checkbox" name="referrals" value="from 211"/>211
                        <br/>
                        <input type="checkbox" name="referrals" value="to Campus Services"/>
                        <input type="checkbox" name="referrals" value="from Campus Services"/>Campus Services
                        <input id="text-campus-services" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to CUSI/State's Attorney/CAC"/>
                        <input type="checkbox" name="referrals" value="from CUSI/State's Attorney/CAC"/>CUSI/State's Attorney/CAC
                        <br/>
                        <input type="checkbox" name="referrals" value="to DCF"/>
                        <input type="checkbox" name="referrals" value="from DCF"/>DCF
                        <br/>
                        <input type="checkbox" name="referrals" value="to Disability Org"/>
                        <input type="checkbox" name="referrals" value="from Disability Org"/>Disability Org
                        <input id="text-disability-org" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to DIVAS/Corrections/P+P"/>
                        <input type="checkbox" name="referrals" value="from DIVAS/Corrections/P+P"/>DIVAS/Corrections/P+P
                        <br/>
                        <input type="checkbox" name="referrals" value="to DVAS"/>
                        <input type="checkbox" name="referrals" value="from DVAS"/>DVAS
                        <br/>
                        <input type="checkbox" name="referrals" value="to Financial Assistance Org"/>
                        <input type="checkbox" name="referrals" value="from Financial Assistance Org"/>Financial Assistance Org
                        <input id="text-financial-assistance-org" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Financial Empowerment Programming"/>
                        <input type="checkbox" name="referrals" value="from Financial Empowerment Programming"/>Financial Empowerment Programming
                        <br/>
                        <input type="checkbox" name="referrals" value="to Health Centers"/>
                        <input type="checkbox" name="referrals" value="from Health Centers"/>Health Centers
                        <input id="text-health-centers" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to HOPE Works Clinical Therapist"/>
                        <input type="checkbox" name="referrals" value="from HOPE Works Clinical Therapist"/>HOPE Works Clinical Therapist
                        <br/>
                        <input type="checkbox" name="referrals" value="to Housing Org"/>
                        <input type="checkbox" name="referrals" value="from Housing Org"/>Housing Org
                        <input id="text-housing-org" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Immigrant Org"/>
                        <input type="checkbox" name="referrals" value="from Immigrant Org"/>Immigrant Org
                        <input id="text-immigrant-org" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to LGBTQ Org"/>
                        <input type="checkbox" name="referrals" value="from LGBTQ Org"/>LGBTQ Org
                        <input id="text-lgbtq-org" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to National Guard/Military Services"/>
                        <input type="checkbox" name="referrals" value="from National Guard/Military Services"/>National Guard/Military Services
                        <br/>
                        <input type="checkbox" name="referrals" value="to Network Program"/>
                        <input type="checkbox" name="referrals" value="from Network Program"/>Network Program
                        <input id="text-network-program" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Police Department"/>
                        <input type="checkbox" name="referrals" value="from Police Department"/>Police Department
                        <input id="text-police-department" type="text" name="referrals" className="inline-input"/>
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
                        <input id="text-youth-org" type="text" name="referrals" className="inline-input"/>
                        <br/>
                        <input type="checkbox" name="referrals" value="to Other"/>
                        <input type="checkbox" name="referrals" value="from Other"/>Other
                        <input id="text-other" type="text" name="referrals" className="inline-input"/>
                        <br/>
                    </div>
                    <hr/>
                    <label htmlFor="measures">Outcome Measures:</label>
                    <div id="measures">
                        <label htmlFor="plan-for-safety">Service User knows more ways to plan for their safety</label>
                        <div id="plan-for-safety">
                            <label>
                                <input name="plan-for-safety" value="Yes" type="radio"/>Yes
                            </label>
                            <br/>
                            <label>
                            <input name="plan-for-safety" value="No" type="radio"/>No
                            </label>
                            <br/>
                            <label>
                            <input name="plan-for-safety" value="N/A" type="radio"/>N/A
                            </label>
                        </div>
                        <br/>
                        <label htmlFor="community-resources">Service User knows more about community resources</label>
                        <div id="community-resources">
                            <label>
                                <input name="community-resources" value="Yes" type="radio"/>Yes
                            </label>
                            <br/>
                            <label>
                            <input name="community-resources" value="No" type="radio"/>No
                            </label>
                            <br/>
                            <label>
                            <input name="community-resources" value="N/A" type="radio"/>N/A
                            </label>
                        </div>
                        <br/>
                        <label htmlFor="rights-options">Service User knows more about their rights and options</label>
                        <div id="rights-options">
                            <label>
                                <input name="rights-options" value="Yes" type="radio"/>Yes
                            </label>
                            <br/>
                            <label>
                            <input name="rights-options" value="No" type="radio"/>No
                            </label>
                            <br/>
                            <label>
                            <input name="rights-options" value="N/A" type="radio"/>N/A
                            </label>
                        </div>
                        <hr/>
                        <label htmlFor="notes">Notes</label>
                        <br/>
                        <textarea id="notes"></textarea>
                    </div>
                </div>
                <button onClick={this.handleSubmit}>submit</button>
            </form>
          </div>
      )
    }  
}

let theData = {
    firstName: "",
    lastName: "",
    otherIdentifiers: "",
    advocateInitials: "",
    contactDate: "",
    city: "",
    phone: "",
    survivorType: "",
    survivorGender: "",
    dob: "",
    ageRange: "",
    language: "",
    ethnicity: "",
    numberChildren: 0,
    disability: "",
    miscChars: [],
    nameOfSchool: "",
    referrer: "",
    victimization: [],
    perpRelation: [],
    perpGender: "",
    protectionOrder: {
        length: "",
        type: "",
        granted: ""
    },
    partiallyServedReasons: [],
    safeToCall: "",
    safeToLeaveMessage: "",
    firstTime: "",
    contactTypes: {
        calls: 0,
        inPerson: 0,
        webChat: 0,
        onBehalf: 0
    },
    timeSpent: "",
    servicesProvided: {
        informationAndReferral: 0,
        emotionalSupport: 0,
        crisisSupport: 0,
        safetyPlanning: 0,
        housingAdvocacy: 0,
        economicAdvocacy: 0,
        educationAdvocacy: 0,
        employmentAdvocacy: 0,
        healthCareAdvocacy: 0,
        immigrationAdvocacy: 0,
        otherAdvocacy: 0,
        saneExamAccompaniment: 0,
        protectionOrder: 0,
        otherCivilLegalSupport: 0,
        criminalLegalSupport: 0,
        languageServices: 0,
        childRelatedServices: 0,
        victimsCompClaimAssistance: 0,
        safeHomeEntered: 0,
        safeHomeExited: 0,
        transportation: 0,
        medicalAssistance: [0, ""],
        groups: [0, ""],
        partiallyServed: 0
    },
    referrals: {
        "211": {
            to: false,
            from: false
        },
        "Campus Services": {
            to: false,
            from: false,
            name: ""
        },
        "CUSI/State's Attorney/CAC": {
            to: false,
            from: false
        },
        "DCF": {
            to: false,
            from: false
        },
        "Disability Org": {
            to: false,
            from: false,
            name: ""
        },
        "DIVAS/Corrections/P+P": {
            to: false,
            from: false
        },
        "DVAS": {
            to: false,
            from: false
        },
        "Financial Assistance Org": {
            to: false,
            from: false,
            name: ""
        },
        "Financial Empowerment Programming": {
            to: false,
            from: false
        },
        "Health Centers": {
            to: false,
            from: false,
            name: ""
        },
        "HOPE Works Clinical Therapist": {
            to: false,
            from: false
        },
        "Housing Org": {
            to: false,
            from: false,
            name: ""
        },
        "Immigrant Org": {
            to: false,
            from: false,
            name: ""
        },
        "LGBTQ Org": {
            to: false,
            from: false
        },
        "National Guard/Military Services": {
            to: false,
            from: false,
        },
        "Network Program": {
            to: false,
            from: false,
            name: ""
        },
        "Police Department": {
            to: false,
            from: false,
            name: ""
        },
        "Out of State Rape Crisis Services": {
            to: false,
            from: false
        },
        "RAINN": {
            to: false,
            from: false
        },
        "SANE": {
            to: false,
            from: false
        },
        "Support Group": {
            to: false,
            from: false
        },
        "Therapist List": {
            to: false,
            from: false
        },
        "Youth Org": {
            to: false,
            from: false,
            name: ""
        },
        "Other": {
            to: false,
            from: false,
            name: ""
        }
    },
    outcomeMeasures: "",
    communityResources: "",
    rightsAndOptions: "",
    notes: ""
}

function radioButtonValue (name) {
    let theButtons = document.getElementsByName(name);
    for (let i = 0; i < theButtons.length; i++) {
        if (theButtons[i].checked) {
            if (theButtons[i].value==="Other") {
                return "Other: " + theButtons[i + 1].value
            } else if (theButtons[i].type==="text") {
                return
            } else {
                return theButtons[i].value
            }
        }
    }
}

function checkBoxValues (name) {
    let theBoxes = document.getElementsByName(name);
    let checkedBoxes = [];
    for (let i = 0; i < theBoxes.length; i++) {
        if (theBoxes[i].checked) {
            if (theBoxes[i].value==="Other") {
                checkedBoxes.push("Other: " + theBoxes[i + 1].value)
            } else if (theBoxes[i].type!=="text") {
                checkedBoxes.push(theBoxes[i].value)
            }
        }
    }
    return checkedBoxes;
}

function referralValues (name) {
    let theInputs = document.getElementsByName(name);
    let finalValues = [];
    for (let i = 0; i < theInputs.length; i++) {
        if (theInputs[i].checked) {
            if (theInputs[i + 1].type==="text") {
                finalValues.push(theInputs[i].value + ": " + theInputs[i + 1].value)
            } else if (theInputs[i + 2].type==="text") {
                finalValues.push(theInputs[i].value + ": " + theInputs[i + 2].value)
            } else if (theInputs[i].type!=="text") {
                finalValues.push(theInputs[i].value)
            }
        }
    }
    return finalValues;
}

export default Form;