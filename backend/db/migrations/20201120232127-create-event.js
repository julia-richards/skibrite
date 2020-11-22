"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Events", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			website: {
				type: Sequelize.STRING,
			},
			state: {
				type: Sequelize.STRING,
			},
			lat: {
				type: Sequelize.BIGINT,
			},
			long: {
				type: Sequelize.BIGINT,
			},
			distance: {
				type: Sequelize.FLOAT,
			},
			startsAt: {
				type: Sequelize.DATE,
			},
			endsAt: {
				type: Sequelize.DATE,
			},
			capacity: {
				type: Sequelize.INTEGER,
			},
			eventCategoryId: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Events");
	},
};
