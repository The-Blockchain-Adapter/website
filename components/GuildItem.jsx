export const GuildItem = ({ guild }) => {
	// show the guild icon
	function getSource() {
		if (guild.icon !== null) {
			return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
		} else {
			return "/default_guild_icon.png";
		}
	}

	return (
		<main className="cursor-pointer shadow-md shadow-gray-400 w-fit rounded-full p-4 my-7 bg-gray-300 flex items-center justify-center m-auto hover:scale-105 ease-in duration-300">
			<img
				className="rounded-full mr-3 shadow-md shadow-gray-400"
				src={getSource()}
				height={55}
				width={55}
			/>
			<h4>{guild.name}</h4>
		</main>
	);
};
