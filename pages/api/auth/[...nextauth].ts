import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
	providers: [
		DiscordProvider({
			// @ts-ignore
			clientId: process.env.DISCORD_CLIENT_ID,
			// @ts-ignore
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: { params: { scope: "identify guilds" } },
		}),
	],
	session: {
		maxAge: 60 * 60 * 24 * 20, // 20 days
		updateAge: 60 * 60 * 24 * 10, // 10 day
	},
	//adapter: MongoDBAdapter(clientPromise),
	secret: process.env.SECRET,
	callbacks: {
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			// @ts-ignore
			session.accessToken = token.accessToken;
			// @ts-ignore
			session.user.id = token.id;

			console.log(token.accessToken);
			console.log(token.id);

			return session;
		},
		async jwt({ token, account, profile }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
				// @ts-ignore
				token.id = profile.id;
			}
			return token;
		},
	},
});
