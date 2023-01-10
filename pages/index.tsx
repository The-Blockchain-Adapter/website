import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
	const { data: session } = useSession();

	return (
		<>
			{session && (
				<>
					<h1>HOME</h1>
					<button onClick={() => signOut()}>
						<p>sign out {session.user?.name}</p>
					</button>
				</>
			)}
			{!session && (
				<>
					<h1>HOME</h1>
					<button onClick={() => signIn()}>
						<p>sign in</p>
					</button>
				</>
			)}
		</>
	);
};

export default Home;
