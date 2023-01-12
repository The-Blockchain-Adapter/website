import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { authorizeAccess } from "../../../lib/mongo/authoriseAccess";
import { GuildHeader } from "../../../components/GuildHeader";

export default function DashboardIDCreatePage({ session, guild }) {
	return (
		<div>
			{<GuildHeader guild={guild} />}
			<p>editeur de code très simple style scratch fixe</p>
		</div>
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
