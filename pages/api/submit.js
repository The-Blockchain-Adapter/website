import clientPromise from "../../lib/mongo/mongodb";

export default async function submit(req, res) {
	if (req.method !== "POST") {
		return res.status(500).json({ msg: "This needs to be a post request" });
	}

	const data = JSON.parse(req?.body);
	if (!data) {
		return res.json({ msg: "no data" });
	}

	console.log(data); // To delete

	/*
		if (data.scriptType == "command") {
			// Get the client and the database connection from mongoDB
			let client = await clientPromise;
			let db = await client.db();
			let guild = await db.collection("guilds").findOne({ guildId: data.guildId });

			// Check if the guild exists
			if (!guild) {
				return res.json({ msg: "guild not found" });
			}

			// Check if the guild has less than 20 commands
			if (guild.commands.length >= 20) {
				return res.json({ msg: "Too many commands" });
			}

			// Check if the command name is empty
			if (data.commandName == "") {
				return res.json({ msg: "command name is empty" });
			}

			// Check if the command name is already used
			if (
				guild.commands.find((command) => {
					if (command.name == data.commandName) {
						return true;
					}
				})
			) {
				return res.json({ msg: "command name already used" });
			}

			// Check if the modal title is empty
			if (data.IsModal && data.modalTitle == "") {
				return res.json({ msg: "modal title is empty" });
			}

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

			// Save the new command in the guild object in mongodb
			let commands = guild.commands;
			commands.push(newCommand);
			await db.collection("guilds").updateOne(
				{ guildId: data.guildId },
				{
					$set: {
						commands: commands,
					},
				}
			);

			return res.json({ msg: "YESSS" });
		} else {
			return res.json({ msg: "not a command script" });
		}
		*/
}
