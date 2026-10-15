import GenericMeta from "../components/GenericMeta";

// the whole page is the name; the letters live in the layout so they can follow you around
export default function Home() {
	return (
		<>
			<GenericMeta title="deniz" description="deniz is an 18-year-old developer from turkiye." />
			<h1 className="sr-only">deniz, an 18-year-old developer from turkiye</h1>
		</>
	);
}
