const express = require("express");
const asyncHandler = require("express-async-handler");
const { restoreUser } = require("../../utils/auth.js");

const { Event, Ticket } = require("../../db/models");

const router = express.Router();

// TODO: make me work
router.get(
	"/",
	restoreUser,
	asyncHandler(async (req, res) => {
		const { user } = req;

		const tickets = await Ticket.findAll({
			where: { userId: user.id },
			include: [{ model: Event }],
		});

		return res.json({ tickets });
	})
);

module.exports = router;
