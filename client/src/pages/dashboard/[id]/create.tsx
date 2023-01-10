import { NextPageWithLayout } from "../../../utils/types";
import { ReactElement } from "react";
import { HeaderLayout } from "../../../components/Header";
import { useRouter } from "next/router";

const DashboardIDCreatePage: NextPageWithLayout = () => {
	const router = useRouter();
	return (
		<div>
			<div onClick={() => router.push(`/dashboard/${router.query.id}`)}>
				<img src="/default_guild_icon.png" height={55} width={55} />
				<p>"nom du serv"</p>
			</div>
			<p>editeur de code très simple style scratch fixe</p>
		</div>
	);
};

DashboardIDCreatePage.getLayout = function (page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};

export default DashboardIDCreatePage;
