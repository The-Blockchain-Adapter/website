import clientPromise from "../../lib/mongo/mongodb";

export default async function deleteScript(req, res) {
	// Check if the request is a POST request
	if (req.method !== "POST") {
		return res.status(500).json({ msg: "This needs to be a post request" });
	}

	// Parse the request body as JSON
	const data = JSON.parse(req?.body);
	if (!data) {
		return res.json({ msg: "no data" });
	}

	// Get the client and the database connection from mongoDB
	let client = await clientPromise;
	let db = await client.db();
	const discordId = data.discordId;
	let guild = await db.collection("guilds").findOne({ discordId });
	if (!guild) {
		return res.json({ msg: "guild not found" });
	}

	// Remove the script from the database
	let scripts = guild.scripts;
	scripts.splice(data.index, 1);
	await db.collection("guilds").updateOne(
		{ discordId },
		{
			$set: {
				scripts,
			},
		}
	);

	return res.json({ msg: true });
}
