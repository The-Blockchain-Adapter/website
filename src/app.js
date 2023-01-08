require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("./strategies/discordstrategy");
const db = require("./database/database");

db.then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

// Routes
const authRoute = require("./routes/auth");

app.use(
	session({
		secret: "i eat pasta",
		cookie: {
			maxAge: 60000 * 60 * 24,
		},
		saveUninitialized: false,
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middlewares Routes
app.use("/auth", authRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
