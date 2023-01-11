import { GuildItem } from "../../components/GuildItem";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

// @ts-ignore
export default async function DashboardPage() {
	//GET ALL THE USER GUILDS
	return (
		<div>
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

//@ts-ignore
export async function getServerSideProps(context) {
	const session = await getSession(context);
	/*
	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	/*
	const me = await fetch("http://discord.com/api/users/@me", {
		// @ts-ignore
		headers: { Authorization: `Bearer ${session.accessToken}` },
	}).then((res) => res.json());
*/
	return {
		props: { session },
	};
}
