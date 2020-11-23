import React from "react";
import Layout from "../Layout";
import { ReactComponent as ImageBanner } from "../../images/allEvents.svg";
import "./HomePage.css";


const HomePage = () => (
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
				<span>Nordic</span>
			</div>
		</div>
	</Layout>
);

export default HomePage;
