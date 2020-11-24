const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Event } = require("../../db/models");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const eventCategoryId = req.query.eventCategoryId;

		const events = !!eventCategoryId
			? await Event.findAll({
					where: { eventCategoryId },
					order: [["name", "ASC"]],
			  })
			: await Event.findAll({
					order: [["name", "ASC"]],
			  });

		return res.json({ events });
	})
);

router.get(
	"/:eventId",
	asyncHandler(async (req, res) => {
		const eventId = req.params.eventId;

		const event = await Event.findOne({
			where: { id: eventId },
		});

		return res.json({ event });
	})
);

module.exports = router;
