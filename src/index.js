import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            property: true
        }
//        this.function = this.function.bind(this);
      }

    render() {
      return (
        <div>
          <button>hi</button>
        </div>
      )
    }        
}


ReactDOM.render(
<App />, 
document.getElementById('root'));

serviceWorker.unregister();
