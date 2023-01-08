require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000 || 3001;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const db = require("./database/database");
const path = require("path");
const DiscordStrategy = require("./strategies/discordstrategy"); //do not delete

db.then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

// Routes
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");

app.use(
	session({
		secret: "i eat three pasta every millisecond",
		cookie: {
			maxAge: 60000 * 60 * 24,
		},
		saveUninitialized: false,
		resave: false,
		name: "discord.oauth2",
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
		}),
	})
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middlewares Routes
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
