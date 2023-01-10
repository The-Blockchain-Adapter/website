import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { validateCookies } from "./helpers";
import { Guild } from "./types";
import { NextResponse } from "next/server";
const API_URL = "http://localhost:3001/api";

export const fetchMutualGuilds = async (context: GetServerSidePropsContext) => {
	const headers = validateCookies(context);
	if (!headers) return { redirect: { destination: "/" } };
	try {
		const { data: guilds } = await axios.get<Guild[]>(`${API_URL}/guilds`, { headers });
		return { props: { guilds } };
	} catch (err) {
		console.log(err);
		return { redirect: { destination: "/" } };
	}
};

export const fetchValidGuild = async (id: string, headers: HeadersInit) => {
	return fetch(`${API_URL}/guilds/${id}/permissions`, { headers });
};
