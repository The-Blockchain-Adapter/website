const router = require("express").Router();
const passport = require("passport");

function isAuthorized(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect("/dashboard");
	} else {
		next();
	}
}

router.get("/", isAuthorized, passport.authenticate("discord"));

router.get(
	"/redirect",
	passport.authenticate("discord", {
		failureRedirect: "/",
		successRedirect: "/dashboard",
	})
);

module.exports = router;
