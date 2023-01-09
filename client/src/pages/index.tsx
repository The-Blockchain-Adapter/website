import Head from "next/head";
import { FaDiscord } from "react-icons/fa";

export default function Home() {
	const handleLogin = () => {
		window.location.href = "http://localhost:3001/api/auth/discord";
	};

	return (
		<>
			<Head>
				<title>The Blockchain Adapter</title>
				<meta name="description" content="The Blockchain Adapter" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>Home page</h1>
				<button onClick={handleLogin}>
					<FaDiscord size={40} />
					<span>Login with Discord</span>
				</button>
			</main>
		</>
	);
}
