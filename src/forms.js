import React from 'react';
import Hw from './images/hw.png';

class Forms extends React.Component {
    constructor() {
        super();
        this.state = {
            allForms: null,
            selectedForms: null,
            view: "list",
            currentForm: null,
            victimizationDropped: false,
            ethnicityDropped: false,
            homelessDropped: false,
            selectedVictimizations: [],
            selectedEthnicities: [],
            selectedHomeless: [],
            selectionChanging: false,
            selectedDates: null
        }
        this.viewForm = this.viewForm.bind(this);
        this.viewList = this.viewList.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.orderForms = this.orderForms.bind(this);
        this.displayFormElement = this.displayFormElement.bind(this);
        this.victimizationDroppedChange = this.victimizationDroppedChange.bind(this);
        this.victimizationCheckedChange = this.victimizationCheckedChange.bind(this);
        this.ethnicityDroppedChange = this.ethnicityDroppedChange.bind(this);
        this.ethnicityCheckedChange = this.ethnicityCheckedChange.bind(this);
        this.selectedDateChange = this.selectedDateChange.bind(this);
        this.homelessCheckedChange = this.homelessCheckedChange.bind(this);
        this.homelessDroppedChange = this.homelessDroppedChange.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/forms");
        const formsObj = await response.json();
        this.setState({allForms: formsObj, selectedForms: formsObj})
    }

    showFormCount(forms) {
        if (!forms) {
            return null;
        } else {
            return <p>Form count: {forms.length}</p>
        }
    }

    viewForm (event) {
        let buttonIdNum = event.target.id.slice(-1);
        this.setState({ view: "form", currentForm: buttonIdNum })
    }

    viewList () {
        this.setState({ view: "list", currentForm: null })
    }

    listTheForms (forms) {
        if (forms && forms.length!==0) {
            let i = 0;
            let allOrderedForms = this.orderForms(forms)
            let listItems = [];
            let formType;
            allOrderedForms.forEach((form) => {
                if (form.data.newUser) {
                    formType = "Intake"
                } else {
                    formType = "Ongoing"
                }
                listItems.push(
                    <div key={i}>
                        <div className="view-form-bar">
                            <div className="form-bar-buttons">
                                <button className="view-form-button" id={"view-form-button-" + i} onClick={this.viewForm}>view</button>
                                <button className="delete-form-button" id={"delete-button-" + i} onClick={this.showDialog}>delete</button>
                                <dialog id={"delete-dialog-" + i}>
                                <form method="dialog">
                                <div>
                                    <h4>Are you sure you want to delete this form????</h4>
                                    <p>{new Date(form.when).toLocaleString()}: {form.data.firstName} {form.data.lastName} ({formType})</p>
                                </div>
                                <menu>
                                    <button value="cancel">Cancel</button>
                                    <button id={"confirmBtn-" + i} value="default" onClick={this.deleteForm}>DELETE</button>
                                </menu>
                                </form>
                                </dialog>
                            </div>
                            <div className="form-bar-text">
                                {reFormatDate(form.data.contactDate)}: {form.data.firstName} {form.data.lastName} ({formType})
                            </div>
                        </div>
                    </div>
                    )
                i++;
            })
            return (
                <div id="forms">{listItems}</div>
            );
        } else if (forms && forms.length===0) {
            return <p>No forms match the given criteria.</p>
        } else {
            return <p>getting the forms...</p>
        }
        
    }
      
    orderForms(forms) {
        forms.sort(function(a, b){return Date.parse(b.data.contactDate) - Date.parse(a.data.contactDate)})
        return forms;
    }

