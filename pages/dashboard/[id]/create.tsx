import { Header } from "../../../components/Header";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { GuildHeader } from "../../../components/GuildHeader";

//@ts-ignore
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

	return (
		<div>
			<Header />
			{/*
			<GuildHeader guild={guild} />
			*/}
			<p>editeur de code très simple style scratch fixe</p>
		</div>
	);
}
