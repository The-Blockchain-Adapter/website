import { useFieldArray } from "react-hook-form";

export const NestedInputs = ({ nestIndex, control, register, errors }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `data[${nestIndex}].inputs`,
	});

	return (
		<div>
			{fields.map((field, index) => {
				return (
					<div key={field.id}>
						<label>Input {index + 1} value</label>
						<input
							{...register(`data.${nestIndex}.inputs.${index}.value`, {
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
						<p>{errors.data?.[nestIndex]?.inputs?.[index]?.value?.message}</p>
					</div>
				);
			})}

			{fields.length < 10 && (
				<button type="button" onClick={() => append({ value: "" })}>
					+ Input
				</button>
			)}
		</div>
	);
};
