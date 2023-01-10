import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { SiDiscord } from "react-icons/si";
import Head from "next/head";

const Home: NextPage = () => {
	const { data: session } = useSession();

	if (session) {
		const { user } = session;
		console.log(session);
		return (
			<div>
				<Head>
					<title>Dashboard | The Blockchain Adapter</title>
					<meta name="description" content="Dashboard" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="flex m-auto bg-[#a2b0e3] text-center justify-center items-center h-full">
					<h1 className="mx-40 text-4xl text-center font-bold items-center  my-4">
						The Blockchain Adapter
					</h1>
					<button
						className="bg-[#7289da] p-3 mr-5 my-3 rounded-3xl text-white hover:scale-105 ease-in duration-300"
						onClick={() => signOut()}
					>
						<div className="flex justify-center items-center text-center">
							{user?.image && (
								<Image
									src={user.image}
									alt=""
									width={38}
									height={38}
									style={{ borderRadius: "50%" }}
								/>
							)}
							<div className="ml-2">{user?.name}</div>
						</div>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Head>
				<title>The Blockchain Adapter</title>
				<meta name="description" content="Home" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex m-auto bg-[#a2b0e3] text-center justify-center items-center h-full">
				<h1 className="mx-40 text-4xl text-center font-bold items-center  my-4">
					The Blockchain Adapter
				</h1>
				<button
					className="bg-[#7289da] p-3 rounded-3xl flex justify-center items-center text-center text-white hover:scale-105 ease-in duration-300"
					onClick={() => signIn()}
				>
					<SiDiscord size={30} className="mr-2" />
					Sign in
				</button>
			</div>
		</div>
	);
};

export default Home;
