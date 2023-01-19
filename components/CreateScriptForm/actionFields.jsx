import { useFieldArray } from "react-hook-form";
import { useState } from "react";

export const ActionFields = ({ control, register, errors }) => {
	const {
		fields: actionFields,
		append: actionAppend,
		remove: actionRemove,
	} = useFieldArray({
		name: "Action",
		control,
		rules: { min: 1 },
	});

	const [ActionTypesArray, setActionTypes] = useState([""]);

	return (
		<div>
			{actionFields.map((field, index) => {
				return (
					<div key={field.id}>
						<label>Action type</label>
						<select
							{...register(`Action.${index}.type`, {
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

						{index > 0 && (
							<button type="button" onClick={() => actionRemove(index)}>
								X
							</button>
						)}
						<p>{errors.Action?.[index]?.type?.message}</p>

						{ActionTypesArray[index] === "message" && (
							<div>
								<label>Text</label>
								<input
									{...register(`Action.${index}.text`, {
										required: "Text is required",
										maxLength: {
											value: 500,
											message: "Maximum function name length is 500",
										},
									})}
								/>
								<p>{errors.Action?.[index]?.text?.message}</p>
							</div>
						)}
					</div>
				);
			})}

			{actionFields.length < 10 && (
				<button
					type="button"
					onClick={() =>
						actionAppend({
							type: "",
						})
					}
				>
					+ Action
				</button>
			)}
		</div>
	);
};
