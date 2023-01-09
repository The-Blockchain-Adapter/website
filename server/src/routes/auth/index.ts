import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) => {
	res.send("Hello World");
});

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) => {
	res.send("Hello World");
});

router.get("/status", (req, res) => {
	return req.user ? res.send(req.user) : res.status(401).send({ msg: "Not Authenticated" });
});

export default router;
