import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessioUser = useSelector((state) => state.session.user);
	//set state
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	//redirect to home if user already logged in
	if (sessioUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			(res) => {
				if (res.data && res.data.errors) setErrors(res.data.errors);
			}
		);
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email Address
					<input
						name="email"
						value={credential}
						placeholder="email address"
						onChange={(e) => setCredential(e.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						name="password"
						value={password}
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Log In</button>
			</form>
		</>
	);
};

export default LoginFormPage;
