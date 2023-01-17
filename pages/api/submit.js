import clientPromise from "../../lib/mongo/mongodb";

export default async function submit(req, res) {
	if (req.method === "POST") {
		const data = JSON.parse(req?.body);
		if (!data) {
			return res.json({ msg: "no data" });
		}

		console.log(data);

		if (data.scriptType == "command") {
			// Get the client and the database connection from mongoDB
			let client = await clientPromise;
			let db = await client.db();
			let guild = await db.collection("guilds").findOne({ guildId: data.guildId });
			if (!guild) {
				return res.json({ msg: "guild not found" });
			}

			if (guild.commands.length > 20) {
				return res.json({ msg: "Too many commands" });
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

			//

			// if (IsModal) {
			// 	let requiredBoolean = true;
			// } else {
			// 	let requiredBoolean = false;
			// }

			// Assemble the new command object
			let newCommand = {
				name: data.commandName,
				onlyAdmin: data.admin,
				modal: data.IsModal,
				modalTitle: data.modalTitle || "",
				modalInputs: [] || [],
				modalOutputs: [] || [],
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
	} else {
		return res.status(500).json({ msg: "This needs to be a post request" });
	}
}
