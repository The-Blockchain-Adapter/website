import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaPen } from "react-icons/fa";

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
				className="text-[#1f2937] mr-0 sm:mr-4 m-4 bg-gray-300 rounded-full flex items-center hover:scale-105 shadow-md shadow-gray-400"
			>
				<img className="rounded-full" src={getSource()} height={55} width={55} />
				<h3 className="m-3 text-base sm:text-lg lg:text-xl">{guild.name}</h3>
			</button>
			<button
				onClick={() => router.push(`/dashboard/${router.query.id}/create`)}
				className="p-2 flex justify-center items-center rounded-full duration-300 ml-7 sm:ml-5"
			>
				<AiFillPlusCircle size={45} />
				<h4 className="mx-2 hidden sm:flex text-lg">Create</h4>
			</button>
			<button
				onClick={() => router.push(`/dashboard/${router.query.id}/modify`)}
				className="p-2 flex justify-center items-center rounded-full duration-300 ml-1 sm:ml-4"
			>
				<FaPen size={45} className="scale-75 sm:ml-1" />
				<h4 className="mr-2 ml-1 hidden sm:flex text-lg">Modify</h4>
			</button>
		</main>
	);
};
