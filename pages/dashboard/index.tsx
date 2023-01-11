import { GuildItem } from "../../components/GuildItem";
import { Header } from "../../components/Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// @ts-ignore
export default function DashboardPage({ guilds }) {
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
