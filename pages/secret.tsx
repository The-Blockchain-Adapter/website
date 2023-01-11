import { useSession, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Secret() {
	//verify that the user is signed in
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <p>Loading...</p>;
	}
	if (status === "unauthenticated") {
		const router = useRouter();
		router.push(`/`);
		return;
	}

	return (
		<>
			<h1>Protected Page</h1>
			<p>You can view this page because you are signed in.</p>
		</>
	);
}
