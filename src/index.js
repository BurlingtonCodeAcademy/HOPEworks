import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route  } from "react-router-dom";
import Home from "./home"
import Login from "./login"
import Form from "./form"
import Forms from "./forms"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
    }

    render() {
      return (
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/forms" component={Forms}/>
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