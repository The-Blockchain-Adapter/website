import clientPromise from "./mongodb";
import User from "./user";
const mongoose = require("mongoose");

export async function createOrUpdateUser(session, guilds) {
	try {
		let client = await clientPromise;
		let db = await client.db();

		// Check if the user is registered on the database
		let userProfile = await db.collection("users").findOne({ discordId: session.user.id });
		if (!userProfile) {
			// If the user is not registered, create a new user
			let user = new User({
				_id: mongoose.Types.ObjectId(),
				discordId: session.user.id,
				discordUsername: session.user.name,
				discordImage: session.user.image,
				discordGuilds: guilds,
			});
			await db.collection("users").insertOne(user);
		}

		// Update the user profile
		await db.collection("users").updateOne(
			{ discordId: session.user.id },
			{
				$set: {
					discordUsername: session.user.name,
					discordImage: session.user.image,
					discordGuilds: guilds,
				},
			}
		);
	} catch (error) {
		console.log(error);
	}
}
