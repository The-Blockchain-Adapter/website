import { Profile, Strategy } from "passport-discord";
import passport from "passport";
import { VerifyCallback } from "passport-oauth2";
import { User } from "../database/schemas";

passport.serializeUser((user: any, done) => {
	return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await User.findById(id);
		return user ? done(null, user) : done(null, null);
	} catch (err) {
		return done(err, null);
	}
});

passport.use(
	new Strategy(
		{
			clientID: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
			callbackURL: process.env.DISCORD_CLIENT_CALLBACK_URL,
			scope: ["identify", "guilds"],
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: Profile,
			done: VerifyCallback
		) => {
			//console.log(profile);
			const { id: discordId } = profile;
			try {
				const existingUser = await User.findOneAndUpdate(
					{ discordId },
					{ accessToken, refreshToken },
					{ new: true }
				);
				if (existingUser) return done(null, existingUser);
				const newUser = new User({ discordId, accessToken, refreshToken });
				const saveUser = await newUser.save();
				return done(null, saveUser);
			} catch (err) {
				console.log(err);
				return done(err as any, undefined);
			}
		}
	)
);
