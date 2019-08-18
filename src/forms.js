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
    }

    async componentDidMount() {
        const response = await fetch("/forms");
        const formsObj = await response.json();
        this.setState({forms: formsObj})
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
            return null
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
        for (let property in theForm) {
            let formattedProperty = camelCaseToCapitalized(property)
            let formattedValue = parseFormValue(theForm[property])
            if (formattedValue && formattedValue!=="" && formattedValue!==" ") {
                listItems.push(
                    <div key={i}>
                        <p><strong>{formattedProperty}: </strong>{formattedValue}</p>
                    </div>
                    )
            }
            i++;
        }
        return (
            <div id="form-info">{listItems}</div>
        );
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
                    <h1>hey check out these forms:</h1>
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
                    <h1>hey check out this form:</h1>
                    {this.displayForm(this.state.currentForm)}
                    <button onClick={this.viewList}>list forms</button>
                </div>
             </div>  
            )
        }
    }  
}

function camelCaseToCapitalized (string) {
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
    return stringArray.join('')
}

function parseFormValue (value) {
    //should put together all of the objects and arrays of the response into one string that can be returned to the form viewer
    let theString = "";
    function innerFunction (value) { //this inner function is needed so that theString doesn't reset every time
        if (typeof(value)==='string' || typeof(value)==="boolean") { //input is a string (or boolean)
            theString = theString + value + " "
        } else if (value.length && typeof(value[0])==="string") { //input is an array of strings
            theString = theString + value.join(", ")
        } else if (value[0] && typeof(value[0])==="object") { //input is an array of arrays or objects (typeof returns "object" for arrays)
            value.forEach((array) => innerFunction(array))
        } else if (!value[0] && typeof(value)==="object") { //input is an object
            for (let property in value) {
                if (value[property][0]) { //make sure that the field isn't empty
                    innerFunction(" " + camelCaseToCapitalized(property) + ": ")
                    innerFunction(value[property])
                }
            } 
        } else {
            console.log("unhandled exception in parseFormValue: ")
            console.log(value)
            return
        }
    }
    innerFunction(value)
    return theString;
}

export default Forms;