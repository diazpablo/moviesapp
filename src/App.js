import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/common/navbar";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

const App = () => {
	return (
		<>
			<NavBar />
			<main role="main" className="container py-4">
				<Switch>
					<Route path="/movies/:id" component={MovieForm} />
					<Route path="/movies" component={Movies} />
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

export default App;
