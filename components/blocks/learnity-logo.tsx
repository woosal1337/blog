import type {SVGProps} from "react";

interface Props extends SVGProps<SVGSVGElement> {
}

const LearnityLogo = (props: Props) => (
  <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1024" height="1024" rx="92" fill="url(#paint0_linear_80415_170)"/>
    <path
      d="M283 737.836V175C283 157.327 297.327 143 315 143H392.854C410.527 143 424.854 157.327 424.854 175V698.516C424.854 711.287 426.205 721.705 428.907 729.771C432.285 737.164 437.689 742.205 445.119 744.893C453.225 747.582 459.642 749.262 464.371 749.934C469.099 750.607 476.868 750.943 487.676 750.943H710C727.673 750.943 742 765.27 742 782.943V849C742 866.673 727.673 881 710 881H437.013C334.338 881 283 833.279 283 737.836Z"
      fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_80415_170" x1="51.2" y1="32.9143" x2="1024" y2="1024"
                      gradientUnits="userSpaceOnUse">
        <stop stop-color="#A796F7"/>
        <stop offset="1" stop-color="#5C4FF3"/>
      </linearGradient>
    </defs>
  </svg>
);

export default LearnityLogo;
