import { ShowDataInputs } from "./dataInputs.jsx";

export const ShowData = ({ script, scriptIndex }) => {
	return (
		<div>
			{script.data.map((data, dataIndex) => (
				<div
					className="mb-2"
					key={script.id + "-" + scriptIndex + "-" + data.id + "-" + dataIndex}
				>
					<h4 className="text-center">
						Data{" "}
						{script.trigger.inputs
							? String.fromCharCode(65 + dataIndex + script.trigger?.inputs?.length)
							: String.fromCharCode(65 + dataIndex)}
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
								<ShowDataInputs
									script={script}
									scriptIndex={scriptIndex}
									data={data}
									dataIndex={dataIndex}
								/>
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

					{data.type == "guild" && (
						<div>
							<p>
								<span className="font-bold">Type: </span>
								Get your guild data
							</p>
							<p>
								<span className="font-bold">Path: </span>
								{data.path}
							</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
