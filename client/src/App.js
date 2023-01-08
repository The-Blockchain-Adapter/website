import React, { useEffect, useState } from "react";

function App() {
	const [backendData, setBackendData] = useState(null);
	useEffect(() => {
		fetch("/api")
			.then((response) => response.json())
			.then((data) => {
				setBackendData(data);
			});
	}, []);

	return <div>{backendData ? <p>{backendData.user.username}</p> : <p>Loading...</p>}</div>;
}

export default App;
