import { useFieldArray } from "react-hook-form";
import { useState } from "react";

export const ActionFields = ({ control, register, errors }) => {
	const {
		fields: actionFields,
		append: actionAppend,
		remove: actionRemove,
	} = useFieldArray({
		name: "action",
		control,
		rules: { min: 1 },
	});

	const [ActionTypesArray, setActionTypes] = useState([""]);

	return (
		<div>
			{actionFields.map((field, index) => {
				return (
					<div
						key={field.id}
						className="text-start bg-gray-300 w-fit m-auto p-3 rounded-3xl shadow-md shadow-gray-400 mb-6"
					>
						<h3
							className="text-center underline underline-offset-2 cursor-pointer"
							onClick={() => removeAction(index)}
						>
							Action {index + 1}
						</h3>
						<div className="flex justify-between items-center mt-2">
							<label>Type:</label>
							<select
								className="ml-2 rounded-lg"
								{...register(`action.${index}.type`, {
									required: "Action type is required",
								})}
								onClick={(val) =>
									setActionTypes((prev) => ({
										...prev,
										[index]: val.target.value,
									}))
								}
							>
								<option value="message">Discord message</option>
							</select>
						</div>
						<p>{errors.action?.[index]?.type?.message}</p>

						{ActionTypesArray[index] === "message" && (
							<div>
								<div className="flex justify-between items-center mt-2">
									<label>Text:</label>
									<input
										className="ml-2 rounded-lg"
										{...register(`action.${index}.text`, {
											required: "Text is required",
											maxLength: {
												value: 500,
												message: "Maximum function name length is 500",
											},
										})}
									/>
								</div>
								<p>{errors.action?.[index]?.text?.message}</p>
							</div>
						)}
					</div>
				);
			})}

			{actionFields.length < 10 && (
				<button
					type="button"
					className="bg-[#7289da] mb-6"
					onClick={() =>
						actionAppend({
							type: "",
						})
					}
				>
					<h4>+ Action</h4>
				</button>
			)}
		</div>
	);

	// Make sure there is always at least 1 action left
	function removeAction(index) {
		if (actionFields.length < 2) return;
		return actionRemove(index);
	}
};
