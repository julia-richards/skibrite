"use strict";
const dataFromApi = require("../../scripts/events.json");
const { EventCategory } = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let events = [];

		for (let event of dataFromApi) {
			// find or create category
			const eventCategory = await EventCategory.findOrCreate({
				where: { name: event.categoryName },
			});
			// replace name string w/ id
			delete event.categoryName;
			event.eventCategoryId = eventCategory.id;
			// replace dates
			let startDateString = Date(event.startsAt);
			event.startsAt = new Date(startDateString);
			let endDateString = Date(event.endsAt);
			event.endsAt = new Date(endDateString);
			// add to bulk attrs
			events.push(event);
		}

		return queryInterface.bulkInsert("Events", events);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("EventCategories", null, {});
		await queryInterface.bulkDelete("Events", null, {});
	},
};
