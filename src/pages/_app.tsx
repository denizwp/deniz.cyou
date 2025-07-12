import "../styles/index.scss";

import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>deniz</title>

				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta name="theme-color" content="#000000" />
				
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />

				<link rel="icon" type="image/x-icon" href="/tree.ico" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
