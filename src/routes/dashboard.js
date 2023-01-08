const router = require("express").Router();

function isAuthorized(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/");
}

router.get("/", isAuthorized, (req, res) => {
	res.render("dashboard");
});

module.exports = router;
