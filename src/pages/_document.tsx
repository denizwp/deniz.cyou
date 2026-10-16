import { Head, Html, Main, NextScript } from "next/document";

// runs before the first paint: a saved choice wins, otherwise the system decides
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
