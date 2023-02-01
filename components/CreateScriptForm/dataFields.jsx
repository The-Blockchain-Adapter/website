import { useFieldArray } from "react-hook-form";
import { useState } from "react";
import { NestedInputs } from "./dataInputs";
import { modalInputNumber } from "./triggerField";

export const DataFields = ({ control, register, errors }) => {
	const {
		fields: dataFields,
		append: dataAppend,
		remove: dataRemove,
	} = useFieldArray({
		name: "data",
		control,
	});

	const [DataTypesArray, setDataTypes] = useState([]);

	return (
		<div>
			{dataFields.map((field, index) => {
				return (
					<div
						key={field.id}
						className="text-start bg-gray-300 w-fit m-auto p-3 rounded-3xl shadow-md shadow-gray-400 mb-6"
					>
						<h3
							className="text-center underline underline-offset-2 cursor-pointer"
							onClick={() => dataRemove(index)}
						>
							Data {String.fromCharCode(65 + modalInputNumber + index)}
						</h3>
						<div className="flex justify-between items-center mt-2">
							<label>Type:</label>
							<select
								className="ml-2 rounded-lg"
								{...register(`data.${index}.type`, {
									required: "Data type is required",
								})}
								onClick={(val) =>
									setDataTypes((prev) => ({
										...prev,
										[index]: val.target.value,
									}))
								}
							>
								<option value="view">View Function</option>
								<option value="balance">Get User Balance</option>
								<option value="api">Call an API</option>
							</select>
						</div>
						<p>{errors.data?.[index]?.type?.message}</p>

						{DataTypesArray[index] === "view" && (
							<div>
								<div className="flex justify-between items-center mt-2">
									<label>Blockchain:</label>
									<select
										className="rounded-lg"
										{...register(`data.${index}.blockchain`, {
											required: "Blockchain is required",
										})}
									>
										<option value="mainnet">Ethereum</option>
										<option value="goerli">Goerli</option>
									</select>
								</div>
								<div className="flex justify-between items-center mt-2">
									<label>Function name:</label>
									<input
										className="ml-2 rounded-lg"
										{...register(`data.${index}.name`, {
											required: "Function name is required",
											maxLength: {
												value: 100,
												message: "Maximum function name length is 100",
											},
										})}
									/>
								</div>
								<p>{errors.data?.[index]?.name?.message}</p>
								<div className="flex justify-between items-center mt-2">
									<label>Address:</label>
									<input
										className="rounded-lg"
										{...register(`data.${index}.address`, {
											required: "Address is required",
											maxLength: {
												value: 42,
												message: "Maximum address length is 42",
											},
										})}
									/>
								</div>
								<p>{errors.data?.[index]?.address?.message}</p>
								<div className="flex justify-between items-center mt-2">
									<label>ABI:</label>
									<input
										className="rounded-lg"
										{...register(`data.${index}.abi`, {
											required: "ABI is required",
											maxLength: {
												value: 10000,
												message: "Maximum ABI length is 10000",
											},
										})}
									/>
								</div>
								<p>{errors.data?.[index]?.abi?.message}</p>
								<NestedInputs
									nestIndex={index}
									{...{ control, register, errors }}
								/>
							</div>
						)}

						{DataTypesArray[index] === "balance" && (
							<div>
								<div className="flex justify-between items-center mt-2">
									<label>Blockchain:</label>
									<select
										className="rounded-lg"
										{...register(`data.${index}.blockchain`, {
											required: "Blockchain is required",
										})}
									>
										<option value="mainnet">Ethereum</option>
										<option value="goerli">Goerli</option>
									</select>
								</div>
								<div className="flex justify-between items-center mt-2">
									<label>Address:</label>
									<input
										className="rounded-lg"
										{...register(`data.${index}.address`, {
											required: "Address is required",
											maxLength: {
												value: 42,
												message: "Maximum address length is 42",
											},
										})}
									/>
								</div>
								<p>{errors.data?.[index]?.address?.message}</p>
							</div>
						)}

						{DataTypesArray[index] === "api" && (
							<div>
								<div className="flex justify-between items-center mt-2">
									<label>URL:</label>
									<input
										className="ml-2 rounded-lg"
										{...register(`data.${index}.url`, {
											required: "URL is required",
											maxLength: {
												value: 100,
												message: "Maximum URL length is 100",
											},
										})}
									/>
								</div>
								<p>{errors.data?.[index]?.url?.message}</p>
								<div className="flex justify-between items-center mt-2">
									<label>Path:</label>
									<input
										className="ml-2 rounded-lg"
										{...register(`data.${index}.path`, {
											maxLength: {
												value: 100,
												message: "Maximum path length is 100",
											},
										})}
									/>
								</div>
								<p>{errors.data?.[index]?.path?.message}</p>
							</div>
						)}
					</div>
				);
			})}
			{dataFields.length < 10 && (
				<button
					type="button"
					className="bg-[#7289da] mb-6"
					onClick={() =>
						dataAppend({
							type: "",
						})
					}
				>
					<h4>+ Data</h4>
				</button>
			)}
		</div>
	);
};
