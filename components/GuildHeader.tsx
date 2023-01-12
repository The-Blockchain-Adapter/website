import { useRouter } from "next/router";

export const GuildHeader = ({ guild }) => {
	const router = useRouter();
	function getSource() {
		if (guild.icon !== null) {
			return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
		} else {
			return "/default_guild_icon.png";
		}
	}

	return (
		<div onClick={() => router.push(`/dashboard/${router.query.id}`)}>
			<img src={getSource()} height={55} width={55} />
			<p>{guild.name}</p>
		</div>
	);
};
