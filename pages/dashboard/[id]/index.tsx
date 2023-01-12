import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GuildHeader } from "../../../components/GuildHeader";

export default function DashboardIDPage({ guild }) {
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <p>Loading...</p>;
	}
	if (status === "unauthenticated") {
		const router = useRouter();
		router.push(`/`);
		return;
	}

	// CHECK IF THE USER IS ALLOWED TO SEE THIS GUILD
	// GET THE GUILD INFOS (ICON & NAME)
	// GET ALL THE SCRIPTS OF THE GUILD

	const router = useRouter();
	return (
		<div>
			{/*
			<GuildHeader guild={guild} />
			*/}
			<button onClick={() => router.push(`/dashboard/${router.query.id}/create`)}>
				<AiFillPlusCircle size={50} />
				<p>create a new script</p>
			</button>
			<p>list of all the actual scripts in blocks</p>
		</div>
	);
}
