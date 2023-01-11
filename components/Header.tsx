import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export function Header() {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div>
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
			{session && (
				<button onClick={() => signOut()}>
					{session.user?.image && (
						<img src={session.user.image} width="50px" height="50px" />
					)}
					{!session.user?.image && <FaSignOutAlt size={30} />}
				</button>
			)}
			{!session && (
				<button onClick={() => signIn()}>
					<FaSignInAlt size={30} />
				</button>
			)}
		</div>
	);
}
