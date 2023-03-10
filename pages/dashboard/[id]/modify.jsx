import { getSession } from "next-auth/react";
import { authorizeAccess } from "../../../lib/mongo/authoriseAccess";
import { GuildHeader } from "../../../components/Headers/GuildHeader";
import { ModifyScript } from "../../../components/ModifyScript/main";

export default function DashboardIDModifyPage({ session, guild }) {
	return (
		<main className="max-w-[1200px] m-auto text-center justify-center items-center">
			<GuildHeader guild={guild} />
			<ModifyScript guild={guild} />
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
