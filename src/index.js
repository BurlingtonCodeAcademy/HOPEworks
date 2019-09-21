import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route  } from "react-router-dom";
import Home from "./home"
import Login from "./login"
import Form from "./form"
import Forms from "./forms"
import Data from "./data"
import Edit from "./edit"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            editingForm: null
        }
        this.setForm = this.setForm.bind(this);

    }


    setForm(form) {
      this.setState( {editingForm: form} )
    }

    render() {
      return (
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/forms" render={()=><Forms setForm={this.setForm}/>}/>
          <Route path="/data" component={Data}/>
          <Route path="/edit" render={()=><Edit editingForm={this.state.editingForm}/>}/>
        </div>
      )
    }        
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
document.getElementById('root'));

serviceWorker.unregister();