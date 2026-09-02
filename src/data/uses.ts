export interface UsesItem {
	name: string;
	description: string;
	url?: string;
}

export interface UsesGroup {
	title: string;
	items: UsesItem[];
}

export const uses: UsesGroup[] = [
	{
		title: "Hardware",
		items: [
			{
				name: "TODO: masaüstü / laptop",
				description: "CPU, GPU, RAM — doldur"
			},
			{
				name: "TODO: monitör",
				description: "Kaç inç, kaç Hz — doldur"
			},
			{
				name: "TODO: klavye & mouse",
				description: "Model ve switch — doldur"
			},
			{
				name: "TODO: kulaklık",
				description: "Model — doldur"
			}
		]
	},
	{
		title: "Editor & Terminal",
		items: [
			{
				name: "VS Code",
				description: "Her şeyi burada yazıyorum.",
				url: "https://code.visualstudio.com/"
			},
			{
				name: "TODO: tema",
				description: "Hangi renk teması ve font — doldur"
			},
			{
				name: "Windows Terminal",
				description: "Windows 11 üzerinde günlük kabuğum.",
				url: "https://learn.microsoft.com/windows/terminal/"
			}
		]
	},
	{
		title: "Development",
		items: [
			{
				name: "TypeScript",
				description: "Yeni başladığım her şeyin varsayılan dili.",
				url: "https://www.typescriptlang.org/"
			},
			{
				name: "React & Next.js",
				description: "Bu site dahil çoğu projemin iskeleti.",
				url: "https://nextjs.org/"
			},
			{
				name: "Tailwind CSS",
				description: "12 projemin 10'unda stil için kullandığım şey.",
				url: "https://tailwindcss.com/"
			},
			{
				name: "Node.js",
				description: "Backend ve küçük araçlar için.",
				url: "https://nodejs.org/"
			},
			{
				name: "MySQL & MongoDB",
				description: "Projelerime göre değişen veritabanlarım.",
				url: "https://www.mysql.com/"
			},
			{
				name: "PHP",
				description: "Bazı eski projelerde hâlâ karşıma çıkıyor.",
				url: "https://www.php.net/"
			}
		]
	},
	{
		title: "Design & Etc.",
		items: [
			{
				name: "Figma",
				description: "Arayüzleri koda dökmeden önce burada çiziyorum.",
				url: "https://www.figma.com/@denizwp"
			},
			{
				name: "Blender",
				description: "3B ile uğraştığım zamanlar için.",
				url: "https://www.blender.org/"
			},
			{
				name: "Spotify",
				description: "Kod yazarken sürekli açık — anasayfada canlı.",
				url: "https://open.spotify.com/user/szviltwriiiu23qzw5uriwtw7"
			},
			{
				name: "Cloudflare",
				description: "DNS ve deniz.cyou'nun önündeki her şey.",
				url: "https://www.cloudflare.com/"
			}
		]
	}
];
