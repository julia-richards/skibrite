import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import CategoryPicker from "./CategoryPicker";
import * as eventActions from "../../store/events";
import * as categoryActions from "../../store/categories";

import "./EventsPage.css";

const EventsPage = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const selectedEventCategoryId = useSelector(
		(state) => state.events.selectedEventCategoryId
	);
	const eventsByEventCategoryId = useSelector(
		(state) => state.events.eventsByEventCategoryId
	);

	useEffect(() => {
		dispatch(eventActions.fetchEventsIfNeeded(selectedEventCategoryId));
	}, [selectedEventCategoryId]);

	useEffect(() => {
		dispatch(categoryActions.fetchCategoriesIfNeeded());
	}, [categories]);

	const { isFetching, lastUpdated, items: events } = eventsByEventCategoryId[
		selectedEventCategoryId
	] || {
		isFetching: true,
		items: [],
	};

	return (
		<Layout>
			<div className="EventsPage">
				<header className="EventsPage__header">
					<h1>Events</h1>
					<CategoryPicker
						value={selectedEventCategoryId}
						options={categories}
						onChange={(value) =>
							dispatch(eventActions.selectEventCategoryId(value))
						}
					/>
				</header>

				{!!events.length ? (
					<ul
						className="EventList"
						style={isFetching ? { opacity: 0.7 } : {}}
					>
						{events.map((event) => (
							<li className="EventList__EventItem" key={event.id}>
								<h3 className="EventList__EventItem__category">
									{event.EventCategory.name}
								</h3>
								<h2 className="EventList__EventItem__name">
									{event.name}
								</h2>
								<Link
									to={`/event/${event.id}`}
									className="link-button"
								>
									View Event
								</Link>
							</li>
						))}
					</ul>
				) : isFetching ? (
					<p>Loading...</p>
				) : (
					<p>No events match</p>
				)}
			</div>
		</Layout>
	);
};

export default EventsPage;
