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

	//SAVE THE DATA
	const onSubmit = (data) => {
		console.log("FORM SUBMITTED");
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Script type</label>
				<select {...register("scriptType")} {...(val) => setScriptType(val.target.value)}>
					<option value="command">command</option>
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
							Show a Modal on Discord
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
				</>
			)}
			<button>
				<input type="submit" />
			</button>
		</form>
	);

	function SetLettersArray(add) {
		const Letters = ["A", "B", "C", "D"];
		const length = ModalInputsLettersArray.length;
		let array = ModalInputsLettersArray;

		if (add && length < 4) {
			array.push(Letters[length]);
		} else if (!add && length > 1) {
			array.pop();
		}
		return setModalInputs(array);
	}
}
