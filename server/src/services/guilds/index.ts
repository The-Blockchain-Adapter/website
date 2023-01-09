import axios from "axios";
import { User } from "../../database/schemas";
import { DISCORD_API_URL } from "../../utils/constants";
import { PartialGuild } from "../../utils/types";

export function getBotGuildsService() {
	return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
		headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
	});
}

export async function getUserGuildsService(id: string) {
	const user = await User.findById(id);
	if (!user) throw new Error("User not found");

	return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
		headers: { Authorization: `Bearer ${user.accessToken}` },
	});
}
