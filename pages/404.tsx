// 404.js
import Link from "next/link";

export default function FourOhFour() {
	return (
		<div className="items-center justify-center text-center">
			<h2 className="mb-8 mt-40">404 | Page Not Found :(</h2>
			<Link href="/">
				<button>Go back home</button>
			</Link>
		</div>
	);
}
