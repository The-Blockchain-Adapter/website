import { useSession, getSession, signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export default function Secret(req: NextRequest, res: NextResponse) {
	//verify that the user is signed in
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <p>Loading...</p>;
	}
	if (status === "unauthenticated") {
		return (
			<>
				<button onClick={() => signIn()}>Sign in to access this page</button>
			</>
		);
	}

	return (
		<>
			<h1>Protected Page</h1>
			<p>You can view this page because you are signed in.</p>
		</>
	);
}
