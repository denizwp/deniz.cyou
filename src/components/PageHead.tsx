import GenericMeta from "./GenericMeta";

/** the big lowercase word every inner page opens with */
export default function PageHead({ title, children }: React.PropsWithChildren<{ title: string }>) {
	return (
		<>
			<GenericMeta title={`${title.charAt(0).toUpperCase()}${title.slice(1)} – deniz`} />
			<div className="head">
				<h1>{title}.</h1>
				{children && <p>{children}</p>}
			</div>
		</>
	);
}
