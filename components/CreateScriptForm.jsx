import { useForm } from "react-hook-form";
import { useState } from "react";

export function CreateScriptForm({ session, guild }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [ScriptType, setScriptType] = useState("");

	const [IsModal, setIsModal] = useState(false);
	const [ModalInputsLettersArray, setModalInputs] = useState([]);

	const [DataNumbersArray, setDataNumbers] = useState([]);
	const [DataTypesArray, setDataTypes] = useState([]);
	const [DataInputsArray, setDataInputs] = useState([[]]);

	const [ActionNumbersArray, setActionNumbers] = useState([""]);
	const [ActionTypesArray, setActionTypes] = useState([""]);

	const onSubmit = (data) => {
		console.log("FORM SUBMITTED");
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Trigger type</label>
				<select
					{...register("scriptType")}
					onClick={(val) => setScriptType(val.target.value)}
				>
					<option value="">. . .</option>
					<option value="command">/ Command</option>
				</select>
			</div>

			{ScriptType === "command" && (
				<div>
					<div>
						<label>Command name</label>
						<input {...register("commandName")} />
					</div>
					<div>
						<label>Only for admins</label>
						<input type="checkbox" {...register("admin")} />
					</div>
					<div>
						<button onClick={() => SetModal()}>
							<span>{IsModal ? "-" : "+"}</span> Modal on Discord
						</button>
						{IsModal && (
							<div>
								<div>
									<label>Modal title</label>
									<input {...register("modalTitle")} />
								</div>
								{ModalInputsLettersArray.map((letter) => (
									<div key={letter}>
										<label>Input {letter} Name</label>
										<input {...register(`modalInput${letter}Name`)} />
									</div>
								))}
								{ModalInputsLettersArray.length < 4 && (
									<button onClick={() => SetLettersArray(true)}>+ Input</button>
								)}
								{ModalInputsLettersArray.length > 1 && (
									<button onClick={() => SetLettersArray(false)}>- Input</button>
								)}
							</div>
						)}
					</div>
				</div>
			)}

			<div>
				{DataNumbersArray.map((number) => (
					<div key={number}>
						<div>
							<label>Data type</label>
							<select
								{...register(`dataType${number}`)}
								onClick={(val) =>
									setDataTypes((prev) => ({
										...prev,
										[number]: val.target.value,
									}))
								}
							>
								<option value="">. . .</option>
								<option value="view">View Function</option>
							</select>
						</div>
						{DataTypesArray[number] === "view" && (
							<div>
								<div>
									<label>Function Name</label>
									<input {...register(`dataInput${number}Name`)} />
								</div>
								<div>
									<label>Address</label>
									<input {...register(`dataInput${number}Address`)} />
								</div>
								<div>
									<label>Blockchain</label>
									<input {...register(`dataInput${number}Blockchain`)} />
								</div>
								<div>
									<label>ABI</label>
									<input {...register(`dataInput${number}ABI`)} />
								</div>
								{DataInputsArray[number].map((input) => (
									<div key={input}>
										<label>Input {input + 1} value</label>
										<input {...register(`dataInput${number}Input${input}`)} />
									</div>
								))}
								<button onClick={() => SetDataInputArray(true, number)}>
									+ Input
								</button>
								{DataInputsArray[number].length > 0 && (
									<button onClick={() => SetDataInputArray(false, number)}>
										- Input
									</button>
								)}
								<p>
									Output:{" "}
									{String.fromCharCode(
										65 + ModalInputsLettersArray.length + number
									)}
								</p>
							</div>
						)}
					</div>
				))}
				<button onClick={() => SetDataArray(true)}>+ Data input</button>
				{DataNumbersArray.length > 0 && (
					<button onClick={() => SetDataArray(false)}>- Data input</button>
				)}
			</div>

			<div>
				{ActionNumbersArray.map((number) => (
					<div key={number}>
						<div>
							<label>Action type</label>
							<select
								{...register(`dataType${number}`)}
								onClick={(val) =>
									setActionTypes((prev) => ({
										...prev,
										[number]: val.target.value,
									}))
								}
							>
								<option value="">. . .</option>
								<option value="message">Discord message</option>
							</select>
						</div>
						{ActionTypesArray[number] === "message" && (
							<div>
								<label>Text</label>
								<input {...register(`Action${number}Text`)} />
							</div>
						)}
					</div>
				))}
				<button onClick={() => SetActionArray(true)}>+ Action</button>
				{ActionNumbersArray.length > 1 && (
					<button onClick={() => SetActionArray(false)}>- Action</button>
				)}
			</div>

			<button>
				<input type="submit" />
			</button>
		</form>
	);

	function SetModal() {
		if (IsModal) {
			setModalInputs([]);
		} else {
			setModalInputs(["A"]);
		}
		return setIsModal(!IsModal);
	}

	function SetLettersArray(add) {
		let array = ModalInputsLettersArray;
		const length = array.length;

		if (add && length < 4) {
			array.push(String.fromCharCode(65 + length));
		} else if (!add && length > 1) {
			array.pop();
		}
		return setModalInputs(array);
	}

	function SetDataArray(add) {
		let array = DataNumbersArray;
		let inputsArray = DataInputsArray;
		const length = array.length;

		if (add) {
			array.push(length);
			inputsArray.push([]);
		} else if (length > 0) {
			array.pop();
			inputsArray.pop();
		}
		setDataInputs(inputsArray);
		return setDataNumbers(array);
	}

	function SetDataInputArray(add, number) {
		let array = DataInputsArray;
		const length = array[number].length;

		if (add) {
			array[number].push(length);
		} else if (length > 0) {
			array[number].pop();
		}
		return setDataInputs(array);
	}

	function SetActionArray(add) {
		let array = ActionNumbersArray;
		const length = array.length;

		if (add) {
			array.push(length);
		} else if (length > 1) {
			array.pop();
		}
		return setActionNumbers(array);
	}
}
