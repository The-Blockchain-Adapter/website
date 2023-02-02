export const ShowTrigger = ({ script, scriptIndex }) => {
	return (
		<div className="mb-2">
			<h4 className="text-center">Trigger:</h4>
			{script.trigger.type == "command" && (
				<div>
					<p>
						<span className="font-bold">Type: </span>Discord slash command
					</p>
					<p>
						<span className="font-bold">Name: </span>
						{script.trigger.name}
					</p>
					<p>
						<span className="font-bold">For admins only: </span>
						{script.trigger.onlyAdmin.toString()}
					</p>
					{script.trigger.inputs?.length > 0 && (
						<div>
							<p>
								<span className="font-bold">Modal title: </span>
								{script.trigger.title}
							</p>
							{script.trigger.inputs.map((input, inputIndex) => (
								<div
									key={
										script.id +
										"-" +
										scriptIndex +
										"-" +
										input.id +
										"-" +
										inputIndex
									}
								>
									<p>
										<span className="font-bold">
											Input {String.fromCharCode(65 + inputIndex)} text:{" "}
										</span>
										{input}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
