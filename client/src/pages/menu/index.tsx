import { GetServerSidePropsContext, NextPage } from "next";
import { fetchMutualGuilds } from "../../utils/api";
import { GuilMenuItem } from "../../components/guilds/GuildMenuItem";

//@ts-ignore
const MenuPage: NextPage = ({ guilds }) => {
	return (
		<div>
			<h1>Select a Guild</h1>
			{
				//@ts-ignore
				guilds.guilds.map((guild) => (
					<div key={guild.id}>
						<GuilMenuItem guild={guild} />
					</div>
				))
			}
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return fetchMutualGuilds(context);
}

export default MenuPage;
