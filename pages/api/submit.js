import clientPromise from "../../lib/mongo/mongodb";

export default async function submit(req, res) {
	if (req.method !== "POST") {
		return res.status(500).json({ msg: "This needs to be a post request" });
	}

	const data = JSON.parse(req?.body);
	if (!data) {
		return res.json({ msg: "no data" });
	}

	// Get the client and the database connection from mongoDB
	let client = await clientPromise;
	let db = await client.db();
	let guild = await db.collection("guilds").findOne({ discordId: data.discordId });
	if (!guild) {
		return res.json({ msg: "guild not found" });
	}
	console.log(data); // -------------------------------------------- To delete -------------------------------------------
	console.log(data.trigger?.modalInputs); // -------------------------------------------- To delete -------------------------------------------
	console.log(data.action[0]?.inputs);
	return;
	// Save the new script depending on its type
	if (data.scriptType == "command") {
		let commands = guild.commands;
		commands.push(data); //----------------------- UNcomment this line to save the command in the database -----------------
		await db.collection("guilds").updateOne(
			{ discordId: data.discordId },
			{
				$set: {
					commands: commands,
				},
			}
		);
	} else {
		return res.json({ msg: "not a command script" });
	}

	return res.json({ msg: "Your script has been saved successfully!" });
}

/*
			// Check if the modal inputs are empty
			const ModalInputsArray = [];
			for (let i = 0; i < data.ModalInputsLettersArray.length; i++) {
				if (
					data.IsModal &&
					data[`modalInput${data.ModalInputsLettersArray[i]}Name`] == ""
				) {
					return res.json({
						msg: `modal inputs ${data.ModalInputsLettersArray[i]} is empty`,
					});
				}
				ModalInputsArray.push(data.modalInputAName);
			}

			// Assemble the new command object
			let newCommand = {
				name: data.commandName,
				onlyAdmin: data.admin,
				modal: data.IsModal,
				modalTitle: data.modalTitle || "",
				modalInputs: [] || [],
				modalOutputs: data.ModalInputsLettersArray || [],
				data: [] || [],
				action: [],
			};
			*/
