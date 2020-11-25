const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const {
	setTokenCookie,
	requireAuth,
	restoreUser,
} = require("../../utils/auth");
const { User, Event, EventCategory, Ticket } = require("../../db/models");

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
			include: [{ model: EventCategory }],
		});

		return res.json({ event });
	})
);

router.post(
	"/:eventId/ticket",
	restoreUser,
	asyncHandler(async (req, res) => {
		const { user } = req;
		const eventId = req.params.eventId;
		const newTicket = await Ticket.create({
			userId: user.id,
			eventId,
		});
		return res.json({ ticket: newTicket });
	})
);

module.exports = router;
