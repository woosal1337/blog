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
		slug: "george-hotz",
		name: "George Hotz",
		role: "Hacker",
		portrait: "/wall/george-hotz.jpg",
		portraitAlt:
			"George Hotz on stage at TechCrunch Disrupt in 2016, photographed by Steve Jennings",
		portraitPosition: "45% center",
		credit: {
			author: "Steve Jennings/Getty Images for TechCrunch",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:George_Hotz_at_TechCrunch_Disrupt.jpg",
			license: "CC BY 2.0",
			licenseHref: "https://creativecommons.org/licenses/by/2.0/",
		},
		links: [
			{ label: "Blog", href: "https://geohot.github.io/blog/" },
			{ label: "tinygrad", href: "https://tinygrad.org/" },
		],
		paragraphs: [
			"George Hotz is here because he opens the box. The iPhone at seventeen, then the PlayStation 3, then a driving kit for the car and a small deep learning framework, most of it in the open and a lot of it live on stream. I come back to him when I am waiting for permission to start.",
			"He was born in New Jersey in 1989, unlocked the first iPhone in 2007, and was sued by Sony over the PlayStation 3 in 2011. He founded comma.ai in 2015, which makes openpilot, and the tiny corp in 2022, which makes tinygrad. In this photograph he is on stage at TechCrunch Disrupt in 2016.",
		],
	},
	{
		slug: "lex-fridman",
		name: "Lex Fridman",
		role: "Podcaster and researcher",
		portrait: "/wall/lex-fridman.jpg",
		portraitAlt: "Lex Fridman teaching at MIT in 2018",
		portraitPosition: "center 20%",
		credit: {
			author: "Lex Fridman",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Lex_Fridman_teaching_at_MIT_in_2018.png",
			license: "CC0",
			licenseHref: "https://creativecommons.org/publicdomain/zero/1.0/",
		},
		links: [
			{ label: "Podcast", href: "https://lexfridman.com/podcast/" },
			{ label: "MIT Deep Learning", href: "https://deeplearning.mit.edu/" },
		],
		paragraphs: [
			"Lex Fridman is here because he asks a simple question and then lets the other person finish. Three or four hours with one guest, and no hurry to get to a clip. I listen when I want to hear how someone thinks, not what they announced.",
			"He was born in 1983 in the Soviet Union, grew up in Moscow, and moved to the United States as a kid. He took his PhD at Drexel, joined MIT to study how people drive with machines, taught the deep learning courses there, and started the podcast in 2018. In this photograph he is teaching at MIT that year.",
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
		slug: "stephen-king",
		name: "Stephen King",
		role: "Writer",
		portrait: "/wall/stephen-king.jpg",
		portraitAlt: "Stephen King in 1984, photographed by Bernard Gotfryd",
		portraitPosition: "center 20%",
		credit: {
			author: "Bernard Gotfryd",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Stephen_King,_1984_(1).jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "Cropped from the original.",
		},
		links: [
			{ label: "Site", href: "https://stephenking.com/" },
			{
				label: "On Writing",
				href: "https://stephenking.com/works/nonfiction/on-writing-a-memoir-of-the-craft.html",
			},
		],
		paragraphs: [
			"Stephen King is here because he treats writing as a job you show up for. Two thousand words a day, door closed, and the first draft is for nobody else. I open his book On Writing when I am waiting for the mood instead of sitting down.",
			"He was born in Portland, Maine in 1947 and taught high school English while he wrote Carrie, which came out in 1974. More than sixty novels followed, The Shining, It, and Misery among them. His book On Writing came out in 2000, and he finished it after a van hit him on a walk in 1999. This photograph is from 1984.",
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
		slug: "victor-hugo",
		name: "Victor Hugo",
		role: "Writer",
		portrait: "/wall/victor-hugo.jpg",
		portraitAlt: "Victor Hugo around 1884, photographed by Nadar",
		portraitPosition: "center 20%",
		credit: {
			author: "Nadar",
			sourceHref: "https://commons.wikimedia.org/wiki/File:Victor_Hugo_001.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "The photograph is black and white, so hover does not add color.",
		},
		links: [
			{ label: "Les Misérables", href: "https://www.gutenberg.org/ebooks/135" },
			{
				label: "Notre-Dame de Paris",
				href: "https://www.gutenberg.org/ebooks/2610",
			},
		],
		paragraphs: [
			"Victor Hugo is here because he put the people at the bottom at the center of the book. A convict, a child of the street, a woman who sells her hair. I read him when I start to see people as numbers.",
			"He was born in Besançon in 1802 and published Notre-Dame de Paris in 1831. He opposed Napoleon III and lived in exile for nineteen years, most of them on Guernsey, where he finished Les Misérables. The book came out in 1862. He came back to Paris in 1870 and died there in 1885. Nadar took this photograph around 1884.",
		],
	},
	{
		slug: "fyodor-dostoevsky",
		name: "Fyodor Dostoevsky",
		role: "Writer",
		portrait: "/wall/fyodor-dostoevsky.jpg",
		portraitAlt: "Fyodor Dostoevsky in 1876, photographed by Nikolai Dosse",
		portraitPosition: "center 20%",
		credit: {
			author: "Nikolai Dosse",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Dostoevskij_1876.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "Cropped from the original. The photograph is black and white, so hover does not add color.",
		},
		links: [
			{
				label: "Crime and Punishment",
				href: "https://www.gutenberg.org/ebooks/2554",
			},
			{
				label: "The Brothers Karamazov",
				href: "https://www.gutenberg.org/ebooks/28054",
			},
		],
		paragraphs: [
			"Fyodor Dostoevsky is here because he gives the worst idea its best lawyer. Raskolnikov, the Underground Man, Ivan Karamazov. He lets each one talk until you see where the idea goes. I read him when I am too sure that I am right.",
			"He was born in Moscow in 1821. In 1849 he stood in front of a firing squad, and the reprieve came at the last minute. Four years in a labor camp in Siberia followed. Crime and Punishment, The Idiot, Demons, and The Brothers Karamazov came after that. He died in Saint Petersburg in 1881. This photograph is from 1876.",
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
		slug: "arthur-schopenhauer",
		name: "Arthur Schopenhauer",
		role: "Philosopher",
		portrait: "/wall/arthur-schopenhauer.jpg",
		portraitAlt: "Arthur Schopenhauer in 1859, photographed by Johann Schäfer",
		portraitPosition: "center 20%",
		credit: {
			author: "Johann Schäfer",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Arthur_Schopenhauer_by_J_Sch%C3%A4fer,_1859b.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "The photograph is black and white, so hover does not add color.",
		},
		links: [
			{
				label: "The World as Will and Idea",
				href: "https://www.gutenberg.org/ebooks/38427",
			},
			{
				label: "The Wisdom of Life",
				href: "https://www.gutenberg.org/ebooks/10741",
			},
		],
		paragraphs: [
			"Arthur Schopenhauer is here because he did not flatter the reader. The will wants, gets, and wants again, and he says so in plain sentences. I read him when I think the next goal will finally be enough.",
			"He was born in Danzig in 1788 and published The World as Will and Representation in 1818, at thirty. Almost nobody read it for thirty years. He lived alone in Frankfurt with his poodles and continued to write, and the essays of 1851 made him known. He died in 1860. Nietzsche found the book in a shop in Leipzig in 1865. This photograph is from 1859.",
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
		slug: "aristotle",
		name: "Aristotle",
		role: "Philosopher",
		portrait: "/wall/aristotle.jpg",
		portraitAlt:
			"Roman marble bust of Aristotle in the Palazzo Altemps, photographed by Marie-Lan Nguyen",
		portraitPosition: "center 20%",
		credit: {
			author: "Marie-Lan Nguyen",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "Roman marble copy of a Greek bronze by Lysippos, in the Palazzo Altemps in Rome. The alabaster mantle is a modern addition.",
		},
		links: [
			{
				label: "Nicomachean Ethics",
				href: "https://www.gutenberg.org/ebooks/8438",
			},
			{
				label: "Stanford Encyclopedia",
				href: "https://plato.stanford.edu/entries/aristotle/",
			},
		],
		paragraphs: [
			"Aristotle is here because he looked before he explained. He collected the animals, the constitutions, and the arguments, and then he sorted them. I read him when I want to build a theory before I have the data.",
			"He was born in Stagira in 384 BC, studied at the Academy of Plato for twenty years, and taught Alexander. He started the Lyceum in Athens in 335 BC and wrote about logic, biology, ethics, and politics. He died in Chalcis in 322 BC. This bust is a Roman copy of a Greek bronze by Lysippos.",
		],
	},
	{
		slug: "marcus-aurelius",
		name: "Marcus Aurelius",
		role: "Emperor and philosopher",
		portrait: "/wall/marcus-aurelius.jpg",
		portraitAlt:
			"Roman marble bust of Marcus Aurelius in the Louvre, photographed by Marie-Lan Nguyen",
		portraitPosition: "center 15%",
		credit: {
			author: "Marie-Lan Nguyen",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Marcus_Aurelius_Louvre_MR561_n02.jpg",
			license: "CC BY 2.5",
			licenseHref: "https://creativecommons.org/licenses/by/2.5/",
			note: "Roman marble bust in the Louvre, made around 161 to 169 AD.",
		},
		links: [
			{ label: "Meditations", href: "https://www.gutenberg.org/ebooks/2680" },
			{
				label: "Stanford Encyclopedia",
				href: "https://plato.stanford.edu/entries/marcus-aurelius/",
			},
		],
		paragraphs: [
			"Marcus Aurelius is here because the Meditations were not written for a reader. He ran an empire and kept notes to himself about doing the next thing well and not complaining about it. I read him when I am angry at something I do not control.",
			"He was born in Rome in 121 and was emperor from 161 until he died in 180. He wrote the Meditations in Greek, much of it on campaign along the Danube. This bust was carved while he was alive.",
		],
	},
	{
		slug: "alexander-the-great",
		name: "Alexander the Great",
		role: "King and general",
		portrait: "/wall/alexander-the-great.jpg",
		portraitAlt:
			"Marble head of Alexander the Great from Pergamon in the Istanbul Archaeology Museums, photographed by Marie-Lan Nguyen",
		portraitPosition: "center 20%",
		credit: {
			author: "Marie-Lan Nguyen",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Alexander_the_Great_IAM_inv1138T_n2.jpg",
			license: "CC BY 4.0",
			licenseHref: "https://creativecommons.org/licenses/by/4.0/",
			note: "Marble head from Pergamon in the Istanbul Archaeology Museums, made around 200 to 150 BC.",
		},
		links: [
			{
				label: "Arrian, Anabasis",
				href: "https://www.gutenberg.org/ebooks/46976",
			},
			{
				label: "Plutarch, Alexander",
				href: "https://classics.mit.edu/Plutarch/alexandr.html",
			},
		],
		paragraphs: [
			"Alexander the Great is here because he did not wait until he was old enough. He was king at twenty and at the edge of the known world at thirty. I come back to him when a goal looks too large to start.",
			"He was born in Pella in 356 BC, and Aristotle taught him. He took the throne of Macedon in 336 BC, defeated the Persian Empire, and reached India before his army refused to go further. He died in Babylon in 323 BC at thirty-two, and his generals divided the empire. This head was carved in Pergamon more than a century after he died.",
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
	{
		slug: "niccolo-machiavelli",
		name: "Niccolò Machiavelli",
		role: "Diplomat and writer",
		portrait: "/wall/niccolo-machiavelli.jpg",
		portraitAlt: "Niccolò Machiavelli, painted by Santi di Tito",
		portraitPosition: "center 20%",
		credit: {
			label: "Painting",
			author: "Santi di Tito",
			sourceHref:
				"https://commons.wikimedia.org/wiki/File:Portrait_of_Niccol%C3%B2_Machiavelli_by_Santi_di_Tito.jpg",
			license: "Public domain",
			licenseHref: "https://creativecommons.org/publicdomain/mark/1.0/",
			note: "The painting is in the Palazzo Vecchio in Florence. Cropped from the original.",
		},
		links: [
			{ label: "The Prince", href: "https://www.gutenberg.org/ebooks/1232" },
			{
				label: "Discourses on Livy",
				href: "https://www.gutenberg.org/ebooks/10827",
			},
		],
		paragraphs: [
			"Niccolò Machiavelli is here because he wrote down how power works, not how it should work. The Prince is a short report from a man who lost his job and kept his eyes open. I read him when I confuse what people say with what they do.",
			"He was born in Florence in 1469 and served the republic as a secretary and diplomat for fourteen years. The Medici came back in 1512, removed him, and put him in prison for a short time. He wrote The Prince in 1513 on his farm near the city. The book came out in 1532, five years after he died. Santi di Tito painted this portrait after his death.",
		],
	},
];

export function getFamePerson(slug: string): FamePerson | undefined {
	return fame.find((person) => person.slug === slug);
}
