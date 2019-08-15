import React from 'react';

class Forms extends React.Component {
    constructor() {
        super();
        this.state = {
            forms: null
        }

    }

    async componentDidMount() {
        const response = await fetch("/forms");
        const formsObj = await response.json();
        this.setState({forms: formsObj})
    }

    listTheForms (forms) {
        if (forms) {
            let i = 0;
            // let allOrderedforms = this.orderForms(forms)
            let listItems = [];
            forms.forEach((form) => {
            listItems.push(
                <div key={i}>
                    <li>{new Date(form.when).toLocaleString()}: {form.data.firstName} {form.data.lastName}</li>
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

    render() {
      return (
          <div id="forms-page">
              <h1>hey check out these forms:</h1>
              <div id="form-list">
                {this.listTheForms(this.state.forms)}
              </div>
          </div>
      )
    }  
}

export default Forms;