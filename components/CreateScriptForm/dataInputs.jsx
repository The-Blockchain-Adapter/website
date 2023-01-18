import { useFieldArray } from "react-hook-form";

export const NestedInputs = ({ nestIndex, control, register }) => {
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
						<input name={`test[${nestIndex}].input[${index}].value`} />
						<button onClick={() => remove(index)}>Delete Input</button>
					</div>
				);
			})}

			{fields.length < 10 && (
				<button
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
