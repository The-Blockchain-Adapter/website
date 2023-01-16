// Faire vérifier que le nom du script n'existe pas déjà
// Faire toutes les vérifications nécessaires avec les erreurs qui vont bien
import { useForm } from "react-hook-form";
import { useState } from "react";

export function CreateScriptForm({ session, guild }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [ScriptType, setScriptType] = useState("command");
	const [IsModal, setIsModal] = useState(false);
	const [ModalInputsLettersArray, setModalInputs] = useState(["A"]);
	const [DataNumbersArray, setDataNumbers] = useState([]);
	let [DataTypesArray, setDataTypes] = useState([]);

	//SAVE THE DATA
	const onSubmit = (data) => {
		console.log("FORM SUBMITTED");
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Script type</label>
				<select
					{...register("scriptType")}
					onClick={(val) => setScriptType(val.target.value)}
				>
					<option value="command">command</option>
					<option value="test">test</option>
				</select>
			</div>

			{ScriptType === "command" && (
				<>
					<div>
						<label>Command name</label>
						<input {...register("commandName")} />
					</div>
					<div>
						<label>Only for admins</label>
						<input type="checkbox" {...register("admin")} />
					</div>

					<div>
						<button onClick={() => setIsModal(!IsModal)}>
							Show a modal on Discord
						</button>
						{IsModal && (
							<>
								<div>
									<label>Modal title</label>
									<input {...register("modalTitle")} />
								</div>
								{ModalInputsLettersArray.map((letter) => (
									<div>
										<label>Input {letter} Name</label>
										<input {...register(`modalInputName${letter}`)} />
									</div>
								))}
								<button onClick={() => SetLettersArray(true)}>+ Input</button>
								<button onClick={() => SetLettersArray(false)}>- Input</button>
							</>
						)}
					</div>
					<div>
						{DataNumbersArray.map((number) => (
							<div>
								<div>
									<label>Data {number} type</label>
									<select
										{...register(`DataType${number}`)}
										onClick={(val) =>
											SetDataTypesArray(val.target.value, number)
										}
									>
										<option value="view">View Function</option>
										<option value="test">test</option>
									</select>
								</div>
								{DataTypesArray[number] === "view" && (
									<div>
										<label>Function Name</label>
										<input {...register(`dataName${number}`)} />
									</div>
								)}
								{/* {console.log(DataTypesArray[number])} */}
								{/* {console.log(number)} */}
							</div>
						))}
						<button onClick={() => SetDataArray(true)}>+ Data input</button>
						<button onClick={() => SetDataArray(false)}>- Data input</button>
					</div>
				</>
			)}
			<button>
				<input type="submit" />
			</button>
		</form>
	);

	function SetLettersArray(add) {
		const Letters = ["A", "B", "C", "D"];
		let array = ModalInputsLettersArray;
		const length = array.length;

		if (add && length < 4) {
			array.push(Letters[length]);
		} else if (!add && length > 1) {
			array.pop();
		}
		return setModalInputs(array);
	}

	function SetDataArray(add) {
		let array = DataNumbersArray;
		const length = array.length;
		let types = DataTypesArray;

		if (add) {
			array.push(length);
			types[length] = "view";
		} else if (!add && length > 0) {
			array.pop();
			types[length] = "";
		}

		setDataTypes(types);
		setDataNumbers(array);
		return;
	}

	function SetDataTypesArray(type, number) {
		// console.log("setDataTypesArray");
		console.log(type);
		console.log(number);
		let array = DataTypesArray;
		array[number] = type;
		setDataTypes(array);
		return;
	}
}
