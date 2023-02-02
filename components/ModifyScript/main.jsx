import React, { useState } from "react";
import { ModifyTrigger } from "./trigger";
import { ModifyData } from "./data";
import { ModifyAction } from "./action";

export const ModifyScript = ({ guild }) => {
	const [Script, setScript] = useState(guild.scripts[0]);

	//Handle a script deletion
	const deleteScript = async (index) => {
		try {
			fetch("/api/deleteScript", {
				method: "POST",
				body: JSON.stringify({
					index,
					discordId: guild.discordId,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data.msg) {
						window.location.reload(false);
					}
				});
		} catch {
			(err) => {
				console.log("Server error...");
			};
		}
	};

	return (
		<div>
			{guild.scripts.length == 0 ? (
				<div>
					<h2>You don't have any scripts yet.</h2>
					<h2>Try creating one!</h2>
				</div>
			) : (
				<div>
					<div>
						<label>Modify the </label>
						<select
							onClick={(val) => {
								setScript(val.target.value);
							}}
						>
							{guild.scripts.map((script, scriptIndex) => (
								<option key={script + "-" + scriptIndex} value={script}>
									{script.trigger.name}
								</option>
							))}
						</select>
						<label> Script</label>
					</div>

					<ModifyTrigger />

					<ModifyData />

					<ModifyAction />

					<div className="text-center">
						<button
							className="bg-[#ecf0f3] text-red-500 rounded-2xl p-2"
							onClick={() => deleteScript(scriptIndex)}
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
