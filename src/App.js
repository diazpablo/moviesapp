import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import auth from './services/authService';
import NavBar from "./components/common/navbar";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<>
				<ToastContainer />
				<NavBar user={user} />
				<main role="main" className="container py-4">
					<Switch>
						<Route path="/register" component={RegisterForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route
							path="/movies"
							render={props => <Movies {...props} user={user} />}
						/>
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={NotFound} />
						<Redirect from="/" to="/movies" exact />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
