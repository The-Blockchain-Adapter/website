import { useFieldArray } from "react-hook-form";
import { useState } from "react";

// Get the number of modal inputs for the data fields
export let modalInputNumber = 0;

export const ModifyTrigger = ({ control, register, errors, getValues, reset, Script }) => {
	//Handle the modal input fields
	const {
		fields: modalInputFields,
		append: modalInputAppend,
		remove: modalInputRemove,
	} = useFieldArray({
		name: "trigger.inputs",
		control,
		rules: { min: 1 },
	});

	// Get the number of modal inputs for the data fields
	modalInputNumber = modalInputFields.length;

	//Show or hide some modal inputs based on theses values
	const [TriggerType, setTriggerType] = useState();
	const [IsModal, setIsModal] = useState(Script.trigger.title ? true : false);

	return (
		<div className="text-start bg-gray-300 w-fit m-auto p-3 rounded-3xl shadow-md shadow-gray-400 mb-6">
			<h3 className="text-center underline underline-offset-2">Trigger</h3>
			<div className="flex justify-between items-center mt-2">
				<label>Type:</label>
				<select
					{...register("trigger.type", { required: "Trigger type is required" })}
					onClick={(val) => setTriggerType(val.target.value)}
					className="rounded-lg ml-2"
				>
					<option value="command">/ Command</option>
				</select>
			</div>
			<p>{errors.trigger?.type?.message}</p>

			{TriggerType === "command" && (
				<div>
					<div className="flex justify-between items-center mt-2">
						<label>Command name:</label>
						<input
							className="ml-2 rounded-lg"
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
							})}
						/>
					</div>
					<p>{errors.trigger?.name?.message}</p>
					<div className="flex justify-between items-center mt-2">
						<label>Only for admins:</label>
						<input type="checkbox" {...register("trigger.onlyAdmin")} />
					</div>
					<div className="text-center mt-2">
						<button type="button" onClick={() => SetModal()} className="bg-[#7289da]">
							<span>{IsModal ? "-" : "+"}</span> Modal
						</button>
					</div>
					{IsModal && (
						<div>
							<div className="flex justify-between items-center mt-2">
								<label>Modal title:</label>
								<input
									className="rounded-lg"
									{...register("trigger.title", {
										required: "Modal title is required",
										maxLength: {
											value: 100,
											message: "Maximum modal title length is 100",
										},
									})}
								/>
							</div>
							<p>{errors.trigger?.title?.message}</p>
							{modalInputFields.map((field, index) => (
								<div key={field.id}>
									<div className="flex justify-between items-center mt-2">
										<label>Input {String.fromCharCode(65 + index)} text:</label>
										{modalInputFields.length > 1 && (
											<div
												onClick={() => modalInputRemove(index)}
												className="cursor-pointer font-bold"
											>
												X
											</div>
										)}
										<input
											className="rounded-lg"
											{...register(`trigger.inputs.${index}.text`, {
												required: "Input text is required",
												maxLength: {
													value: 100,
													message: "Maximum modal text length is 100",
												},
											})}
										/>
									</div>
									<p>{errors.trigger?.inputs?.[index]?.text?.message}</p>
								</div>
							))}
							{modalInputFields.length < 5 && (
								<div className="text-center mt-3">
									<button
										type="button"
										onClick={() => modalInputAppend({ text: "" })}
										className="bg-[#7289da]"
									>
										+ Input
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);

	// Show or hide the discord modal
	function SetModal() {
		if (IsModal) {
			reset({ ...getValues, trigger: { ...getValues, inputs: [] } });
		} else {
			modalInputAppend({ text: "" });
		}
		return setIsModal(!IsModal);
	}
};
