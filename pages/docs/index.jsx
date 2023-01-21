import Link from "next/link";

export default function DocsPage() {
	return (
		<main className="max-w-[1200px] m-auto justify-center items-center">
			<p className="m-5 text-center">
				Pour faire les étapes suivantes, vous devez avoir le statut administrateur sur votre
				serveur discord.
			</p>
			<div className="m-5 flex items-center">
				<p>Ajoutez le bot a votre serveur:</p>
				<Link
					href="https://discord.com/api/oauth2/authorize?client_id=1052168712062513155&permissions=8&scope=bot%20applications.commands"
					passHref={true}
				>
					<button>Page d'invitation</button>
				</Link>
			</div>
			<p className="m-5">Use la commande: /init</p>
			<p className="m-5">Connectez votre compte discord sur ce site web</p>
			<p className="m-5">
				Clickez sur le serveur de votre choix (Vérifier que vos cookies ne soient pas
				désactivés)
			</p>
			<p className="m-5">Clickez sur créer un nouveau script</p>
			<p className="m-5">Choisisez ce qui vous plait (Mettre un example)</p>
			<p className="m-5">Enregistrez le script</p>
			<p className="m-5">Tester le script pour etre sur qu'il fonctionne bien</p>
		</main>
	);
}
