import { getSession } from "next-auth/react";
import { authorizeAccess } from "../../../lib/mongo/authoriseAccess";
import { GuildHeader } from "../../../components/GuildHeader";

export default function DashboardIDCreatePage({ session, guild }) {
	return (
		<main className="max-w-[1200px] m-auto text-center justify-center items-center">
			{<GuildHeader guild={guild} />}
			<p className="my-5">Editeur de code très simple style scratch fixe.</p>
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

	// Check if the user is allowed to see this guild
	const brutGuild = await authorizeAccess(session, context);
	if (!brutGuild) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	//Transform the guild object so it doesn't show an error because of the _id component
	const guild = JSON.parse(JSON.stringify(brutGuild));

	return {
		props: { session, guild },
	};
}
