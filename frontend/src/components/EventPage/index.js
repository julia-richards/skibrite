import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import MapDisplay from "../MapDisplay";
import { ReactComponent as ImageBanner } from "../../images/alpine.svg";
import * as eventActions from "../../store/events";
import "./EventPage.css";

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
			<div className="event-banner">
				<p className="event-banner__text">
					<h1>{event.name}</h1>
				</p>
				<ImageBanner
					alt="alpine-skier"
					className="event-banner__image"
				/>
			</div>

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
			<MapDisplay lat={event.lat} long={event.long} />
		</Layout>
	);
};

export default EventPage;
