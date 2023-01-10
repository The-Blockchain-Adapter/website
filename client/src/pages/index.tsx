import { NextPageWithLayout } from "../utils/types";
import { ReactElement } from "react";
import { HeaderLayout } from "../components/Header";
import { FaDiscord } from "react-icons/fa";

const HomePage: NextPageWithLayout<any> = () => {
	return (
		<div>
			<button
				onClick={() => (window.location.href = "http://localhost:3001/api/auth/discord")}
			>
				<FaDiscord size={30} />
				Login
			</button>
			<p>Texte faisant la presentation de la tech</p>
		</div>
	);
};

HomePage.getLayout = function (page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};

export default HomePage;