    displayForm (formNum) {
        let allOrderedForms = this.orderForms(this.state.selectedForms)
        let theForm = allOrderedForms[formNum].data;

        let i = 0;
        let listItems = [];

        let ageDisplayType = null;                 // if we know the DOB, we can display an exact current age and exact age at time of contact.
        if (theForm.dateOfBirth!=="") {
            ageDisplayType = "dob"
        } else if (theForm.ageRange[0]!=="") { //if we only have an age range, we will have to approximate current age.
            ageDisplayType = "range"
        }

        for (let property in theForm) {                                                             //consider refactor for outcome measures section
            if (property==="dateOfBirth" || property==="ageRange") {
                if (property==="dateOfBirth") { //once we encounter the DOB property, we handle all of our cases. we don't want to handle them again when we hit the ageRange prop.
                    let currentDate = getCurrentDate();
                    let contactDate = null;
                    if (theForm.contactDate!=="") {
                        contactDate = theForm.contactDate.split("-");
                        contactDate = contactDate.map((string) => Number(string))
                        contactDate.push(contactDate[0])
                        contactDate = contactDate.slice(1, 4)
                    }

                    if (ageDisplayType==="dob") {
                        let ageAtContact;
                        let currentAge;
                        let birthDate;

                        birthDate = theForm.dateOfBirth.split("-");
                        birthDate = birthDate.map((string) => Number(string))
                        birthDate.push(birthDate[0])
                        birthDate = birthDate.slice(1, 4)

                        ageAtContact = contactDate[2] - birthDate[2]
                        if (contactDate[0] - birthDate[0] < 0) { //months
                            ageAtContact--
                        } else if ((contactDate[0] - birthDate[0] === 0) && (contactDate[1] - birthDate[1] < 0)) { //same month, not up to the day yet
                            ageAtContact--
                        }

                        currentAge = currentDate[2] - birthDate[2]
                        if (currentDate[0] - birthDate[0] < 0) {
                            currentAge--
                        } else if ((currentDate[0] - birthDate[0] === 0) && (currentDate[1] - birthDate[1] < 0)) {
                            currentAge--
                        }

                        listItems.push(
                            <div key={i}>
                                <div className="form-element">{this.displayFormElement(property, reFormatDate(theForm.dateOfBirth), null, "normal")}</div> {/* please add this change*/ }
                            </div>
                            )
                        i++;
                        listItems.push(
                            <div key={i}>
                                <div className="form-element">{this.displayFormElement("Age at time of contact", ageAtContact.toString(), null, "normal")}</div>
                            </div>
                            )
                        i++;
                        listItems.push(
                            <div key={i}>
                                <div className="form-element">{this.displayFormElement("Current age", currentAge.toString(), null, "normal")}</div>
                            </div>
                            )
                        i++;
                    } else if (ageDisplayType==="range") {
                        let approxAgeAtContact = Math.floor(((Number(theForm.ageRange[0]) + Number(theForm.ageRange[1]))/2))
                        let approxBirthDate = [contactDate[0], contactDate[1], contactDate[2] - approxAgeAtContact]
                        let approxCurrentAge = currentDate[2] - approxBirthDate[2]

                        if (currentDate[0] - approxBirthDate[0] < 0) {
                            approxCurrentAge--
                        } else if ((currentDate[0] - approxBirthDate[0] === 0) && (currentDate[1] - approxBirthDate[1] < 0)) {
                            approxCurrentAge--
                        }

                        listItems.push(
                            <div key={i}>
                                <div className="form-element">{this.displayFormElement("Age Range", theForm.ageRange[0] + "-" + theForm.ageRange[1], null, "normal")}</div>
                            </div>
                            )
                        i++;
                        listItems.push(
                            <div key={i}>
                                <div className="form-element">{this.displayFormElement("Approximate current age", approxCurrentAge.toString(), null, "normal")}</div>
                            </div>
                            )
                        i++;
                        listItems.push(
                            <div key={i}>
                                <div className="form-element">{this.displayFormElement("Approximate Date of Birth", approxBirthDate[0] + "/" + approxBirthDate[1] + "/" + approxBirthDate[2], null, "normal")}</div> {/* please add this change*/ }
                            </div>
                            )
                        i++;
                    }
                }
            } else if (property==="contactDate") {
                listItems.push(
                    <div key={i}>
                        <div className="form-element">{this.displayFormElement(property, reFormatDate(theForm[property]), null, "normal")}</div>
                    </div>
                    )
                i++;
            } else if (isValueNonEmpty(theForm[property])) {
                //(the value is a non-empty string or array OR the value is a non-empty boolean OR the value is a non-empty services provided object)
                listItems.push(
                    <div key={i}>
                        <div className="form-element">{this.displayFormElement(property, theForm[property], null, "normal")}</div>
                    </div>
                    )
                i++;
            }
        }
        return (
            <div id="form-info">{listItems}</div>
        );
    }

