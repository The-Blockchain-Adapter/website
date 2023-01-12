import { GuildItem } from "../../components/GuildItem";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getUserGuilds } from "../../lib/getUserGuilds";

// @ts-ignore
export default function DashboardPage({ guilds }) {
	const router = useRouter();
	return (
		<div>
			<h1>Select a Guild</h1>
			{
				// @ts-ignore
				guilds.map((guild) => (
					<div key={guild.id} onClick={() => router.push(`/dashboard/${guild.id}`)}>
						<GuildItem guild={guild} />
					</div>
				))
			}
		</div>
	);
}

//@ts-ignore
export async function getServerSideProps(context) {
	// Check if the user is connected. Otherwise return him to the home page
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	// Get all the guilds that are registered in the database and where the user is admin
	const guilds = await getUserGuilds(session);

	return {
		props: { guilds },
	};
}
