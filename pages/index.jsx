import { signIn, useSession } from "next-auth/react";
import { SiDiscord } from "react-icons/si";

export default function Home() {
	const { data: session } = useSession();
	return (
		<main className="max-w-[1200px] m-auto text-center justify-center items-center">
			{!session && (
				<button
					className="duration-300 mt-5 "
					onClick={() => signIn("discord", { redirect: true, callbackUrl: "/dashboard" })}
				>
					<div className="text-center justify-center items-center flex">
						<SiDiscord size={30} className="mr-2" />
						Sign in with Discord
					</div>
				</button>
			)}
			<p className="m-5">
				En cpp le marché alloue les ressources rares de façon optimale du point de vue
				collectif (optimum de Pareto). En effet, les ressources rares sont attribuées à la
				personne qui en a le plus besoin. Cela permet de réduire les inégalités et de
				maximiser le bien-être collectif. En revanche, le marché ne permet pas de répartir
				les ressources rares de façon équitable. En effet, les personnes qui ont le plus
				besoin de ces ressources ne sont pas forcément celles qui en ont le plus besoin.
				Cela peut être dû à des facteurs externes (maladie, accident, etc.) ou internes
				(défaut de caractère, etc.). Cela peut aussi être dû à des facteurs aléatoires
				(malchance, etc.). En revanche, le marché permet de répartir les ressources non
				rares de façon équitable. En effet, les personnes qui ont le plus besoin de ces
				ressources sont celles qui en ont le plus besoin. Cela peut être dû à des facteurs
				externes (maladie, accident, etc.) ou internes (défaut de caractère, etc.). Cela
				peut aussi être dû à des facteurs aléatoires (malchance, etc.). En revanche, le
				marché ne permet pas de répartir les ressources non rares de façon optimale du point
				de vue collectif. En effet, les ressources non rares sont attribuées à la personne
				qui en a le plus besoin. Cela permet de réduire les inégalités et de maximiser le
				bien-être collectif. En revanche, le marché ne permet pas de répartir les ressources
				non rares de façon équitable. En effet, les personnes qui ont le plus besoin de ces
				ressources ne sont pas forcément celles qui en ont le plus besoin. Cela peut être dû
				à des facteurs externes (maladie, accident, etc.) ou internes (défaut de caractère,
				etc.). Cela peut aussi être dû à des facteurs aléatoires (malchance, etc.). En
				revanche, le marché permet de répartir les ressources non rares de façon équitable.
				En effet, les personnes qui ont le plus besoin de ces ressources sont celles qui en
				ont le plus besoin. Cela peut être dû à des facteurs externes (maladie, accident,
				etc.) ou internes (défaut de caractère, etc.).
			</p>
		</main>
	);
}