    displayFormElement (property, value, key, indent) {
        let formattedProperty = null;
        let theKey = 0;
        if (property) {
            formattedProperty = camelCaseToCapitalized(property) + ": "
        }
        if (key) {
            theKey = key;
        }

        if (typeof(value)==='string' || typeof(value)==="boolean" || !value) { //input is a string (or boolean)
            return (
                <div key={theKey} className={indent}>
                    <label><strong>{formattedProperty}</strong>{value.toString()}</label>
                </div>
            )   
        } else if (value.length && value[0] && typeof(value[0])==="string") { //input is an array of strings
            return (
                <div key={theKey} className={indent}>
                    <label><strong>{formattedProperty}</strong>{value.join(", ")}</label>
                </div>
            )
        } else if (value[0] && typeof(value[0])==="object") { //input is an array of objects/arrays
            let returnArray = [];
            let newKey = 0;
            value.forEach((object) => {
                returnArray.push(this.displayFormElement(null, object, newKey, "indented"))
                newKey++;
            })
            return (
                <div key={theKey}>
                    <label><strong>{formattedProperty}</strong>{returnArray}</label>
                </div>
            )
        } else if (!value[0] && typeof(value)==="object") { //input is an object
            let returnArray = [];
            let newKey = 0;
            for (let innerProperty in value) {
                if (value[innerProperty][0]) { //make sure that the field isn't empty
                    returnArray.push(this.displayFormElement(innerProperty, value[innerProperty], newKey, "indented"))
                    newKey++
                }
            }
            return (
                <div key={theKey} className="form-element">
                    <label>
                        <strong>{formattedProperty}</strong>
                        <div className="form-element">
                            {returnArray}
                        </div>
                    </label>
                </div>
            )
        }
    }

    showDialog(event) {
        let buttonIdNum = event.target.id.slice(-1);
        let deleteDialog = document.getElementById("delete-dialog-" + buttonIdNum);
        deleteDialog.showModal();
    }

    async deleteForm (event) {
        let buttonIdNum = event.target.id.slice(-1);
        let allOrderedForms = this.orderForms(this.state.selectedForms)
        let theFormId = allOrderedForms[buttonIdNum]._id;
        await fetch("/delete/" + theFormId)
        window.location.replace("/forms")
    }

    dateSelector() {
        return (
            <div className="selector">
                <label>
                    From: <input type="date" className="date-selector" id="from-date" onChange={this.selectedDateChange}/>
                </label>
                <label>
                    to: <input type="date" className="date-selector" id="to-date" onChange={this.selectedDateChange}/>   
                </label>
            </div>
        )
    }

    selectedDateChange() {
        let theDates = document.getElementsByClassName("date-selector")
        let dateObject = {};
        for (let i = 0; i < 2; i++) {
            if (theDates[i].value.length===10 && theDates[i].id==="from-date") {
                dateObject.from = theDates[i].value;
            } else if (theDates[i].value.length!==10 && theDates[i].id==="from-date") {
                dateObject.from = null;
            } else if (theDates[i].value.length===10 && theDates[i].id==="to-date") {
                dateObject.to = theDates[i].value;
            } else if (theDates[i].value.length!==10 && theDates[i].id==="to-date") {
                dateObject.to = null;
            }
        }
        
        if (dateObject.to || dateObject.from) {
            this.setState( {selectedDates: dateObject, selectionChanging: true} )
        } else {
            this.setState( {selectedDates: null, selectionChanging: true} )
        }

    }

