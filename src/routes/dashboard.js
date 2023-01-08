const router = require("express").Router();
const DiscordUser = require("../models/DiscordUser");

function isAuthorized(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/");
}

router.get("/", isAuthorized, (req, res) => {
	res.render("dashboard", {
		username: req.user.username,
		guilds: req.user.guilds,
	});
});

module.exports = router;
