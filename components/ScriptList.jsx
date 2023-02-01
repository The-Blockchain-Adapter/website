export const ScriptList = ({ guild }) => {
	//Handle a script deletion
	const deleteScript = async (index) => {
		try {
			fetch("/api/deleteScript", {
				method: "POST",
				body: JSON.stringify({
					index,
					discordId: guild.discordId,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					if (data.msg) {
						window.location.reload(false);
					}
				});
		} catch {
			(err) => {
				console.log("Server error...");
			};
		}
	};

	return (
		<main>
			{guild.scripts.length == 0 && (
				<div>
					<h2>You don't have any scripts yet.</h2>
					<h2>Try creating one!</h2>
				</div>
			)}
			{guild.scripts.map((script, index) => {
				return (
					<div className="text-start bg-gray-300 w-fit m-auto p-3 rounded-3xl shadow-md shadow-gray-400 my-6">
						<h3 className="text-center">
							Script {index + 1}: {script.trigger.name}
						</h3>
						<div className="mb-2">
							<h4 className="text-center">Trigger:</h4>
							{script.trigger.type == "command" && (
								<div>
									<p>
										<span className="font-bold">Type: </span>Discord slash
										command
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
											{script.trigger.inputs.map((input, index) => {
												return (
													<div>
														<p>
															<span className="font-bold">
																Input{" "}
																{String.fromCharCode(65 + index)}{" "}
																text:{" "}
															</span>
															{input}
														</p>
													</div>
												);
											})}
										</div>
									)}
								</div>
							)}
						</div>

						{script.data.map((data, index) => {
							return (
								<div className="mb-2">
									<h4 className="text-center">
										Data{" "}
										{script.trigger.inputs
											? String.fromCharCode(
													65 + index + script.trigger?.inputs?.length
											  )
											: String.fromCharCode(65 + index)}
										:
									</h4>
									{data.type == "view" && (
										<div>
											<p>
												<span className="font-bold">Type: </span>
												Smart-Contract view function
											</p>
											<p>
												<span className="font-bold">Function name: </span>
												{data.name}
											</p>
											<p>
												<span className="font-bold">Address: </span>
												{data.address}
											</p>
											<p>
												<span className="font-bold">Blockchain: </span>
												{data.blockchain}
											</p>
											{data.inputs?.length > 0 && (
												<div>
													{data.inputs.map((input, index) => {
														return (
															<div>
																<p>
																	<span className="font-bold">
																		Input {index + 1} value:{" "}
																	</span>
																	{input}
																</p>
															</div>
														);
													})}
												</div>
											)}
										</div>
									)}

									{data.type == "balance" && (
										<div>
											<p>
												<span className="font-bold">Type: </span>
												Get a user balance
											</p>
											<p>
												<span className="font-bold">User address: </span>
												{data.address}
											</p>
											<p>
												<span className="font-bold">Blockchain: </span>
												{data.blockchain}
											</p>
										</div>
									)}

									{data.type == "api" && (
										<div>
											<p>
												<span className="font-bold">Type: </span>
												Call an API
											</p>
											<p>
												<span className="font-bold">URL: </span>
												{data.url}
											</p>
											<p>
												<span className="font-bold">Path: </span>
												{data.path}
											</p>
										</div>
									)}
								</div>
							);
						})}

						{script.action.map((action, index) => {
							return (
								<div className="mb-2">
									<h4 className="text-center">Action {index + 1}:</h4>
									{action.type == "message" && (
										<div>
											<p>
												<span className="font-bold">Type: </span>
												Bot message on discord
											</p>
											<p>
												<span className="font-bold">Message: </span>
												{action.text}
											</p>
										</div>
									)}
								</div>
							);
						})}
						<div className="text-center">
							<button
								className="bg-[#ecf0f3] text-red-500 rounded-2xl p-2"
								onClick={() => deleteScript(index)}
							>
								Delete
							</button>
						</div>
					</div>
				);
			})}
		</main>
	);
};
