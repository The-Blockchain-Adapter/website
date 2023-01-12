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
		<div>
			<img src={getSource()} height={55} width={55} />
			<p>{guild.name}</p>
		</div>
	);
};
