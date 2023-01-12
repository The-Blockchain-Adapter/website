import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: "identify guilds" } },
		}),
	],
	session: {
		maxAge: 60 * 60 * 24 * 20, // 20 days
		updateAge: 60 * 60 * 24 * 10, // 10 day
	},
	secret: process.env.SECRET,
	callbacks: {
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.accessToken = token.accessToken;
			session.user.id = token.id;
			return session;
		},
		async jwt({ token, account, profile }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
				token.id = profile.id;
			}
			return token;
		},
	},
});

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
// adapter: MongoDBAdapter(clientPromise),
