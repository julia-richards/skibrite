import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import { ReactComponent as ImageBanner } from "../../images/allEvents.svg";
import "./HomePage.css";
import * as categoryActions from "../../store/categories";

const HomePage = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	useEffect(() => {
		dispatch(categoryActions.fetchCategoriesIfNeeded());
	}, [dispatch, categories]);

	return (
		<Layout>
			<div className="home-banner">
				<p className="home-banner__text">
					Find your next nordic ski adventure
				</p>
				<ImageBanner
					alt="nordic-skiing-events"
					className="home-banner__image"
				/>
			</div>
			<div className="event-category-links">
				<h2>Browse events by category</h2>
				<div>
					<ul>
						{categories.map((cat) => (
							<li key={cat.id}>{cat.name}</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
