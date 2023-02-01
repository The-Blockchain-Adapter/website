import clientPromise from "../../lib/mongo/mongodb";

export default async function submit(req, res) {
	// Check if the request is a POST request
	if (req.method !== "POST") {
		return res.status(500).json({ msg: "This needs to be a post request" });
	}

	// Parse the request body as JSON
	const script = JSON.parse(req?.body);
	if (!script) {
		return res.json({ msg: "no data" });
	}

	// Get the client and the database connection from mongoDB
	let client = await clientPromise;
	let db = await client.db();
	const discordId = script.discordId;
	delete script.discordId;
	let guild = await db.collection("guilds").findOne({ discordId });
	if (!guild) {
		return res.json({ msg: "guild not found" });
	}

	// Convert the modal inputs as an array of strings
	if (script.trigger.inputs?.length > 0) {
		let inputs = [];
		for (let i = 0; i < script.trigger.inputs?.length; i++) {
			inputs.push(script.trigger.inputs[i].text);
		}
		script.trigger.inputs = inputs;
	}

	// Convert the data inputs as an array of strings
	for (let i = 0; i < script.data?.length; i++) {
		if (script.data[i].inputs?.length > 0) {
			let inputs = [];
			for (let j = 0; j < script.data[i].inputs?.length; j++) {
				inputs.push(script.data[i].inputs[j].value);
			}
			script.data[i].inputs = inputs;
		}
	}

	// Save the new script to the database
	let scripts = guild.scripts;
	scripts.push(script);
	await db.collection("guilds").updateOne(
		{ discordId },
		{
			$set: {
				scripts,
			},
		}
	);

	return res.json({ msg: true, name: script.trigger.name });
}
