import { HomeIcon } from "@heroicons/react/solid";
import differenceInYears from "date-fns/differenceInYears";
import type { InferGetServerSidePropsType } from "next";
import Image from "next/future/image";

import { Clock } from "../components/Clock";
import Discord from "../components/Discord";
import GenericMeta from "../components/GenericMeta";
import GitHub from "../components/GitHub";
import Spotify from "../components/Spotify";
import { Weather } from "../components/Weather";
import { socials } from "../data/socials";

const birthday = new Date(2008, 12, 8);

export async function getStaticProps() {
	return {
		props: {
			age: differenceInYears(Date.now(), birthday).toString()
		}
	};
}

export default function Home({
	age
}: InferGetServerSidePropsType<typeof getStaticProps>) {
	return (
		<main className="wrapper fade">
			<GenericMeta title="deniz 👋" description="lul" />

			<h1 className="header">
				deniz <HomeIcon className="ml-4 h-10 w-10 text-orange-400" />
			</h1>

			<p className="mt-4 text-gray-400">
				hi... this is <b className="text-gray-200">deniz</b> &mdash; an{" "}
				<span className="text-sky-400">18-year-old developer</span>{" "}
				from{" "}
				<a
					className="text-red-400 transition hf:text-red-300"
					href="https://en.wikipedia.org/wiki/Turkey"
					target="_blank"
					rel="noopener noreferrer"
				>
					turkiye
				</a>
				.
			</p>

			<div className="my-6 flex flex-wrap gap-5 items-center">
				{socials.map(({ name, image, url }) => (
					<a
						key={name}
						href={url}
						aria-label={name}
						target="_blank"
						rel="noopener noreferrer"
						className="w-6 h-6 opacity-70 transition hf:opacity-100"
					>
						<Image
							src={image}
							alt={name}
							width={64}
							height={64}
							priority={true}
						/>
					</a>
				))}
			</div>

			<Clock />
			<Weather />

			<Discord />
			<Spotify />
			<GitHub />
		</main>
	);
}
