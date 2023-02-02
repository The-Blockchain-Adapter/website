export const ShowAction = ({ script, scriptIndex }) => {
	return (
		<div>
			{script.action.map((action, actionIndex) => (
				<div
					className="mb-2"
					key={script.id + "-" + scriptIndex + "-" + action.id + "-" + actionIndex}
				>
					<h4 className="text-center">Action {actionIndex + 1}:</h4>
					{action.type == "message" && (
						<div>
							<p>
								<span className="font-bold">Type: </span>
								Bot message on discord
							</p>
							<p>
								<span className="font-bold">Channel: </span>
								{action.channel}
							</p>
							<p>
								<span className="font-bold">Message: </span>
								{action.text}
							</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
