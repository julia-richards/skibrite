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
				<h1>My Tickets</h1>
				{!!tickets.length ? (
					<ul style={isFetching ? { opacity: 0.7 } : {}}>
						{tickets.map((ticket) => (
							<li key={ticket.id}>
								{/* <pre>{JSON.stringify(ticket, null, 2)}</pre> */}
								<div className="ticket-card">
									<p className="ticket-event-name">
										{ticket.Event.name}
									</p>
									<br />
									<p className="date-ribbon">
										{new Date(
											ticket.Event.startsAt
										).toLocaleDateString(undefined, {
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
									<a href={ticket.Event.website}>
										Event website
									</a>
									{ticket.isDeleting ? (
										<button disabled>Deleting...</button>
									) : (
										<button
											onClick={() =>
												dispatch(
													ticketActions.deleteTicket(
														ticket.id
													)
												)
											}
										>
											Remove ticket for this event
										</button>
									)}
								</div>
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
