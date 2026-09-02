import BackgroundEffect from "./BackgroundEffect";
import Navbar from "./Navbar";
import Transition from "./Transition";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	return (
		<>
			<BackgroundEffect />

			<Navbar />

			<div className="mt-16 md:mt-20 mb-20 md:mb-32 text-white">
				<Transition>{children}</Transition>
			</div>
		</>
	);
}
