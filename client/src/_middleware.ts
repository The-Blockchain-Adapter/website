import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { fetchValidGuild } from "./utils/api";

const validateMiddlewareCookies = (req: NextRequest) => {
	const sessionID = req.cookies["connect.sid"];
	return sessionID
		? {
				Cookie: `connect.sid=${sessionID}`,
		  }
		: false;
};

export async function middleware(req: NextRequest) {
	console.log(req);
	if (request.nextUrl.pathname.startsWith(`/dashboard/${req.page.params.id}}`)) {
		const headers = validateMiddlewareCookies(req);
		if (!headers) return NextResponse.redirect("/");
		if (!req.page.params) return NextResponse.redirect("/menu");
		const { id } = req.page.params;
		const response = await fetchValidGuild(id, headers);
		return response.status === 200 ? NextResponse.next() : NextResponse.redirect("/");
	}
}
