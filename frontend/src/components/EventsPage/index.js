import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import CategoryPicker from "./CategoryPicker";
import * as eventActions from "../../store/events";
import * as categoryActions from "../../store/categories";

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
				<h1>Events</h1>
				<CategoryPicker
					value={selectedEventCategoryId}
					options={categories.map((cat) => ({
						value: cat.id,
						name: cat.name,
					}))}
					onChange={(value) =>
						dispatch(eventActions.selectEventCategoryId(value))
					}
				/>
				{!!events.length ? (
					<ul style={isFetching ? { opacity: 0.7 } : {}}>
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
