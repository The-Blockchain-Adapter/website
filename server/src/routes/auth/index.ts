import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) => {
	res.send(200);
});

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) => {
	res.redirect("http://localhost:3000/dashboard");
});

router.get("/status", (req, res) => {
	return req.user ? res.send(req.user) : res.sendStatus(401);
});
//res.status(401).send({ msg: "Not Authenticated" })

export default router;
