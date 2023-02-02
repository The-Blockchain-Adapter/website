import { useRouter } from "next/router";
import { getUserGuilds } from "../../lib/mongo/getUserGuilds";
import { createOrUpdateUser } from "../../lib/mongo/createOrUpdateUser";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SiDiscord } from "react-icons/si";

export default function DashboardPage({ session, guilds }) {
	function getSource(guild) {
		if (guild.icon !== null) {
			return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
		} else {
			return "/default_guild_icon.png";
		}
	}

	if (guilds === "error") {
		return (
			<main className="max-w-[1200px] m-auto text-center justify-center items-center">
				<div className="m-10">
					<h2>Your session has expired. Please login again.</h2>

					<button
						className="duration-300 mt-5 "
						onClick={() =>
							signIn("discord", { redirect: true, callbackUrl: "/dashboard" })
						}
					>
						<div className="text-center justify-center items-center flex">
							<SiDiscord size={30} className="mr-2" />
							Login again with Discord
						</div>
					</button>
				</div>
			</main>
		);
	}

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
							<div className="cursor-pointer shadow-md shadow-gray-400 w-fit rounded-full p-4 my-7 bg-gray-300 flex items-center justify-center m-auto hover:scale-105 ease-in duration-300">
								<img
									className="rounded-full mr-3 shadow-md shadow-gray-400"
									src={getSource(guild)}
									height={55}
									width={55}
								/>
								<h4>{guild.name}</h4>
							</div>
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
	if (guilds === null) {
		return {
			props: { session, guilds: "error" },
		};
	}

	//Update the user on the database
	await createOrUpdateUser(session, guilds);

	return {
		props: { session, guilds },
	};
}
