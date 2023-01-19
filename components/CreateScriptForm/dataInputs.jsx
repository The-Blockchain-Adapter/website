import { useFieldArray } from "react-hook-form";

export const NestedInputs = ({ nestIndex, control, register, errors }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `Data[${nestIndex}].input`,
	});

	return (
		<div>
			{fields.map((field, index) => {
				return (
					<div key={field.id}>
						<label>Input {index + 1} value</label>
						<input
							{...register(`Data[${nestIndex}].input[${index}].value`, {
								required: "Input value is required",
								maxLength: {
									value: 500,
									message: "Maximum input text length is 500",
								},
							})}
						/>
						<button type="button" onClick={() => remove(index)}>
							X
						</button>
						<p>{errors.Data?.[nestIndex]?.input?.[index]?.value?.message}</p>
					</div>
				);
			})}

			{fields.length < 10 && (
				<button
					type="button"
					onClick={() =>
						append({
							input: "",
						})
					}
				>
					+ Input
				</button>
			)}
		</div>
	);
};
