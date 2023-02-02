import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Header } from "../components/Headers/Header";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Header />
			<Component {...pageProps} />
		</SessionProvider>
	);
}
