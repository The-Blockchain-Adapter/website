import { NextPageWithLayout, Guild } from "../../../utils/types";
import { ReactElement } from "react";
import { HeaderLayout } from "../../../components/Header";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { fetchGuild, fetchValidGuilds } from "../../../utils/api";
import { GuildHeader } from "../../../components/GuildHeader";

type Props = {
	guild: Guild;
};

const DashboardIDPage: NextPageWithLayout<Props> = ({ guild }) => {
	const router = useRouter();
	return (
		<div>
			<GuildHeader guild={guild} />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
	await fetchValidGuilds(context, context.query.id as string);
	return fetchGuild(context);
}

export default DashboardIDPage;
