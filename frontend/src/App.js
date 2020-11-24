import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./components/HomePage";
import EventPage from "./components/EventPage";
import EventsPage from "./components/EventsPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	return (
		<Switch>
			<Route exact path="/">
				<HomePage />
			</Route>
			<Route path="/login">
				<LoginFormPage />
			</Route>
			<Route path="/signup">
				<SignupFormPage />
			</Route>
			<Route path="/events">
				<EventsPage />
			</Route>
			<Route path="/event/:eventId" component={EventPage} />
		</Switch>
	);
}

export default App;
