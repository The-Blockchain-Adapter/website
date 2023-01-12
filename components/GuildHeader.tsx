import { useRouter } from "next/router";

export const GuildHeader = ({ guild }) => {
	const router = useRouter();
	function getSource() {
		if (guild.guildIcon != "None.") {
			return guild.guildIcon;
		} else {
			return "/default_guild_icon.png";
		}
	}

	return (
		<div onClick={() => router.push(`/dashboard/${router.query.id}`)}>
			<img src={getSource()} height={55} width={55} />
			<p>{guild.guildName}</p>
		</div>
	);
};