    victimizationSelector(status) {
        if (!status) {
            return (
                <div className="selector">
                    <label onClick={this.victimizationDroppedChange}>Victimization ↓</label>
                </div>
            )
        } else {
            let i = 0;
            let victimizationTypes = [
                "Rape",
                "Attempted Rape",
                "Sex Trafficking",
                "Child Sexual Abuse",
                "Drug Facilitated SV",
                "Stalking",
                "Sexual Harassment",
                "Domestic Violence",
                "Other"
            ]
            let listItems = [];
            victimizationTypes.forEach((victimization) => {
                if (this.state.selectedVictimizations.includes(victimization)) {
                    listItems.push(
                        <label key={i}>
                            <input type="checkbox" name="victimization" value={victimizationTypes[i]} onChange={this.victimizationCheckedChange} defaultChecked/>{victimizationTypes[i]}
                        </label>
                    )
                } else {
                    listItems.push(
                        <label key={i}>
                            <input type="checkbox" name="victimization" value={victimizationTypes[i]} onChange={this.victimizationCheckedChange}/>{victimizationTypes[i]}
                        </label>
                    )
                }
                i++;
            })
            return (
                <div className="selector">
                    <label onClick={this.victimizationDroppedChange}>Victimization ↑</label>
                    <div className="selector-checkboxes">
                       {listItems}
                    </div>
                </div>
            );
        }
    }

    victimizationCheckedChange() {
        let theBoxes = document.getElementsByName("victimization")
        let checkedBoxes = [];
        for (let i = 0; i < theBoxes.length; i++) {
            if (theBoxes[i].checked) {
                checkedBoxes.push(theBoxes[i].value);
            }
        }
        this.setState( {selectedVictimizations: checkedBoxes, selectionChanging: true} )
    }

    victimizationDroppedChange(evnt) {
        this.setState( {victimizationDropped: !this.state.victimizationDropped} )
    }

    ethnicityDroppedChange(evnt) {
        this.setState( {ethnicityDropped: !this.state.ethnicityDropped} )
    }

    ethnicitySelector(status) {
        if (!status) {
            return (
                <div className="selector">
                    <label onClick={this.ethnicityDroppedChange}>Ethnicity ↓</label>
                </div>
            )
        } else {
            let i = 0;
            let ethnicities = [
                "Asian",
                "Black/African American",
                "Hispanic/Latino",
                "Native American/Alaskan",
                "Native Hawaiian/Pacific Islander",
                "White/Caucasian",
                "Unknown",
                "Other"
            ]
            let listItems = [];
            ethnicities.forEach((ethnicity) => {
                if (this.state.selectedEthnicities.includes(ethnicity)) {
                    listItems.push(
                        <label key={i}>
                            <input type="checkbox" name="ethnicity" value={ethnicities[i]} onChange={this.ethnicityCheckedChange} defaultChecked/>{ethnicities[i]}
                        </label>
                    )
                } else {
                    listItems.push(
                        <label key={i}>
                            <input type="checkbox" name="ethnicity" value={ethnicities[i]} onChange={this.ethnicityCheckedChange}/>{ethnicities[i]}
                        </label>
                    )
                }
                i++;
            })
            return (
                <div className="selector">
                    <label onClick={this.ethnicityDroppedChange}>Ethnicity ↑</label>
                    <div className="selector-checkboxes">
                       {listItems}
                    </div>
                </div>
            );
        }
    }

    ethnicityCheckedChange() {
        let theBoxes = document.getElementsByName("ethnicity")
        let checkedBoxes = [];
        for (let i = 0; i < theBoxes.length; i++) {
            if (theBoxes[i].checked) {
                checkedBoxes.push(theBoxes[i].value);
            }
        }
        this.setState( {selectedEthnicities: checkedBoxes, selectionChanging: true} )
    }

    homelessDroppedChange(evnt) {
        this.setState( {homelessDropped: !this.state.homelessDropped} )
    }

    homelessSelector(status) {
        if (!status) {
            return (
                <div className="selector">
                    <label onClick={this.homelessDroppedChange}>Homelessness ↓</label>
                </div>
            )
        } else {
            let i = 0;
            let homelessTypes = [
                "Homeless",
                "Non-Homeless"
            ]
            let listItems = [];
            homelessTypes.forEach((type) => {
                if (this.state.selectedHomeless.includes(type)) {
                    listItems.push(
                        <label key={i}>
                            <input type="checkbox" name="homelessness" value={type} onChange={this.homelessCheckedChange} defaultChecked/>{type}
                        </label>
                    )
                } else {
                    listItems.push(
                        <label key={i}>
                            <input type="checkbox" name="homelessness" value={type} onChange={this.homelessCheckedChange}/>{type}
                        </label>
                    )
                }
                i++;
            })
            return (
                <div className="selector">
                    <label onClick={this.homelessDroppedChange}>Homelessness ↑</label>
                    <div className="selector-checkboxes">
                       {listItems}
                    </div>
                </div>
            );
        }
    }

