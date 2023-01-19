import { useFieldArray } from "react-hook-form";
import { useState } from "react";

// Get the number of modal inputs for the data fields
export let modalInputNumber = 0;

export const TriggerField = ({ control, register, errors, getValues, reset }) => {
	//Handle the modal input fields
	const {
		fields: modalInputFields,
		append: modalInputAppend,
		remove: modalInputRemove,
	} = useFieldArray({
		name: "ModalInput",
		control,
		rules: { min: 1 },
	});

	// Get the number of modal inputs for the data fields
	modalInputNumber = modalInputFields.length;

	//Show or hide some modal inputs based on theses values
	const [ScriptType, setScriptType] = useState("");
	const [IsModal, setIsModal] = useState(false);

	return (
		<div>
			<div>
				<label>Trigger type</label>
				<select
					{...register("scriptType", { required: "Script type is required" })}
					onClick={(val) => setScriptType(val.target.value)}
				>
					<option value="command">/ Command</option>
				</select>
				<p>{errors.scriptType?.message}</p>
			</div>

			{ScriptType === "command" && (
				<div>
					<div>
						<label>Command name</label>
						<input
							{...register("commandName", {
								required: "Command name is required",
								maxLength: {
									value: 30,
									message: "Maximum command name length is 30",
								},
								pattern: {
									value: /^[a-z]+$/,
									message: "Only write lower case letters without spaces",
								},
							})}
						/>
					</div>
					<p>{errors.commandName?.message}</p>
					<div>
						<label>Only for admins</label>
						<input type="checkbox" {...register("admin")} />
					</div>
					<div>
						<button onClick={() => SetModal()}>
							<span>{IsModal ? "-" : "+"}</span> Modal
						</button>
						{IsModal && (
							<div>
								<div>
									<label>Modal title</label>
									<input
										{...register("modalTitle", {
											required: "Modal title is required",
											maxLength: {
												value: 100,
												message: "Maximum modal title length is 100",
											},
										})}
									/>
								</div>
								<p>{errors.modalTitle?.message}</p>
								{modalInputFields.map((field, index) => {
									return (
										<div key={field.id}>
											<label>
												<span>
													Input {String.fromCharCode(65 + index)} Text
												</span>
												<input
													{...register(`ModalInput.${index}.text`, {
														required: "Input text is required",
														maxLength: {
															value: 100,
															message:
																"Maximum modal text length is 100",
														},
													})}
												/>
											</label>
											{index > 0 && (
												<button onClick={() => modalInputRemove(index)}>
													X
												</button>
											)}
											<p>{errors.ModalInput?.[index]?.text?.message}</p>
										</div>
									);
								})}
								{modalInputFields.length < 4 && (
									<button
										onClick={() =>
											modalInputAppend({
												text: "",
											})
										}
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
			reset({ ...getValues, ModalInput: [] });
		} else {
			modalInputAppend({
				text: "",
			});
		}
		return setIsModal(!IsModal);
	}
};
