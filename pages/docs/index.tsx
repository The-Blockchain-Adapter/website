import Link from "next/link";

export default function DocsPage() {
	return (
		<div>
			<p>
				Pour faire les étapes suivantes, vous devez avoir le statut administrateur sur votre
				serveur discord.
			</p>
			<p>Ajoutez le bot a votre serveur</p>
			<Link
				href="https://discord.com/api/oauth2/authorize?client_id=1052168712062513155&permissions=8&scope=bot%20applications.commands"
				passHref={true}
			>
				<button>Page d'invitation</button>
			</Link>
			<p>Use la commande /init</p>
			<p>Connectez votre compte discord sur ce site web</p>
			<p>Clickez sur le serveur de votre choix</p>
			<p>Clickez sur créer un nouveau script</p>
			<p>Choisisez ce qui vous plait (Mettre un example)</p>
			<p>Enregistrez le script</p>
			<p>Tester le script pour etre sur qu'il fonctionne bien</p>
		</div>
	);
}
