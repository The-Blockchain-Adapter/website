const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/DiscordUser");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await DiscordUser.findById(id);
	if (user) done(null, user);
});

passport.use(
	new DiscordStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/redirect",
			scope: ["identify", "guilds"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await DiscordUser.findOne({ discordId: profile.id });
				const adminGuilds = [];
				for (i = 0; i < profile.guilds.length; i++) {
					if (profile.guilds[i].permissions == 2147483647) {
						adminGuilds.push(profile.guilds[i]);
					}
				}
				if (user) {
					//update the user admin guilds
					user.guilds = adminGuilds;
					await user.save();
					done(null, user);
				} else {
					const newUser = await DiscordUser.create({
						discordId: profile.id,
						username: profile.username,
						guilds: adminGuilds,
					});
					const savedUser = await newUser.save();
					done(null, savedUser);
				}
			} catch (err) {
				console.log(err);
				done(err, null);
			}
		}
	)
);
