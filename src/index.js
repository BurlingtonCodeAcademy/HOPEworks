// import React from 'react';
// import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
// import { BrowserRouter, Route  } from "react-router-dom";
// import Home from "./home"
// import Login from "./login"
// import Form from "./form"

// const fs = require('fs');
// const path = require('path');



// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             property: true
//         }
//     }

//     render() {
//       return (
//         <div>
//           <Route path="/" exact component={Login} />
//           <Route path="/home" component={Home} />
//           <Route path="/form" component={Form} />
//         </div>
//       )
//     }        
// }

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>, 
// document.getElementById('root'));

module.exports = (app) => {
	fs.readdirSync('database/api/').forEach((file) => {
		require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
	})
}

serviceWorker.unregister();