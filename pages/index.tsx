import { signIn, signOut, useSession } from "next-auth/react";
import { Header } from "../components/Header";

export default function Home() {
	const { data: session } = useSession();

	return (
		<>
			<Header />
			<div>
				{session && (
					<button onClick={() => signOut()}>
						<p>sign out {session.user?.name}</p>
					</button>
				)}
				{!session && (
					<button onClick={() => signIn()}>
						<p>sign in</p>
					</button>
				)}
			</div>
		</>
	);
}
