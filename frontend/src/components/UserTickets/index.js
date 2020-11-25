import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import * as ticketActions from "../../store/tickets";
import "./UserTickets.css";

const UserTickets = (props) => {
	const dispatch = useDispatch();
	const ticketState = useSelector((state) => state.tickets);

	useEffect(() => {
		dispatch(ticketActions.fetchTicketsIfNeeded());
	}, []);

	const { isFetching, items: tickets, lastUpdated } = ticketState;

	if (isFetching && !lastUpdated) {
		return (
			<Layout>
				<div className="UserTickets">
					<h1>Tickets</h1>
					<p>Loading...</p>;
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="UserTickets">
				<h1>Tickets</h1>
				{!!tickets.length ? (
					<ul style={isFetching ? { opacity: 0.7 } : {}}>
						{tickets.map((ticket) => (
							<li key={ticket.id}>
								<pre>{JSON.stringify(ticket, null, 2)}</pre>
							</li>
						))}
					</ul>
				) : (
					<>
						<p>No tickets, yet</p>
						<p>
							Register for one from our{" "}
							<Link to="/events">events page</Link>!
						</p>
					</>
				)}
			</div>
		</Layout>
	);
};

export default UserTickets;
