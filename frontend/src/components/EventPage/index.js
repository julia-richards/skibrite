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

	const event = eventsById[eventId];
	return (
		<Layout>
			<div className="EventPage">{JSON.stringify(event)}</div>
		</Layout>
	);
};

export default EventPage;
