import React from 'react';

class Forms extends React.Component {
    constructor() {
        super();
        this.state = {
            forms: null,
            view: "list",
            currentForm: null
        }
        this.viewForm = this.viewForm.bind(this);
        this.viewList = this.viewList.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.orderForms = this.orderForms.bind(this);
        this.displayFormElement = this.displayFormElement.bind(this);
        // this.updateFormList = this.updateFormList.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/forms");
        const formsObj = await response.json();
        this.setState({forms: formsObj})
        // setInterval(this.updateFormList(), 10000)
    }

    async updateFormList () {
        console.log("updating form list....")
        const response = await fetch("/forms");
        const formsObj = await response.json();
        this.setState({forms: formsObj})
        console.log("we did it")
    }

    viewForm (event) {
        let buttonIdNum = event.target.id.slice(-1);
        this.setState({ view: "form", currentForm: buttonIdNum })
    }

    viewList () {
        this.setState({ view: "list", currentForm: null })
    }

    listTheForms (forms) {
        if (forms) {
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
                    <div key={i} className="column-two">
                        <li>{new Date(form.when).toLocaleString()}: {form.data.firstName} {form.data.lastName} ({formType})
                            <button className="view-form-button" id={"view-form-button-" + i} onClick={this.viewForm}>view form</button>
                            <button id={"delete-button-" + i} onClick={this.showDialog}>delete form</button>
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
                        </li>
                    </div>
                    )
                i++;
            })
            return (
                <ul id="forms">{listItems}</ul>
            );
        } else {
            return <p>getting the forms...</p>
        }
        
    }
      
    orderForms(forms) {
        forms.sort(function(a, b){return Date.parse(b.when) - Date.parse(a.when)})
        return forms;
    }

    displayForm (formNum) {
        let allOrderedForms = this.orderForms(this.state.forms)
        let theForm = allOrderedForms[formNum].data;

        let i = 0;
        let listItems = [];

        let ageDisplayType = null;                 // if we know the DOB, we can display an exact current age and exact age at time of contact.
        if (theForm.dateOfBirth!=="") {
            ageDisplayType = "dob"
        } else if (theForm.ageRange.length > 0) { //if we only have an age range, we will have to approximate current age.
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
                                <div className="form-element">{this.displayFormElement(property, theForm.dateOfBirth, null, "normal")}</div>
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
                                <div className="form-element">{this.displayFormElement("Approximate Date of Birth", approxBirthDate[2] + "-" + approxBirthDate[0] + "-" + approxBirthDate[1], null, "normal")}</div>
                            </div>
                            )
                        i++;
                    } else {
                        console.log("unhandled exception in display form")
                    }
                }
            } else if (theForm[property][0] || typeof(theForm[property])==="boolean" || (theForm[property].advocacy && isObjectNonEmpty(theForm[property]))) {
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
        } else if (value.length && typeof(value[0])==="string") { //input is an array of strings
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
        let allOrderedForms = this.orderForms(this.state.forms)
        let theFormId = allOrderedForms[buttonIdNum]._id;
        console.log(theFormId)
        await fetch("/delete/" + theFormId)
        window.location.replace("/forms")
    }

    render() {
        if (this.state.view==="list") {
            return (
             <div>
                <div id="forms-page">
                    <h1>Submitted Forms</h1>
                    <div id="form-list">
                        {this.listTheForms(this.state.forms)}
                    </div>
                </div>
            </div>
            )
        } else if (this.state.view==="form") {
            return (
             <div>
                <div id="forms-page">
                    <h1>Survivor Information</h1>
                    <button onClick={this.viewList}>back to form list</button>
                    {this.displayForm(this.state.currentForm)}
                    <button onClick={this.viewList}>back to form list</button>
                </div>
             </div>  
            )
        }
    }  
}

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

function isObjectNonEmpty (object) {
    for (let property in object) {
        if (object[property].length > 0) {
            return true;
        }
    }
    return false;
}

function getCurrentDate () {
    let theTime = new Date().toLocaleString()
    let monthDayYear = theTime.split("/")
    monthDayYear[2] = monthDayYear[2].slice(0, 4)
    let monthDayYearNums = monthDayYear.map((string) => Number(string))
    return monthDayYearNums;
}

export default Forms;