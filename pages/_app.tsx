import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Header } from "../components/Header";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Header />
			<Component {...pageProps} />
		</SessionProvider>
	);
}
