import "../utils/styles/globals.css";
import { AppPropsWithLayout } from "../utils/types";

export default function App({ Component, pageProps }: AppPropsWithLayout<any>) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return getLayout(<Component {...pageProps} />);
}
