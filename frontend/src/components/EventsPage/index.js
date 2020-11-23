import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

const EventsPage = () => {
	const events = [
		{
			id: 1,
			name: "Event 1",
			categoryName: "Category",
			description: "A great event",
		},
		{
			id: 2,
			name: "Event 2",
			categoryName: "Category",
			description: "An okay event",
		},
		{
			id: 3,
			name: "Event 3",
			categoryName: "Category",
			description: "The best event",
		},
		{
			id: 4,
			name: "Event 4",
			categoryName: "Category",
			description: "Another event",
		},
	];

	return (
		<Layout>
			<div className="EventsPage">
				<h1>Events</h1>
				{!!events.length ? (
					<ul>
						{events.map((event) => (
							<li className="EventItem" key={event.id}>
								<h2>{event.name}</h2>
								<h3>{event.categoryName}</h3>
								<p>{event.description}</p>
								<Link to={`/event/${event.id}`}>
									View Event
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p>No events match</p>
				)}
			</div>
		</Layout>
	);
};

export default EventsPage;
