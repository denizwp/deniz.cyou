import Head from "next/head";

/** a title and nothing else, so link embeds show just the name */
export default function GenericMeta({ title }: { title: string }) {
	return (
		<Head>
			<title>{title}</title>
			<meta property="og:title" content={title} />
		</Head>
	);
}
