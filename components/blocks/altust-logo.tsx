import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const AltustLogo = (props: Props) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="200pt"
    height="200pt"
    viewBox="0 0 200 200"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g
      transform="translate(0,200) scale(0.1,-0.1)"
      fill="#000000"
      stroke="none"
    >
      <path d="M0 1000 l0 -1000 1000 0 1000 0 0 1000 0 1000 -1000 0 -1000 0 0 -1000z m1147 526 c12 -11 453 -1108 453 -1126 0 -6 -40 -10 -99 -10 -85 0 -100 2 -106 17 -4 10 -27 72 -51 137 -25 66 -47 123 -49 126 -3 4 -154 -39 -337 -95 l-333 -103 -18 -41 -18 -41 -99 0 -100 0 11 28 c6 15 104 277 219 582 115 305 213 567 219 581 l10 27 143 -35 c79 -20 148 -41 155 -47z" />
      <path d="M967 1374 c-16 -42 -25 -80 -20 -84 13 -13 133 -59 133 -52 0 13 -75 212 -80 212 -3 0 -18 -34 -33 -76z" />
      <path d="M885 1156 c-33 -79 -64 -167 -57 -163 89 48 232 142 221 145 -7 3 -45 15 -82 28 l-68 23 -14 -33z" />
      <path d="M1053 1006 c-50 -28 -94 -54 -97 -57 -3 -3 55 -29 130 -58 74 -29 137 -51 140 -48 5 4 -65 198 -75 208 -3 3 -47 -17 -98 -45z" />
      <path d="M725 742 c-26 -68 -45 -125 -43 -126 7 -6 437 129 430 135 -4 4 -82 31 -174 60 l-166 54 -47 -123z" />
    </g>
  </svg>
);

export default AltustLogo;