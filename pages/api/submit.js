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

	// Convert the modal inputs as an array of strings and add outputs as an array of letters
	if (script.trigger.modalInputs?.length > 0) {
		let modalInputs = [];
		let modalOutputs = [];
		for (let i = 0; i < script.trigger.modalInputs?.length; i++) {
			modalInputs.push(script.trigger.modalInputs[i].text);
			modalOutputs.push(String.fromCharCode(65 + i));
		}
		script.trigger.modalInputs = modalInputs;
		script.trigger.modalOutputs = modalOutputs;
	}

	// Convert the data inputs as an array of strings and add outputs as letters
	for (let i = 0; i < script.data?.length; i++) {
		let inputs = [];
		for (let j = 0; j < script.data[i].inputs?.length; j++) {
			inputs.push(script.data[i].inputs[j].value);
		}
		script.data[i].inputs = inputs;
		const modalInputsLength = script.trigger.modalInputs?.length || 0;
		script.data[i].output = String.fromCharCode(65 + i + modalInputsLength);
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

	return res.json({ msg: "Your script has been saved successfully!" });
}
