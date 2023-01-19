import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { DataFields } from "./dataFields";
import { ActionFields } from "./actionFields";

export function CreateScriptForm({ session, guild }) {
	//React hook form stuff to handle the form data and errors
	const {
		register,
		reset,
		handleSubmit,
		getValues,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			scriptType: "",
			Action: [{ type: "" }],
		},
	});

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

	//Show or hide some modal inputs based on theses values
	const [ScriptType, setScriptType] = useState("");
	const [IsModal, setIsModal] = useState(false);

	//Handle the form submit
	const onSubmit = async (data) => {
		fetch("/api/submit", {
			method: "POST",
			body: JSON.stringify({
				...data,
				guildId: guild.guildId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// ---------------------------------------- Handle data ----------------------------------------
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	// If the user wants to see the errors on the console after submitting form
	const onError = (errors) => {
		console.log("ERRORS: ", errors);
	};

	//Main form component
	return (
		<form onSubmit={handleSubmit(() => {})}>
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

			<DataFields {...{ control, register, errors, modalInputFields }} />

			<ActionFields {...{ control, register, errors }} />

			<button
				onClick={(e) =>
					handleSubmit(
						onSubmit,
						onError
					)(e).catch((e) => {
						console.log("e", e);
					})
				}
			>
				Create the Script
			</button>
		</form>
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
}
