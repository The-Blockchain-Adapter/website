import Head from "next/head";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export function Header() {
	const { data: session } = useSession();
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>The Blockchain Adapter</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-gray-300 flex justify-around sm:px-4 py-4 items-center shadow-md shadow-gray-400 mb-2">
				<img
					onClick={() => router.push(`/`)}
					className="rounded-full shadow-sm shadow-gray-400 mx-2 sm:hidden flex lg:flex cursor-pointer"
					src={"profilePicture.png"}
					width="100px"
					height="100px"
				/>
				<h1 onClick={() => router.push(`/`)} className="cursor-pointer mx-2 sm:flex hidden">
					The Blockchain Adapter
				</h1>
				<div className="flex items-center">
					<button className="mx-2" onClick={() => router.push(`/dashboard`)}>
						Dashboard
					</button>
					<button className="mx-2" onClick={() => router.push(`/docs`)}>
						Docs
					</button>
					{session && (
						<img
							onClick={() => signOut()}
							className="rounded-full mx-2 shadow-md shadow-gray-400 hover:scale-105 ease-in duration-200 cursor-pointer"
							src={session.user.image}
							width="60px"
							height="60px"
						/>
					)}
				</div>
			</main>
		</div>
	);
}
