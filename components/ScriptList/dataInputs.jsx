export const ShowDataInputs = ({ script, scriptIndex, data, dataIndex }) => {
	return (
		<div>
			{data.inputs.map((input, inputIndex) => (
				<div
					key={
						script.id +
						"-" +
						scriptIndex +
						"-" +
						data.id +
						"-" +
						dataIndex +
						"-" +
						input.id +
						"-" +
						inputIndex
					}
				>
					<p>
						<span className="font-bold">Input {inputIndex + 1} value: </span>
						{input}
					</p>
				</div>
			))}
		</div>
	);
};
