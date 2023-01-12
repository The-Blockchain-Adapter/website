import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";

export const GuildHeader = ({ guild }) => {
	const router = useRouter();

	// Show the correct guild icon
	function getSource() {
		if (guild.guildIcon != "None.") {
			return guild.guildIcon;
		} else {
			return "/default_guild_icon.png";
		}
	}

	return (
		<main className="flex items-center max-w-[1200px]">
			<button
				onClick={() => router.push(`/dashboard/${router.query.id}`)}
				className="text-[#1f2937] m-4 bg-gray-300 rounded-full flex items-center duration-300"
			>
				<img className="rounded-full" src={getSource()} height={55} width={55} />
				<h3 className="m-3">{guild.guildName}</h3>
			</button>
			<button
				onClick={() => router.push(`/dashboard/${router.query.id}/create`)}
				className="flex justify-center items-center rounded-full duration-300"
			>
				<AiFillPlusCircle size={35} />
				<div className="mx-2">Create a new script </div>
			</button>
		</main>
	);
};
