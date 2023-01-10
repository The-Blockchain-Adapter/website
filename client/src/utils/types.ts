import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";

export type Guild = {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: string;
	features: string[];
};

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};
