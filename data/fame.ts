export type FameLink = {
	label: string;
	href: string;
};

export type FameCredit = {
	author: string;
	sourceHref: string;
	license: string;
	licenseHref: string;
	label?: string;
	note?: string;
};

export type FamePerson = {
	slug: string;
	name: string;
	role: string;
	portrait: string;
	portraitAlt: string;
	portraitPosition: string;
	credit: FameCredit;
	links: FameLink[];
	paragraphs: string[];
};

export const fame: FamePerson[] = [
	{
		slug: "paul-graham",
		name: "Paul Graham",
		role: "Programmer and essayist",
		portrait: "/wall/paul-graham.jpg",
		portraitAlt: "Paul Graham at a desk, photographed by Gabor Cselle in 2007",
		portraitPosition: "18% center",
		credit: {
			author: "Gabor Cselle",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Paul_Graham_programming.jpg",
			license: "CC BY 2.0",
			licenseHref: "https://creativecommons.org/licenses/by/2.0/",
		},
		links: [
			{ label: "Essays", href: "https://paulgraham.com/articles.html" },
			{ label: "Y Combinator", href: "https://www.ycombinator.com" },
		],
		paragraphs: [
			"I put Paul Graham here because his essays are the correction I reach for when a plan gets clever. He keeps asking what the work actually is, who it is for, and whether I am avoiding the hard part.",
			"He wrote Lisp, co-founded Viaweb, then Y Combinator, and has published the essays at paulgraham.com since the early 2000s. The part I use is the plain sentence, and the refusal to decorate a weak idea.",
		],
	},
	{
		slug: "seth-godin",
		name: "Seth Godin",
		role: "Writer",
		portrait: "/wall/seth-godin.jpg",
		portraitAlt: "Seth Godin, photographed by Joi Ito in 2009",
		portraitPosition: "center 16%",
		credit: {
			author: "Joi Ito",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Seth_Godin_in_2009.jpg",
			license: "CC BY 2.0",
			licenseHref: "https://creativecommons.org/licenses/by/2.0/",
		},
		links: [
			{ label: "Blog", href: "https://seths.blog/" },
			{ label: "About", href: "https://seths.blog/about/" },
		],
		paragraphs: [
			"Seth Godin is here because he treats shipping as the practice, not the announcement. The smallest audience that cares is enough. A page that does not change someone is not done.",
			"He has written a short post almost every day since 2002, and the books around that practice, from Permission Marketing to This Is Marketing. I come back when I am about to add a feature instead of saying who it is for.",
		],
	},
	{
		slug: "robert-greene",
		name: "Robert Greene",
		role: "Writer",
		portrait: "/wall/robert-greene.jpg",
		portraitAlt: "Robert Greene, from his 2012 author photograph",
		portraitPosition: "center 22%",
		credit: {
			author: "Robert Greene",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Robert_Greene_B%26W.jpg",
			license: "CC BY-SA 2.0",
			licenseHref: "https://creativecommons.org/licenses/by-sa/2.0/",
			note: "The photograph was published in black and white, so hover does not add color.",
		},
		links: [
			{ label: "Site", href: "https://www.robertgreene.net/" },
			{ label: "Books", href: "https://powerseductionandwar.com/" },
		],
		paragraphs: [
			"Robert Greene is the shelf I actually finish. The 48 Laws of Power, Mastery, The Laws of Human Nature. He is here because he writes about the long apprenticeship, and about what people do when they think nobody is keeping score.",
			"He studied classics, spent years in jobs that were not the work, and published the first book in 1998 with Joost Elffers. I read him when I am about to confuse a tactic with a life.",
		],
	},
	{
		slug: "nikola-tesla",
		name: "Nikola Tesla",
		role: "Inventor",
		portrait: "/wall/nikola-tesla.jpg",
		portraitAlt: "Nikola Tesla around 1890, from the Nikola Tesla Museum",
		portraitPosition: "center 22%",
		credit: {
			author: "the Nikola Tesla Museum",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Nikola_Tesla_around_1890.jpg",
			license: "CC BY-SA 4.0",
			licenseHref: "https://creativecommons.org/licenses/by-sa/4.0/",
		},
		links: [
			{
				label: "My Inventions",
				href: "https://www.gutenberg.org/ebooks/39272",
			},
			{ label: "Museum", href: "https://nikolateslamuseum.org/" },
		],
		paragraphs: [
			"Nikola Tesla is here because he worked from a picture he could already see. The machine came second. I come back to that when I am sketching around a thing I have not actually looked at.",
			"He was born in 1856 in Smiljan, built the alternating-current system that won, and died in New York in 1943 with the later inventions unfinished. The useful part is the finished picture, not the myth.",
		],
	},
	{
		slug: "alan-turing",
		name: "Alan Turing",
		role: "Mathematician",
		portrait: "/wall/alan-turing.jpg",
		portraitAlt: "Alan Turing at sixteen, around 1928",
		portraitPosition: "center 20%",
		credit: {
			author: "an unknown photographer",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Alan_Turing_Aged_16.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "The photograph is black and white, so hover does not add color.",
		},
		links: [
			{
				label: "Computing Machinery and Intelligence",
				href: "https://academic.oup.com/mind/article/LIX/236/433/986238",
			},
			{ label: "Archive", href: "https://turingarchive.kings.cam.ac.uk/" },
		],
		paragraphs: [
			"Alan Turing is here because he asked the question I work inside of, then turned it into something you could test instead of argue. I come back to him when a model looks clever and I have not said what clever would mean.",
			"He was born in London in 1912, described the universal machine in 1936, worked on breaking Enigma at Bletchley Park, and wrote Computing Machinery and Intelligence in 1950. He was prosecuted for being gay in 1952 and died in 1954. This photograph is from when he was sixteen.",
		],
	},
	{
		slug: "carl-sagan",
		name: "Carl Sagan",
		role: "Astronomer",
		portrait: "/wall/carl-sagan.jpg",
		portraitAlt: "Carl Sagan standing beside a Viking lander, from NASA/JPL",
		portraitPosition: "center 25%",
		credit: {
			author: "NASA/JPL",
			sourceHref: "https://commons.wikimedia.org/wiki/File:Sagan_large.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "Cropped from the original.",
		},
		links: [
			{
				label: "Pale Blue Dot",
				href: "https://science.nasa.gov/resource/voyager-1s-pale-blue-dot/",
			},
			{
				label: "Planetary Society",
				href: "https://www.planetary.org/profiles/carl-sagan",
			},
		],
		paragraphs: [
			"Carl Sagan is here because he made the hardest ideas plain without making them small. Cosmos, the pale blue dot, the baloney detection kit. I read him when I want a claim to earn the belief I am giving it.",
			"He was born in Brooklyn in 1934, worked on the Mariner, Viking, and Voyager missions, made Cosmos for PBS in 1980, and co-founded The Planetary Society. He died in 1996. In this photograph he stands next to a Viking lander.",
		],
	},
	{
		slug: "franz-kafka",
		name: "Franz Kafka",
		role: "Writer",
		portrait: "/wall/franz-kafka.jpg",
		portraitAlt: "Franz Kafka in 1923",
		portraitPosition: "center 20%",
		credit: {
			author: "an unknown photographer",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Franz_Kafka,_1923.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "The photograph is black and white, so hover does not add color.",
		},
		links: [
			{ label: "The Trial", href: "https://www.gutenberg.org/ebooks/7849" },
			{
				label: "The Metamorphosis",
				href: "https://www.gutenberg.org/ebooks/5200",
			},
		],
		paragraphs: [
			"Franz Kafka is here for the sentence that does not explain the room it puts you in. A door, a clerk, a rule nobody wrote down. I read him when a system has started to feel like weather.",
			"He worked at an insurance institute in Prague and wrote at night. The Trial and The Castle were still unfinished when he died in 1924. Max Brod published them anyway.",
		],
	},
	{
		slug: "friedrich-nietzsche",
		name: "Friedrich Nietzsche",
		role: "Philosopher",
		portrait: "/wall/friedrich-nietzsche.jpg",
		portraitAlt:
			"Friedrich Nietzsche in 1882, photographed by Gustav-Adolf Schultze",
		portraitPosition: "center 18%",
		credit: {
			author: "Gustav-Adolf Schultze",
			sourceHref: "https://commons.wikimedia.org/wiki/File:Nietzsche1882.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "The photograph is black and white, so hover does not add color.",
		},
		links: [
			{
				label: "Beyond Good and Evil",
				href: "https://www.gutenberg.org/ebooks/4363",
			},
			{
				label: "Thus Spoke Zarathustra",
				href: "https://www.gutenberg.org/ebooks/1998",
			},
		],
		paragraphs: [
			"Friedrich Nietzsche is here as a warning against a life lived to be approved of. He writes in blows, not in a system you can hide inside. I read him when I am about to call comfort a principle.",
			"He was a philologist who left the university, wrote the books between 1872 and 1888, and collapsed in Turin in 1889. The sister's later edits are not the work. I stay with the books.",
		],
	},
	{
		slug: "albert-camus",
		name: "Albert Camus",
		role: "Writer",
		portrait: "/wall/albert-camus.jpg",
		portraitAlt:
			"Albert Camus at his desk, photographed by United Press International",
		portraitPosition: "center 28%",
		credit: {
			author: "United Press International",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Albert_Camus,_gagnant_de_prix_Nobel,_portrait_en_buste,_pos%C3%A9_au_bureau,_faisant_face_%C3%A0_gauche,_cigarette_de_tabagisme.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "The photograph is black and white, so hover does not add color.",
		},
		links: [
			{
				label: "Nobel lecture",
				href: "https://www.nobelprize.org/prizes/literature/1957/camus/speech/",
			},
			{
				label: "Biographical",
				href: "https://www.nobelprize.org/prizes/literature/1957/camus/biographical/",
			},
		],
		paragraphs: [
			"Albert Camus is here because he will not lie about the absurd and then quit. You see the rock. You push it. That is not a slogan, and it is not despair.",
			"He was born in Algeria in 1913, wrote The Stranger, The Myth of Sisyphus, and The Plague, and took the Nobel Prize in 1957. He died in a car crash in 1960. I come back when the work is heavy and I want a reason that is not a speech.",
		],
	},
	{
		slug: "plato",
		name: "Plato",
		role: "Philosopher",
		portrait: "/wall/plato.jpg",
		portraitAlt:
			"Roman marble bust of Plato in the Capitoline Museums, photographed by Marie-Lan Nguyen",
		portraitPosition: "center 40%",
		credit: {
			author: "Marie-Lan Nguyen",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Plato_Silanion_Musei_Capitolini_MC1377.jpg",
			license: "CC BY 2.5",
			licenseHref: "https://creativecommons.org/licenses/by/2.5/",
			note: "Roman marble bust in the Capitoline Museums, traditionally identified as Plato.",
		},
		links: [
			{ label: "Republic", href: "https://www.gutenberg.org/ebooks/1497" },
			{ label: "Apology", href: "https://www.gutenberg.org/ebooks/1656" },
		],
		paragraphs: [
			"Plato is here because a dialogue will not let a word stay fuzzy. Someone asks what you meant. You find out you did not know. I read him when I am about to use a big word I have not defined.",
			"He was a student of Socrates in Athens and wrote the dialogues in the fourth century BC. The Republic, the Apology, the cave. What we have of his face is a later bust, not a photograph.",
		],
	},
	{
		slug: "sun-tzu",
		name: "Sun Tzu",
		role: "Strategist",
		portrait: "/wall/sun-tzu.jpg",
		portraitAlt:
			"Bronze statue of Sun Tzu holding a scroll at the Enchoen garden in Yurihama, Japan, photographed by 663highland",
		portraitPosition: "center 20%",
		credit: {
			author: "663highland",
			sourceHref: "https://commons.wikimedia.org/wiki/File:Enchoen27n3200.jpg",
			license: "CC BY 2.5",
			licenseHref: "https://creativecommons.org/licenses/by/2.5/",
			note: "Modern statue at the Enchoen garden in Yurihama, Japan. No portrait from his lifetime survives.",
		},
		links: [
			{ label: "The Art of War", href: "https://www.gutenberg.org/ebooks/132" },
			{ label: "Original text", href: "https://ctext.org/art-of-war" },
		],
		paragraphs: [
			"Sun Tzu is here because the book is mostly about not fighting. Know the ground, know yourself, and win before the battle starts. I read him when I am about to answer a problem with more force.",
			"The Art of War is credited to a general of the state of Wu around 500 BC, though the text was probably put together later. Thirteen short chapters. What we have of his face is a modern statue, not a portrait.",
		],
	},
];

export function getFamePerson(slug: string): FamePerson | undefined {
	return fame.find((person) => person.slug === slug);
}
