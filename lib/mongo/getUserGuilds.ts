import clientPromise from "./mongodb";

export async function getUserGuilds(session) {
	// Get all the guilds of the user
	const userGuilds = await fetch("http://discord.com/api/users/@me/guilds", {
		headers: { Authorization: `Bearer ${session.accessToken}` },
	}).then((res) => res.json());

	// get guilds where the user is admin
	const adminUserGuilds = userGuilds.filter(
		({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
	);

	// Connect to mongodb and get all the guilds where the bot is
	let guildslist;
	try {
		let client = await clientPromise;
		let db = await client.db();
		guildslist = await db.collection("guilds").find().toArray();
	} catch (error) {
		console.log(error);
	}

	// Only return guilds that are signin and where the user is admin on
	return adminUserGuilds.filter((guild) =>
		guildslist.some((botguild) => botguild.guildId === guild.id)
	);
}
