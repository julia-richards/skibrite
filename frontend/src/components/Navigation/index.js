import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = () => {
	const user = useSelector((store) => store.session.user);

	return (
		<div className="navigation">
			<ul>
				<li>
					<NavLink to="/">Home </NavLink>
				</li>

				{!!user ? (
					<>
						<li>
							<NavLink to="/logout">Logout</NavLink>
						</li>
						<li>
							<ProfileButton />
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/signup">Sign Up</NavLink>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Navigation;
