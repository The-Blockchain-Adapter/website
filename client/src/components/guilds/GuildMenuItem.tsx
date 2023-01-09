import { FC } from "react";
import { Guild } from "../../utils/types";
import Image from "next/image";

type Props = {
	guild: Guild;
};

export const GuilMenuItem: FC<Props> = ({ guild }) => {
	return (
		<div>
			<Image
				src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
				height={55}
				width={55}
				alt={guild.name}
			></Image>
			<p>{guild.name}</p>
		</div>
	);
};
