import GiderimLogo from "@/components/blocks/giderim-logo";
import {IconSmashing} from "@/components/icons/smashing";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import LearnityLogo from "@/components/blocks/learnity-logo";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
export const formattedDateTimeline = (
  date: string,
  formatOpts?: Intl.DateTimeFormatOptions | undefined,
) =>
  new Date(date).toLocaleDateString(
    "en-US",
    formatOpts
      ? formatOpts
      : {
        year: "numeric",
      },
  );

export const navItems = [
  {href: "/", label: "Readme"},
  {href: "/changelog", label: "Changelog"},
  // { href: "/notes", label: "Notes" }, // disabled for now
  {href: "/projects", label: "Projects"},
  {href: "/stack", label: "Stack"},
];

export const careerItems = [
  {
    from: 2023,
    to: "∞",
    title: "CTO & Co-Founder",
    company: {name: "Learnity", url: "https://learnity.ai"},
    location: "Istanbul, Turkey",
    description: "AI-powered EdTech platform offering students collaborative learning tools, flashcards, quizzes, and social features through an advanced UI/UX.",
  },
  {
    from: 2023,
    to: 2024,
    title: "Software Developer",
    company: {name: "Etrapay", url: "https://www.etrapay.com/"},
    location: "Istanbul, Turkey",
    description: "Blockchain-based, fee-free global payments with enhanced privacy.",
  },
  {
    from: 2023,
    to: 2024,
    title: "Software Developer",
    company: {name: "ByBike", url: "https://www.bybike.tech/"},
    location: "Istanbul, Turkey",
    description: "Micromobility solutions with hardware and software for fleet management.",
  },
  {
    from: 2022,
    to: 2023,
    title: "Co-Founder & Software Developer",
    company: {name: "yeklabs", url: "https://www.yeklabs.com/"},
    location: "Istanbul, Turkey",
    description: "BaaS provider exporting blockchain solutions to Dubai and Miami.",
  },
  {
    from: 2022,
    to: 2023,
    title: "Blockchain Developer Intern",
    company: {name: "PATH", url: "https://path.com.tr/"},
    location: "Istanbul, Turkey",
    description: "Product and software development house focused on digital solutions and consultancy.",
  },
  {
    from: 2021,
    to: 2022,
    title: "Blockchain Developer",
    company: {name: "NextDream", url: "https://nextdream.io/"},
    location: "Istanbul, Turkey",
    description: "Decentralized Web 3.0 platform offering a blockchain ecosystem for creators, innovators, and investors.",
  },
];

const dateFormat = {
  day: {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  },
  month: {
    year: "numeric" as const,
    month: "long" as const,
  },
  year: {
    year: "numeric" as const,
  },
};

