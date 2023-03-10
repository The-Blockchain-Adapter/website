import { useForm } from "react-hook-form";
import { TriggerField } from "./trigger";
import { DataFields } from "./data";
import { ActionFields } from "./action";
import { useState } from "react";
import { useRouter } from "next/router";

export function CreateScriptForm({ guild }) {
	const router = useRouter();

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

	const [IsSumbitted, setIsSumbitted] = useState(false);
	const [scriptName, setscriptName] = useState("");

	//Handle the form submit
	const onSubmit = async (script) => {
		fetch("/api/submit", {
			method: "POST",
			body: JSON.stringify({
				...script,
				discordId: guild.discordId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setIsSumbitted(data.msg);
				setscriptName(data.name);
			});
	};

	// If the user wants to see the errors on the console after submitting form
	const onError = (errors) => {
		console.log("ERRORS: ", errors);
	};

	//Main form component
	return (
		<div>
			{!IsSumbitted ? (
				<div>
					<h2 className="mt-5 mb-3">Create a new script:</h2>
					<form
						onSubmit={(e) =>
							handleSubmit(
								onSubmit,
								onError
							)(e).catch((e) => {
								console.log("Server error...");
							})
						}
					>
						<TriggerField {...{ control, register, errors, getValues, reset, guild }} />

						<DataFields {...{ control, register, errors }} />

						<ActionFields {...{ control, register, errors }} />

						<button className="mb-6">
							<h4>
								<input type="submit" /> your new script
							</h4>
						</button>
					</form>
				</div>
			) : (
				<div className="justify-center">
					<h2 className="mt-5 mb-3">
						Your {scriptName} script has been successfully registered!
					</h2>
					<button onClick={() => router.push(`/dashboard/${router.query.id}`)}>
						<h4>Return back home</h4>
					</button>
				</div>
			)}
		</div>
	);
}
