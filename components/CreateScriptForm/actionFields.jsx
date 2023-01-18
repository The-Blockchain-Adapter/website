import { useFieldArray } from "react-hook-form";
import { useState } from "react";

export const ActionFields = ({ control, register }) => {
	const {
		fields: actionFields,
		append: actionAppend,
		remove: actionRemove,
	} = useFieldArray({
		name: "Action",
		control,
	});

	const [ActionTypesArray, setActionTypes] = useState([""]);

	return (
		<div>
			{actionFields.map((field, index) => {
				return (
					<div key={field.id}>
						<label>
							<span>Action type</span>
							<select
								{...register(`Action.${index}.type`)}
								onClick={(val) =>
									setActionTypes((prev) => ({
										...prev,
										[index]: val.target.value,
									}))
								}
							>
								<option value="message">Discord message</option>
							</select>
						</label>
						<button onClick={() => actionRemove(index)}>Delete</button>

						{ActionTypesArray[index] === "message" && (
							<div>
								<div>
									<label>Text</label>
									<input {...register(`Action.${index}.text`)} />
								</div>
							</div>
						)}
					</div>
				);
			})}

			{actionFields.length < 10 && (
				<button
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
