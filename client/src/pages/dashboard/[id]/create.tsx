import { NextPageWithLayout, Guild } from "../../../utils/types";
import { ReactElement } from "react";
import { HeaderLayout } from "../../../components/Header";
import { GetServerSidePropsContext } from "next";
import { fetchGuild, fetchValidGuilds } from "../../../utils/api";
import { GuildHeader } from "../../../components/GuildHeader";

type Props = {
	guild: Guild;
};

const DashboardIDPage: NextPageWithLayout<Props> = ({ guild }) => {
	return (
		<div>
			<GuildHeader guild={guild} />
			<p>editeur de code très simple style scratch fixe</p>
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
