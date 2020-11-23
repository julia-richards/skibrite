import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import CategoryPicker from "./CategoryPicker";
import * as eventActions from "../../store/events";

// TODO: get me from API
const categoryOptions = [
	{ id: 1, name: "Nordic" },
	{ id: 2, name: "Club Membership" },
];

const EventsPage = () => {
	const dispatch = useDispatch();
	const selectedEventCategoryId = useSelector(
		(state) => state.events.selectedEventCategoryId
	);
	const eventsByEventCategoryId = useSelector(
		(state) => state.events.eventsByEventCategoryId
	);

	useEffect(() => {
		dispatch(eventActions.fetchEventsIfNeeded(selectedEventCategoryId));
	}, [selectedEventCategoryId]);

	const { isFetching, lastUpdated, items: events } = eventsByEventCategoryId[
		selectedEventCategoryId
	] || {
		isFetching: true,
		items: [],
	};

	return (
		<Layout>
			<div className="EventsPage">
				<h1>Events</h1>
				<CategoryPicker
					value={selectedEventCategoryId}
					options={categoryOptions}
					onChange={(value) =>
						dispatch(eventActions.selectEventCategoryId(value))
					}
				/>
				{!!events.length ? (
					<ul>
						{events.map((event) => (
							<li className="EventItem" key={event.id}>
								<h2>{event.name}</h2>
								<h3>{event.categoryName}</h3>
								<p>{event.website}</p>
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
