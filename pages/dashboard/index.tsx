import { GuildItem } from "../../components/GuildItem";
import { Header } from "../../components/Header";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

// @ts-ignore
export default async function DashboardPage() {
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <p>Loading...</p>;
	}
	if (status === "unauthenticated") {
		const router = useRouter();
		router.push(`/`);
		return;
	}

	//GET ALL THE USER GUILDS
	const me = await fetch("http://discord.com/api/users/@me", {
		// @ts-ignore
		headers: { Authorization: `Bearer ${session.accessToken}` },
	}).then((res) => res.json());

	return (
		<div>
			<Header />
			<h1>Select a Guild</h1>
			{/*
				// @ts-ignore
				guilds.map((guild) => (
					<div key={guild.id} onClick={() => router.push(`/dashboard/${guild.id}`)}>
						<GuildItem guild={guild} />
					</div>
				))*/}
		</div>
	);
}
/*
export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
*/
