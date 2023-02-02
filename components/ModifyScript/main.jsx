import React, { useState } from "react";
import { ModifyTrigger } from "./trigger";
import { ModifyData } from "./data";
import { ModifyAction } from "./action";
import { useForm } from "react-hook-form";

export const ModifyScript = ({ guild }) => {
	const [Script, setScript] = useState(guild.scripts[0]);

	console.log(Script);

	//React hook form stuff
	const {
		register,
		reset,
		handleSubmit,
		getValues,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			trigger: Script.trigger,
			data: Script.data,
			action: Script.action,
		},
	});

	//Handle the form submit
	const onSubmit = async (script, scriptIndex) => {
		console.log(script);

		/*
		//Delete the script from the database
		await deleteScript(scriptIndex);

		fetch("/api/submit", {
			method: "POST",
			body: JSON.stringify({
				...script,
				discordId: guild.discordId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {

			});*/
	};

	// If the user wants to see the errors on the console after submitting form
	const onError = (errors) => {
		console.log("ERRORS: ", errors);
	};

	/*
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

	<div className="text-center">
						<button
							className="bg-[#ecf0f3] text-red-500 rounded-2xl p-2"
							onClick={() => deleteScript(scriptIndex)}
						>
							Delete
						</button>
					</div>


					
						<ModifyData {...{ control, register, errors, Script }} />

						<ModifyAction {...{ control, register, errors, Script }} />
*/

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
								arrangeInputs(val.target.value);
								window.location.reload(false);
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

					{Script && (
						<form
							onSubmit={(e) =>
								handleSubmit(
									onSubmit,
									onError
								)(e).catch((e) => {
									console.log("Server error...");
								})
							}
						>
							<ModifyTrigger
								{...{ control, register, errors, getValues, reset, Script }}
							/>

							<button className="mb-6">
								<h4>
									<input type="submit" /> your script
								</h4>
							</button>
						</form>
					)}
				</div>
			)}
		</div>
	);

	function arrangeInputs(script) {
		// Convert the modal inputs as an object with the text as key
		if (script.trigger.inputs?.length > 0) {
			let inputs = [];
			for (let i = 0; i < script.trigger.inputs?.length; i++) {
				inputs[i].text = script.trigger.inputs[i];
			}
			script.trigger.inputs = inputs;
		}

		// Convert the data inputs as an object with the value as key
		for (let i = 0; i < script.data?.length; i++) {
			if (script.data[i].inputs?.length > 0) {
				let inputs = [];
				for (let j = 0; j < script.data[i].inputs?.length; j++) {
					inputs[i].value = script.data[i].inputs[j];
				}
				script.data[i].inputs = inputs;
			}
		}

		return setScript(script);
	}
};
