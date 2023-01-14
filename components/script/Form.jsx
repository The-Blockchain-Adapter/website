// Faire vérifier que le nom du script n'existe pas déjà

import { useForm } from "react-hook-form";

export function Form({ session, guild }) {
	const { register, handleSubmit } = useForm();
	const data = (data) => {
		console.log("button clicked");
	};

	return (
		<>
			<form onSubmit={handleSubmit(data)} className="flex flex-col items-center">
				<label htmlFor="scriptName">Script name:</label>
				<input
					type="text"
					name="scriptName"
					id="scriptName"
					className="border-2 border-black rounded-md p-2"
				/>

				<label htmlFor="scriptDescription">Script description:</label>
				<textarea
					name="scriptDescription"
					id="scriptDescription"
					className="border-2 border-black rounded-md p-2"
				/>
				<label htmlFor="scriptCode">Script code:</label>
				<textarea
					name="scriptCode"
					id="scriptCode"
					className="border-2 border-black rounded-md p-2"
				/>
				<button className="bg-green-500 rounded-md p-2 m-2">Create</button>
			</form>
		</>
	);
}
