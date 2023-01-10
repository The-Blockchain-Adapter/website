import { NextPageWithLayout } from "../../../utils/types";
import { ReactElement } from "react";
import { HeaderLayout } from "../../../components/Header";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const DashboardIDPage: NextPageWithLayout = () => {
	const router = useRouter();
	return (
		<div>
			<div onClick={() => router.push(`/dashboard/${router.query.id}`)}>
				<img src="/default_guild_icon.png" height={55} width={55} />
				<p>"nom du serv"</p>
			</div>
			<button onClick={() => router.push(`/dashboard/${router.query.id}/create`)}>
				<AiFillPlusCircle size={50} />
				<p>create a new script</p>
			</button>

			<p>list of all the actual scripts in blocks</p>
		</div>
	);
};

DashboardIDPage.getLayout = function (page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};

export default DashboardIDPage;
