import { useFieldArray } from "react-hook-form";
import { useState } from "react";

// Get the number of modal inputs for the data fields
export let modalInputNumber = 0;

export const TriggerField = ({ control, register, errors, getValues, reset, guild }) => {
	//Handle the modal input fields
	const {
		fields: modalInputFields,
		append: modalInputAppend,
		remove: modalInputRemove,
	} = useFieldArray({
		name: "trigger.modalInputs",
		control,
		rules: { min: 1 },
	});

	// Get the number of modal inputs for the data fields
	modalInputNumber = modalInputFields.length;

	//Show or hide some modal inputs based on theses values
	const [TriggerType, setTriggerType] = useState("");
	const [IsModal, setIsModal] = useState(false);

	return (
		<div className="text-start bg-gray-300 w-fit m-auto p-3 rounded-3xl shadow-lg shadow-gray-400">
			<div className="flex justify-between">
				<label>Trigger type:</label>
				<select
					{...register("trigger.type", { required: "Trigger type is required" })}
					onClick={(val) => setTriggerType(val.target.value)}
				>
					<option value="command">/ Command</option>
				</select>
			</div>
			<p>{errors.trigger?.type?.message}</p>

			{TriggerType === "command" && (
				<div>
					<div className="flex justify-between">
						<label>Command name</label>
						<input
							{...register("trigger.name", {
								required: "Command name is required",
								maxLength: {
									value: 30,
									message: "Maximum command name length is 30",
								},
								pattern: {
									value: /^[a-z]+$/,
									message: "Only write lower case letters without spaces",
								},
								validate: {
									unique: (value) =>
										IsDifferentCommandName(value) ||
										"This command name is already taken",
								},
							})}
						/>
					</div>
					<p>{errors.trigger?.name?.message}</p>
					<div className="flex justify-between">
						<label>Only for admins</label>
						<input type="checkbox" {...register("trigger.onlyAdmin")} />
					</div>
					<div>
						<button type="button" onClick={() => SetModal()}>
							<span>{IsModal ? "-" : "+"}</span> Modal
						</button>
						{IsModal && (
							<div>
								<div>
									<label>Modal title</label>
									<input
										{...register("trigger.modalTitle", {
											required: "Modal title is required",
											maxLength: {
												value: 100,
												message: "Maximum modal title length is 100",
											},
										})}
									/>
								</div>
								<p>{errors.trigger?.modalTitle?.message}</p>
								{modalInputFields.map((field, index) => {
									return (
										<div key={field.id}>
											<label>
												Input {String.fromCharCode(65 + index)} Text
											</label>
											<input
												{...register(`trigger.modalInputs.${index}.text`, {
													required: "Input text is required",
													maxLength: {
														value: 100,
														message: "Maximum modal text length is 100",
													},
												})}
											/>
											{index > 0 && (
												<button
													type="button"
													onClick={() => modalInputRemove(index)}
												>
													X
												</button>
											)}
											<p>
												{
													errors.trigger?.modalInputs?.[index]?.test
														?.message
												}
											</p>
										</div>
									);
								})}
								{modalInputFields.length < 4 && (
									<button
										type="button"
										onClick={() => modalInputAppend({ text: "" })}
									>
										+ Input
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);

	// Show or hide the discord modal
	function SetModal() {
		if (IsModal) {
			reset({ ...getValues });
		} else {
			modalInputAppend({ text: "" });
		}
		return setIsModal(!IsModal);
	}

	// Check if the command name is already taken
	function IsDifferentCommandName(name) {
		for (let i = 0; i < guild.scripts.length; i++) {
			if (guild.scripts[i].trigger.name == name) {
				return false;
			}
		}
		return true;
	}
};
