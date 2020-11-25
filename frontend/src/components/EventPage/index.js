import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import MapDisplay from "../MapDisplay";
import DefaultDescription from "./DefaultDescription";
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
			<div className="event-page">
				<div className="event-banner">
					<p className="event-banner__text">
						<h1>{event.name}</h1>
						<h4>{event.EventCategory.name}</h4>
					</p>
					<ImageBanner
						alt="alpine-skier"
						className="event-banner__image"
					/>
				</div>
				<div className="event-details">
					<div className="event-details__description">
						<strong>Description</strong>
						{!!event.description ? (
							<p>{event.description}</p>
						) : (
							<DefaultDescription />
						)}
					</div>
					<div className="event-details__details">
						<p>
							<strong>State</strong> {event.state}
						</p>{" "}
						<p>
							<strong>Website</strong>{" "}
							{
								<a target="_blank" href={event.website}>
									{event.website}
								</a>
							}
						</p>
						<p>
							<strong>Start Date</strong>{" "}
							{new Date(event.startsAt).toLocaleDateString(
								undefined,
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</p>
						<p>
							<strong>End Date</strong>{" "}
							{new Date(event.endsAt).toLocaleDateString(
								undefined,
								{
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</p>
						<MapDisplay lat={event.lat} long={event.long} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default EventPage;
