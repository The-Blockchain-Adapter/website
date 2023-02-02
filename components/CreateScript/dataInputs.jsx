import { useFieldArray } from "react-hook-form";

export const NestedInputs = ({ nestIndex, control, register, errors }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `data[${nestIndex}].inputs`,
	});

	return (
		<div>
			{fields.map((field, index) => (
				<div key={field.id}>
					<div className="flex justify-between items-center mt-2">
						<label>Input {index + 1} value:</label>
						<div
							onClick={() => remove(index)}
							className="mx-3 cursor-pointer font-bold"
						>
							X
						</div>
						<input
							className="rounded-lg"
							{...register(`data.${nestIndex}.inputs.${index}.value`, {
								required: "Input value is required",
								maxLength: {
									value: 500,
									message: "Maximum input text length is 500",
								},
							})}
						/>
					</div>
					<p>{errors.data?.[nestIndex]?.inputs?.[index]?.value?.message}</p>
				</div>
			))}

			{fields.length < 10 && (
				<div className="text-center mt-3">
					<button
						type="button"
						className="bg-[#7289da]"
						onClick={() => append({ value: "" })}
					>
						+ Input
					</button>
				</div>
			)}
		</div>
	);
};