    homelessCheckedChange() {
        let theBoxes = document.getElementsByName("homelessness")
        let checkedBoxes = []
        for (let i = 0; i < theBoxes.length; i++) {
            if (theBoxes[i].checked) {
                checkedBoxes.push(theBoxes[i].value);
            }
        }
        this.setState( {selectedHomeless: checkedBoxes, selectionChanging: true} )
    }

    componentDidUpdate () {
        if (this.state.selectedVictimizations.length===0 && 
            this.state.selectedEthnicities.length===0 &&
            !this.state.selectedDates &&
            this.state.selectedHomeless.length===0 &&
            this.state.selectedForms.length!==this.state.allForms.length) { // when nothing is select .. && this.state.selectedEthnicities.length===0
            this.setState( {selectedForms: this.state.allForms} ) //list all forms
        } else if (this.state.selectionChanging) { //selected stuff !== selectedforms
            let victFilterOutput = []
            this.state.allForms.forEach((form) => { //we are going to check each form for a victimization that matches one of the selected victimizations
                if (this.state.selectedVictimizations.length===0) {
                    victFilterOutput = this.state.allForms
                    return
                }
                let matchFound = false
                if (form.data.incidents) {          //  if the form even has any incidents
                    let theIncidents = form.data.incidents;
                    theIncidents.forEach((incident) => {  //incidents are in an array, we have to check each incident
                        incident.victimization.forEach((victimization) => { //now we have to check each victimization type ("Rape", "Attempted Rape"....)
                            if (this.state.selectedVictimizations.includes(victimization)) {
                                matchFound = true;
                                return
                            }
                        })
                        if (matchFound) return
                    })
                }
                if (matchFound) victFilterOutput.push(form)
            })
            let ethnFilterOutput = []
            victFilterOutput.forEach((form) => {
                if (this.state.selectedEthnicities.length===0) {
                    ethnFilterOutput = victFilterOutput;
                    return
                }
                let matchFound = false;
                if (form.data.ethnicity) { 
                    form.data.ethnicity.forEach((ethnicity) => {
                        if (this.state.selectedEthnicities.includes(ethnicity)) {
                            matchFound = true;
                            return
                        }
                    })
                }
                if (matchFound) ethnFilterOutput.push(form)
            })
            let dateFilterOutput = [];
            ethnFilterOutput.forEach((form) => {
                if (!this.state.selectedDates) {
                    dateFilterOutput = ethnFilterOutput;
                    return
                } else {
                    if (dateWithinRange(form.data.contactDate, this.state.selectedDates.from, this.state.selectedDates.to)) dateFilterOutput.push(form)
                }
            })
            let homelessFilterOutput = [];
            dateFilterOutput.forEach((form) => {
                if (this.state.selectedHomeless.length===0) {
                    homelessFilterOutput = dateFilterOutput;
                    return
                }
                if (form.data.miscellaneousCharacteristics) {
                    if (this.state.selectedHomeless.includes("Homeless") && form.data.miscellaneousCharacteristics.includes("Homeless")) {
                        homelessFilterOutput.push(form)
                    } else if (this.state.selectedHomeless.includes("Non-Homeless") && !form.data.miscellaneousCharacteristics.includes("Homeless")) {
                        homelessFilterOutput.push(form)
                    } 
                }
            })
            
            this.setState( {selectedForms: homelessFilterOutput, selectionChanging: false} )
        }
    }

    render() {
        if (this.state.view==="list") {
            return (
             <div id="forms-page">
                <img className="hw-logo-forms" src={Hw} alt="Hope Works"/>
                <h1 id="submitted-forms">Submitted Forms</h1>
                {this.showFormCount(this.state.selectedForms)}
                <div id="forms-selectors">
                    <div id="forms-container">
                        {this.listTheForms(this.state.selectedForms)}
                    </div>
                    <div id="selectors">
                        {this.dateSelector()}
                        {this.victimizationSelector(this.state.victimizationDropped)}
                        {this.ethnicitySelector(this.state.ethnicityDropped)}
                        {this.homelessSelector(this.state.homelessDropped)}
                    </div>
                </div>
            </div>
            )
        } else if (this.state.view==="form") {
            return (
             <div id="forms-page">
                <div id="forms-container">
                    <div style={{height: "1px"}}></div>
                    <h1 id="survivor-info-text">Survivor Information</h1>
                    <button onClick={this.viewList}>back to form list</button>
                    {this.displayForm(this.state.currentForm)}
                    <button onClick={this.viewList}>back to form list</button>
                </div>
             </div>  
            )
        }
    }  
}

