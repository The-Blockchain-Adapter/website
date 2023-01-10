import { NextPageWithLayout } from "../../utils/types";
import { ReactElement } from "react";
import { HeaderLayout } from "../../components/Header";

const DocsPage: NextPageWithLayout = () => {
	return (
		<div>
			<p>text tuto d'installation</p>
			<p>ajouter au serv</p>
			<p> aller sur site web (doit etre admin pour voir)</p>
			<p>etc...</p>
		</div>
	);
};

DocsPage.getLayout = function (page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};

export default DocsPage;
