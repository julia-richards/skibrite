import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import EventsPage from "./components/EventsPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

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
			<Route path="/login">
				<LoginFormPage />
			</Route>
			<Route path="/signup">
				<SignupFormPage />
			</Route>
			<Route path="/events">
				<EventsPage />
			</Route>
		</Switch>
	);
}

export default App;
