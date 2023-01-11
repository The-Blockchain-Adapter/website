import { GuildItem } from "../../components/GuildItem";
import { getSession } from "next-auth/react";

// @ts-ignore
export default function DashboardPage() {
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

	const userGuilds = await fetch("http://discord.com/api/users/@me/guilds", {
		// @ts-ignore
		headers: { Authorization: `Bearer ${session.accessToken}` },
	}).then((res) => res.json());

	//trier pour ne retourner que les guilds a afficher
	const adminUserGuilds = userGuilds.filter(
		// @ts-ignore
		({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
	);

	console.log(adminUserGuilds);

	/*
	const botGuilds = await fetch("http://discord.com/api/v9/users/@me/guilds", {
		// @ts-ignore
		headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
	}).then((res) => res.json());
	console.log(botGuilds);


	

	// @ts-ignore
	const mutualAdminGuilds = adminUserGuilds.filter((guild) =>
		botGuilds.some((botGuild) => botGuild.id === guild.id)
	);
*/
	return {
		props: { adminUserGuilds },
	};
}
