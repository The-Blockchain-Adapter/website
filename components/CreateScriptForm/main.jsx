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

	const {
		fields: modalInputFields,
		append: modalInputAppend,
		remove: modalInputRemove,
	} = useFieldArray({
		name: "ModalInput",
		control,
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
				IsModal,
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

	return (
		<form onSubmit={handleSubmit(() => {})}>
			<div>
				<label>Trigger type</label>
				<select
					{...register("scriptType")}
					onClick={(val) => setScriptType(val.target.value)}
				>
					<option value="command">/ Command</option>
				</select>
			</div>

			{ScriptType === "command" && (
				<div>
					<div>
						<label>Command name</label>
						<input {...register("commandName")} />
					</div>
					<div>
						<label>Only for admins</label>
						<input type="checkbox" {...register("admin")} />
					</div>
					<div>
						<button onClick={() => SetModal()}>
							<span>{IsModal ? "-" : "+"}</span> Modal on Discord
						</button>
						{IsModal && (
							<div>
								<div>
									<label>Modal title</label>
									<input {...register("modalTitle")} />
								</div>
								{modalInputFields.map((field, index) => {
									return (
										<div key={field.id}>
											<label>
												<span>
													Input {String.fromCharCode(65 + index)} Text
												</span>
												<input {...register(`ModalInput.${index}.text`)} />
											</label>
											<button onClick={() => modalInputRemove(index)}>
												delete
											</button>
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

			<DataFields {...{ control, register, modalInputFields }} />

			<ActionFields {...{ control, register }} />

			<button onClick={handleSubmit(onSubmit)}>Create the Script</button>
		</form>
	);

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
