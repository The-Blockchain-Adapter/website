import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";

export const GuildHeader = ({ guild }) => {
	const router = useRouter();

	// Show the correct guild icon
	function getSource() {
		if (guild.icon != "None.") {
			return guild.icon;
		} else {
			return "/default_guild_icon.png";
		}
	}

	return (
		<main className="flex items-center max-w-[1200px]">
			<button
				onClick={() => router.push(`/dashboard/${router.query.id}`)}
				className="text-[#1f2937] mr-0 sm:mr-4 m-4 bg-gray-300 rounded-full flex items-center hover:scale-100 shadow-md shadow-gray-400"
			>
				<img className="rounded-full" src={getSource()} height={55} width={55} />
				<h3 className="m-3 text-lg sm:text-xl">{guild.name}</h3>
			</button>
			<button
				onClick={() => router.push(`/dashboard/${router.query.id}/create`)}
				className="sm:p-3 p-2 flex justify-center items-center rounded-full duration-300"
			>
				<AiFillPlusCircle size={45} />
				<h4 className="mx-2 hidden sm:flex text-base sm:text-lg">Create a new script </h4>
			</button>
		</main>
	);
};
