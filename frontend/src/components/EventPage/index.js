import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import * as eventActions from "../../store/events";

const EventPage = (props) => {
	const eventId = props.match.params.eventId;
	const dispatch = useDispatch();
	const eventsById = useSelector((state) => state.events.byId);

	useEffect(() => {
		dispatch(eventActions.fetchEventIfNeeded(eventId));
	}, [dispatch, eventsById, eventId]);

	const { isFetching, body: event } = eventsById[eventId] || {
		isFetching: true,
		body: {},
	};

	if (isFetching) {
		return (
			<Layout>
				<p>Loading...</p>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="EventPage">
				<h1>{event.name}</h1>
				<h2>TODO: add event category name via backend</h2>
				<p>
					Website:{" "}
					{
						<a target="_blank" href={event.website}>
							{event.website}
						</a>
					}
				</p>
				<p>Starts At: {new Date(event.startsAt).toLocaleString()}</p>
				<p>Ends At: {new Date(event.endsAt).toLocaleString()}</p>
				<p>State: {event.state}</p>
				<p>Lat: {event.lat}</p>
				<p>Long: {event.long}</p>
			</div>
		</Layout>
	);
};

export default EventPage;
