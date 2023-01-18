import { useFieldArray } from "react-hook-form";
import { useState } from "react";
import { NestedInputs } from "./dataInputs";

export const DataFields = ({ control, register, modalInputFields }) => {
	const {
		fields: dataFields,
		append: dataAppend,
		remove: dataRemove,
	} = useFieldArray({
		name: "Data",
		control,
	});

	const [DataTypesArray, setDataTypes] = useState([]);

	return (
		<div>
			{dataFields.map((field, index) => {
				return (
					<div key={field.id}>
						<label>
							<span>Data type</span>
							<select
								{...register(`Data.${index}.type`)}
								onClick={(val) =>
									setDataTypes((prev) => ({
										...prev,
										[index]: val.target.value,
									}))
								}
							>
								<option value="view">View Function</option>
							</select>
						</label>
						<button onClick={() => dataRemove(index)}>Delete</button>

						{DataTypesArray[index] === "view" && (
							<div>
								<div>
									<label>Function Name</label>
									<input {...register(`Data.${index}.name`)} />
								</div>
								<div>
									<label>Address</label>
									<input {...register(`Data.${index}.address`)} />
								</div>
								<div>
									<label>Blockchain</label>
									<input {...register(`Data.${index}.blockchain`)} />
								</div>
								<div>
									<label>ABI</label>
									<input {...register(`Data.${index}.ABI`)} />
								</div>
								<NestedInputs nestIndex={index} {...{ control, register }} />
								<p>
									Output:{" "}
									{String.fromCharCode(65 + modalInputFields.length + index)}
								</p>
							</div>
						)}
					</div>
				);
			})}
			{dataFields.length < 10 && (
				<button
					onClick={() =>
						dataAppend({
							type: "",
						})
					}
				>
					+ Data output
				</button>
			)}
		</div>
	);
};