//-------------------------HELPER FUNCTIONS-------------------------------//

function camelCaseToCapitalized (string) {
    if (typeof(string)!=="string") {
        console.log("camelCaseToCapitalized recieved a non string input")
    }
    let stringArray = string.split('')
    let i = 0;
    while (i < stringArray.length) {
        if (stringArray[i]!==stringArray[i].toLowerCase()) {
            stringArray[i] = stringArray[i].toLowerCase();
            stringArray.splice(i, 0, " ")
        }
        i++;
    }
    for (let i = 0; i < stringArray.length; i++) {
        if (i===0) {
            stringArray[i] = stringArray[i].toUpperCase()
        }
        if (stringArray[i]===" ") {
            stringArray[i + 1] = stringArray[i + 1].toUpperCase()
        }
    }
    let capitalizedString = stringArray.join('')
    let capitalizedArray = capitalizedString.split(' ')
    for (let i = 0; i < capitalizedArray.length; i++) {
        if (capitalizedArray[i]==="Of" ||
        capitalizedArray[i]==="And" ||
        capitalizedArray[i]==="At" ||
        capitalizedArray[i]==="The" ||
        capitalizedArray[i]==="Or" ||
        capitalizedArray[i]==="For") {
            capitalizedArray[i] = capitalizedArray[i].toLowerCase()
        }
        
    }
    return capitalizedArray.join(" ")
}

function isValueNonEmpty (value) {
    if (typeof(value)==="boolean") {
        return true
    } else if (!value) {
        return false
    } else if (typeof(value)==='string' && value!=="") { //input is a string (or boolean)
        return true
    } else if (value.constructor.toString().slice(9, 14)==="Array") { //input is an array
        for (let innerValue of value) {
            if (isValueNonEmpty(innerValue)) {
                return true
            }
        }
        return false
    } else if (value.constructor.toString().slice(9, 15)==="Object") { //input is a(n) (non array) object
        for (let property in value) {
            if (isValueNonEmpty(value[property])) {
                return true
            }
        }
        return false
    } else {
        console.log("isValueNonEmpty found a weird value: ")
        console.log(value)
        return false
    }
}

function getCurrentDate () {
    let theTime = new Date().toLocaleString()
    let monthDayYear = theTime.split("/")
    monthDayYear[2] = monthDayYear[2].slice(0, 4)
    let monthDayYearNums = monthDayYear.map((string) => Number(string))
    return monthDayYearNums;
}

function reFormatDate (date) { //input date as YYYY-MM-DD output as MM/DD/YYYY
    if (typeof(date)!=="string") {
        console.log("please input a string")
    }
    let yearMonthDay = date.split("-")
    yearMonthDay.push(yearMonthDay[0])
    let monthDayYear = yearMonthDay.slice(1, 4)
    return monthDayYear.join("/")
}

function dateWithinRange (input, min, max) {
    function quantifyDate (dateString) {
        if (!dateString) return null
        let dateStringArray = dateString.split("-") //["1950", "01", "31"]
        return Number(dateStringArray[0] + "." + dateStringArray[1] + dateStringArray[2]) // Number(     "1950.0131"       )
    }
    let inputNum = quantifyDate(input);
    let minNum = quantifyDate(min);
    let maxNum = quantifyDate(max);
    
    if (minNum && maxNum) {
        if (minNum <= inputNum && inputNum <= maxNum) {
            return true
        } else {
            return false
        }
    } else if (minNum) {
        if (minNum <= inputNum) {
            return true
        } else {
            return false
        }
    } else if (maxNum) {
        if (inputNum <= maxNum) {
            return true
        } else {
            return false
        }
    }
    
}

export default Forms;