const changelogItems: Array<{
  date: string;
  event: string;
  title: string;
  description?: string;
  icon?: string;
  dateFormatOptions?: (typeof dateFormat)[keyof typeof dateFormat];
  photos?: Array<{ src: string; variant: "1x1" | "4x3" | "4x5" }>;
}> = [
  {
    date: "2024-08-15",
    event: "Education",
    title: "I have started my MSc degree.",
    description: "I have started my master's degree in CEng at @Medipol",
    icon: "🏫",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/uni 4x3.jpg",
        variant: "4x3",
      },
      {
        src: "/changelog/msc.jpg",
        variant: "1x1",
      },
    ],
  },
  {
    date: "2024-05-15",
    event: "Education",
    title: "I have graduated from Medipol BSc degree.",
    description: "I have graduated from my bachelor's degree in CEng at @Medipol",
    icon: "🏫",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/bsc 1.png",
        variant: "1x1",
      },
      {
        src: "/changelog/bsc 2.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2023-12-10",
    event: "Competition",
    title: "Anadolu Ajansı Media Hackathon",
    description: "As a team of two, we became finalists at the Anadolu Ajansı Media Hackathon.",
    icon: "🏆",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/anadolu 1.png",
        variant: "4x3",
      },
      {
        src: "/changelog/anadolu 2.jpg",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2023-12-10",
    event: "Organization",
    title: "Ministry of Youth and Sports of Turkiye",
    description: "Hosted & mentored the Genc Blokzincir Hackathon for the Ministry of Youth and Sports of Turkiye.",
    icon: "💻",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/gencblokzincir 1.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2022-11-15",
    event: "Fellow & Alumni",
    title: "GirVak (Türkiye Girişimcilik Vakfı)",
    description: "I was selected as a fellow at GirVak, being one of 28 chosen out of 140,000 applicants.",
    icon: "⭐",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/girvak 1.png",
        variant: "4x3",
      },
      {
        src: "/changelog/girvak 2.png",
        variant: "4x3",
      },
      {
        src: "/changelog/girvak 3.png",
        variant: "1x1",
      },
    ],
  },
  {
    date: "2022-10-02",
    event: "Competition",
    title: "Akbank ReFi Hackathon",
    description: "We placed 3rd at the Akbank ReFi Hackathon and received ₺40,000.",
    icon: "🏆",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/akbank 1.png",
        variant: "1x1",
      },
      {
        src: "/changelog/akbank 2.png",
        variant: "1x1",
      },
      {
        src: "/changelog/akbank 4.png",
        variant: "1x1",
      },
      {
        src: "/changelog/akbank 3.png",
        variant: "1x1",
      },
      {
        src: "/changelog/akbank 5.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2022-05-15",
    event: "Competition",
    title: "ACIKHACK Blockhain, NFT & Metaverse Hackathon",
    description: "We placed 1st at the ACIKHACK Blockhain Hackathon and received ₺100,000.",
    icon: "🏆",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/acikhack 1.png",
        variant: "4x3",
      },
      {
        src: "/changelog/acikhack 2.png",
        variant: "1x1",
      },
    ],
  },
  {
    date: "2021-12-10",
    event: "Competition",
    title: "Avalanche Hackathon Istanbul",
    description: "We placed 2nd at the Avalanche Hackathon Istanbul and received $15,000.",
    icon: "🏆",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/avalanche 2.jpeg",
        variant: "1x1",
      },
      {
        src: "/changelog/avalanche 1.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2021-11-15",
    event: "Volunteering",
    title: "Medipol Blockchain Community",
    description: "I have co-founded the Medipol Blockchain Community.",
    icon: "🏆",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/mbc 1.png",
        variant: "4x3",
      },
      {
        src: "/changelog/mbc 2.png",
        variant: "1x1",
      },
      {
        src: "/changelog/mbc 3.png",
        variant: "1x1",
      },
      {
        src: "/changelog/mbc 4.png",
        variant: "4x3",
      },
      {
        src: "/changelog/mbc 5.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2021-10-15",
    event: "Competition",
    title: "Medipol Autonomous Vehicles",
    description: "We have become finalists @Teknofest Fighting UAVs competition.",
    icon: "🏆",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/mav 1.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2021-09-15",
    event: "Volunteering",
    title: "Google DSC Medipol",
    description: "I have co-founded the GDSC at Medipol University.",
    icon: "🙌",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/dscmedipol 4x3.png",
        variant: "4x3",
      },
      {
        src: "/changelog/dscmedipol 1.png",
        variant: "4x3",
      },
      {
        src: "/changelog/dscmedipol 2.png",
        variant: "4x3",
      },
      {
        src: "/changelog/dscmedipol 4.png",
        variant: "4x3",
      },
      {
        src: "/changelog/dscmedipol 5.png",
        variant: "4x3",
      },
      {
        src: "/changelog/dscmedipol 6.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2021-09-15",
    event: "Volunteering",
    title: "Translated CS50x to Azerbaijani",
    description: "I have translated the CS50x course to Azerbaijani with a team of volunteers.",
    icon: "🙌",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/kodluyoruz 4x3.png",
        variant: "4x3",
      },
    ],
  },
  {
    date: "2019-09-15",
    event: "Education",
    title: "I have started my BSc degree.",
    description: "I have started my bachelor's degree in CEng at @Medipol",
    icon: "🏫",
    dateFormatOptions: dateFormat.day,
    photos: [
      {
        src: "/changelog/uni 1x1.png",
        variant: "1x1",
      },
      {
        src: "/changelog/uni 4x3.jpg",
        variant: "4x3",
      },
    ],
  },
] as const;

export const changelog = changelogItems.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const projects = [
  {
    name: "Learnity",
    released: "2024-09-01",
    description: "AI-powered learning platform with collaboration tools.",
    link: {href: "https://learnity.ai", label: "learnity.ai"},
    logo: <LearnityLogo className="size-10"/>,
  },
];
