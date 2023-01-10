import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// @ts-ignore
export default (req, res) =>
	NextAuth(req, res, {
		providers: [
			DiscordProvider({
				clientId: process.env.DISCORD_CLIENT_ID,
				clientSecret: process.env.DISCORD_CLIENT_SECRET,
				authorization: { params: { scope: "identify guilds" } },
			}),
		],
	});

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
