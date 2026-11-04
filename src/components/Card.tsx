import Link from "next/link";

export const external = { target: "_blank", rel: "noopener noreferrer" };

export type TagColor = "lime" | "amber" | "orange" | "sky" | "purple" | "stone";

export function Tag({ color, children }: React.PropsWithChildren<{ color: TagColor }>) {
	return <span className={`tag tag-${color}`}>{children}</span>;
}

function Arrow() {
	return (
		<span className="arrow" aria-hidden="true">
			<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
				<path d="M3 9l6-6M4 3h5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</span>
	);
}

interface CardProps {
	/** the small line in the top corner, like "Projects · azuki" */
	label?: string;
	wide?: boolean;
	/** the whole card opens this; leave it out when the card holds links of its own */
	href?: string;
	/** show the corner arrow on a card without an href, whose inner link does the opening */
	arrow?: boolean;
	className?: string;
}

/** one cell of the grid */
export default function Card({ label, wide, href, arrow, className = "", children }: React.PropsWithChildren<CardProps>) {
	const classes = `card${wide ? " is-wide" : ""}${href ? " is-link" : ""} ${className}`;
	const inner = (
		<>
			{label && <p className="label">{label}</p>}
			{(href || arrow) && <Arrow />}
			{children}
		</>
	);

	if (!href) return <div className={classes}>{inner}</div>;
	if (href.startsWith("/")) {
		return (
			<Link href={href}>
				<a className={classes}>{inner}</a>
			</Link>
		);
	}
	return (
		<a className={classes} href={href} {...external}>
			{inner}
		</a>
	);
}

interface MarkCardProps {
	label: string;
	title: string;
	/** a cut-out picture; it sits faded behind the words until the card is hovered */
	image: string;
	tag?: string;
	tagColor?: TagColor;
	href?: string;
}

/** a picture to look at, with its name over it */
export function MarkCard({ label, title, image, tag, tagColor = "lime", href }: MarkCardProps) {
	return (
		<Card label={label} href={href} className="mark-card">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className="mark" src={image} alt="" loading="lazy" />
			<div className="mark-fade" />
			<div className="mark-text">
				{tag && (
					<p className="tags">
						<Tag color={tagColor}>{tag}</Tag>
					</p>
				)}
				<h2 className="t-lg">{title}</h2>
			</div>
		</Card>
	);
}
