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
            allOrderedForms.forEach((form) => {
            listItems.push(
                <div key={i}>
                    <li>{new Date(form.when).toLocaleString()}: {form.data.firstName} {form.data.lastName}
                        <button className="view-form-button" id={"view-form-button-" + i} onClick={this.viewForm}>view form</button>
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
        console.log("displaying form number " + formNum)
        console.log(theForm)

        let i = 0;
        let listItems = [];
        let formattedValue;
        for (let property in theForm) {
            let formattedProperty = camelCaseToCapitalized(property)
            let formattedValue = parseFormValue(theForm[property])
            if (formattedValue) {
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

    render() {
        if (this.state.view==="list") {
            return (
                <div id="forms-page">
                    <h1>hey check out these forms:</h1>
                    <div id="form-list">
                        {this.listTheForms(this.state.forms)}
                    </div>
                </div>
            )
        } else if (this.state.view==="form") {
            return (
                <div id="forms-page">
                    <h1>hey check out this form:</h1>
                    {this.displayForm(this.state.currentForm)}
                    <button onClick={this.viewList}>list forms</button>
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

function parseFormValue (value) { //this function should work recursively/call itself, needs refactor
    //should put together all of the objects and arrays of the response into one string that can be returned to the form viewer
    let theString = ""
    if (typeof(value)==='string') { //input is a string
        return value
    } else if (value.length && typeof(value[0])==="string") { //input is an array of strings
        return value.join(", ")
    } else if (value.length && value[0].length) { //input is an array of arrays of strings
    }
}

export default Forms;