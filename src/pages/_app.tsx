import "../styles/index.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps<{ fallback?: Record<string, unknown> }>) {
	return (
		<>
			<Head>
				<title>deniz</title>

				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta name="theme-color" content="#0e5a36" />
				
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />

				<link rel="icon" type="image/x-icon" href="/tree.ico" />
			</Head>
			{/* pages that fetch on the server hand their data to swr here, so nothing pops in */}
			<SWRConfig value={{ fallback: pageProps.fallback ?? {} }}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SWRConfig>
		</>
	);
}

export default MyApp;
