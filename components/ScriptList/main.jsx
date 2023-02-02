import { ShowTrigger } from "./trigger";
import { ShowData } from "./data";
import { ShowAction } from "./action";

export const ScriptList = ({ guild }) => {
	return (
		<main>
			{guild.scripts.length == 0 && (
				<div>
					<h2>You don't have any scripts yet.</h2>
					<h2>Try creating one!</h2>
				</div>
			)}
			{guild.scripts.map((script, scriptIndex) => (
				<div
					key={script.id + "-" + scriptIndex}
					className="text-start bg-gray-300 w-fit m-auto p-3 rounded-3xl shadow-md shadow-gray-400 my-6"
				>
					<h3 className="text-center">
						Script {scriptIndex + 1}: {script.trigger.name}
					</h3>

					<ShowTrigger script={script} scriptIndex={scriptIndex} />

					<ShowData script={script} scriptIndex={scriptIndex} />

					<ShowAction script={script} scriptIndex={scriptIndex} />
				</div>
			))}
		</main>
	);
};
