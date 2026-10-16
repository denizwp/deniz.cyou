import { useEffect, useState } from "preact/hooks";

type Theme = "light" | "dark";

const systemTheme = (): Theme => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const saved = () => {
	try {
		return localStorage.getItem("theme");
	} catch {
		return null;
	}
};

/** follows the system until it's flipped, then remembers the choice */
export default function ThemeSwitch() {
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		setTheme((document.documentElement.dataset.theme as Theme) ?? systemTheme());

		// keep following the system while nothing has been picked
		const media = matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => {
			if (saved()) return;
			const next = systemTheme();
			document.documentElement.dataset.theme = next;
			setTheme(next);
		};
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	const pick = (next: Theme) => {
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem("theme", next);
		} catch {}
		setTheme(next);
	};

	return (
		<div className="theme-switch" role="radiogroup" aria-label="Theme">
			{(["light", "dark"] as Theme[]).map(t => (
				<button key={t} role="radio" aria-checked={theme === t} onClick={() => pick(t)}>
					{t.toUpperCase()}
				</button>
			))}
		</div>
	);
}
