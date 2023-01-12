import clientPromise from "./mongodb";

export async function authorizeAccess(session, context) {
	try {
		let client = await clientPromise;
		let db = await client.db();

		// Check if the user is registered on the database
		let userProfile = await db.collection("users").findOne({ discordId: session.user.id });
		if (!userProfile) {
			return null;
		}

		//verify if the user can access this guild
		const userGuild = userProfile.discordGuilds.find((guild) => guild.id === context.params.id);
		if (userGuild === undefined) {
			return null;
		}

		//get the full guild infos
		let guild = await db.collection("guilds").findOne({ guildId: userGuild.id });
		if (!guild) {
			return null;
		}

		return guild;
	} catch (error) {
		console.log(error);
	}
}
