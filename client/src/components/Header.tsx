import Head from "next/head";
import { ReactElement } from "react";
import { useRouter } from "next/router";

export function HeaderLayout({ children }: { children: ReactElement }) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>The Blockchain Adapter</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<button onClick={() => router.push(`/`)}>
				<div>
					<img src={"profilePicture.png"} width="100px" height="100px" />
					<h1>The Blockchain Adapter</h1>
				</div>
			</button>
			<button onClick={() => router.push(`/dashboard`)}>Dashboard</button>
			<button onClick={() => router.push(`/docs`)}>Docs</button>

			<>{children}</>
		</>
	);
}
