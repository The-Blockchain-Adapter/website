import { Header } from "../components/Header";
import { signIn, useSession } from "next-auth/react";
import { SiDiscord } from "react-icons/si";

export default function Home() {
	const { data: session } = useSession();
	return (
		<>
			<Header />
			{!session && (
				<button
					className="bg-[#7289da] p-3 rounded-3xl flex justify-center items-center text-center text-white hover:scale-105 ease-in duration-300"
					onClick={() => signIn("discord", { redirect: true, callbackUrl: "/dashboard" })}
				>
					<SiDiscord size={30} className="mr-2" />
					Sign in with Discord
				</button>
			)}
			<p>Texte faisant la presentation de la tech</p>
		</>
	);
}
