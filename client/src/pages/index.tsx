import { NextPageWithLayout } from "../utils/types";
import { ReactElement } from "react";
import { HeaderLayout } from "../components/Header";

const HomePage: NextPageWithLayout = () => {
	return (
		<div>
			<p>Texte faisant la presentation de la tech</p>
		</div>
	);
};

HomePage.getLayout = function (page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};

export default HomePage;
