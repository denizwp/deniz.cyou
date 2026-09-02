import Navbar from "./Navbar";
import Transition from "./Transition";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	return (
		<div className="md:container md:px-0 mx-auto my-20 md:my-28 px-6 sm:px-8 text-white text-xl">
			<Navbar />
			<main>
				<Transition>{children}</Transition>
			</main>
		</div>
	);
}
