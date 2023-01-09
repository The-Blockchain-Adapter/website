import { config } from "dotenv";
import express, { Express } from "express";
import routes from "../routes";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";

config();
require("../strategies/discord");

export function createApp(): Express {
	const app = express();
	//enable parsing middleware for requests
	app.use(express.json());
	app.use(express.urlencoded());

	//enable cors
	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		})
	);

	//enable sessions
	app.use(
		session({
			secret: "i eat three pasta every 5 milliseconds",
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
			},
			store: store.create({ mongoUrl: process.env.MONGO_URL! }),
		})
	);

	//enable passport
	app.use(passport.initialize());
	app.use(passport.session());

	app.use("/api", routes);
	return app;
}
