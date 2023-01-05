import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Home: NextPage = () => {
	const { data: session } = useSession();

	if (session) {
		const { user } = session;
		return (
			<div>
				<div className="flex m-auto bg-sky-300 text-center justify-center items-center h-full">
					<h1 className="mx-40 text-4xl text-center font-bold items-center  my-4">
						The Blockchain Adapter
					</h1>
					<button
						className="bg-sky-600 p-3 mr-5 my-3 rounded-3xl text-white hover:scale-105 ease-in duration-300"
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
			<div className="flex m-auto bg-sky-300 text-center justify-center items-center h-full">
				<h1 className="mx-40 text-4xl text-center font-bold items-center  my-4">
					The Blockchain Adapter
				</h1>
				<button
					className="bg-sky-600 p-3 rounded-3xl text-white hover:scale-105 ease-in duration-300"
					onClick={() => signIn()}
				>
					Sign in
				</button>
			</div>
		</div>
	);
};

export default Home;
