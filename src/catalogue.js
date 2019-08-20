import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		fetch("/users")
			.then(res => res.json())
			.then(result => {
				console.log(result[0]._id);
				this.setState({
					users: result
				});
			});
	}
 render() {
   const { users } = this.state;
   return (
     <div>
       <h1>users</h1>
       <ul>
         {users.map(user => (
           <Link to={`/hw/${users}`}>
             {" "}
             <li key={users}>
               HOPEWORKS_USER: {users.text}
               <br />When: {users.when}
             </li>
           </Link>
         ))}
       </ul>
     </div>
   );
 }
}

export default UserList;

// userRoutes.route('/:user').get(function(req, res) {
//   let user = req.params.user;
//   Todo.findByUser(user, function(err, user) {
//       res.json(user);
//   });
// });

// userRoutes.route('/add').post(function(req, res) {
//   let user = new User(req.body);
//   user.save()
//       .then(user => {
//           res.status(200).json({'user': 'user added successfully'});
//       })
//       .catch(err => {
//           res.status(400).send('adding new user failed');
//       });
// });
