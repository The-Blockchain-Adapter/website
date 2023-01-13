import { GuildItem } from "../../components/GuildItem";
import { useRouter } from "next/router";
import { getUserGuilds } from "../../lib/mongo/getUserGuilds";
import { createOrUpdateUser } from "../../lib/mongo/createOrUpdateUser";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage({ session, guilds }) {
	const router = useRouter();
	return (
		<main className="max-w-[1200px] m-auto text-center justify-center items-center">
			{guilds.length === 0 ? (
				<div className="m-10">
					<h2>You are not registered on any guild...</h2>
					<div className="mt-3">
						<p>You need to be admin of your guild.</p>
						<p>The bot has to be inside the guild.</p>
						<p>And you need to type the /init command in a channel.</p>
						<p>Otherwise, try to refresh the page or to connect again with discord.</p>
						<p>
							Please check the{" "}
							<span className="text-blue-500 underline">
								<Link href="/docs">documentation</Link>
							</span>{" "}
							for more informations.
						</p>
					</div>
				</div>
			) : (
				<div className="m-10">
					<h2>Select a Guild:</h2>
					{guilds.map((guild) => (
						<div key={guild.id} onClick={() => router.push(`/dashboard/${guild.id}`)}>
							<GuildItem guild={guild} />
						</div>
					))}
				</div>
			)}
		</main>
	);
}

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

	//Update the user on the database
	await createOrUpdateUser(session, guilds);

	return {
		props: { session, guilds },
	};
}
