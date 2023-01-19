import { useForm } from "react-hook-form";
import { TriggerField } from "./triggerField";
import { DataFields } from "./dataFields";
import { ActionFields } from "./actionFields";

export function CreateScriptForm({ guild }) {
	//React hook form stuff to handle the form data and errors
	const {
		register,
		reset,
		handleSubmit,
		getValues,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			trigger: { type: "" },
			action: [{ type: "" }],
		},
	});

	//Handle the form submit
	const onSubmit = async (data) => {
		fetch("/api/submit", {
			method: "POST",
			body: JSON.stringify({
				...data,
				discordId: guild.discordId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// ---------------------------------------- Handle data ----------------------------------------
			});
	};

	// If the user wants to see the errors on the console after submitting form
	const onError = (errors) => {
		console.log("ERRORS: ", errors);
	};

	//Main form component
	return (
		<form
			onSubmit={(e) =>
				handleSubmit(
					onSubmit,
					onError
				)(e).catch((e) => {
					console.log("e", e);
				})
			}
		>
			<TriggerField {...{ control, register, errors, getValues, reset }} />

			<DataFields {...{ control, register, errors }} />

			<ActionFields {...{ control, register, errors }} />
			<button>
				<input type="submit" />
			</button>
		</form>
	);
}
// Create the Script</input>
