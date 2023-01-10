import { GetServerSidePropsContext } from "next";
import { NextPageWithLayout, Guild } from "../../utils/types";
import { fetchMutualGuilds } from "../../utils/api";
import { GuildItem } from "../../components/GuildItem";
import { ReactElement } from "react";
import { HeaderLayout } from "../../components/Header";
import { useRouter } from "next/router";

type Props = {
	guilds: Guild[];
};

// @ts-ignore
const DashboardPage: NextPageWithLayout<Props> = ({ guilds }) => {
	const router = useRouter();

	return (
		<div>
			<h1>Select a Guild</h1>
			{
				// @ts-ignore
				guilds.map((guild) => (
					<div key={guild.id} onClick={() => router.push(`/dashboard/${guild.id}`)}>
						<GuildItem guild={guild} />
					</div>
				))
			}
		</div>
	);
};

DashboardPage.getLayout = function (page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return fetchMutualGuilds(context);
}

export default DashboardPage;
