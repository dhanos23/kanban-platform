import { SVGProps } from "react";

export const LogoLightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="153"
    height="26"
    viewBox="0 0 153 26"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FFF"
        d="M44.56 25v-5.344l1.92-2.112L50.928 25h5.44l-6.304-10.432 6.336-7.04h-5.92l-5.92 6.304V.776h-4.8V25h4.8Z"
      />
      <g fill="#635FC7" transform="translate(0 1)">
        <rect width={6} height={25} rx={2} />
        <rect width={6} height={25} x={9} opacity={0.75} rx={2} />
        <rect width={6} height={25} x={18} opacity={0.5} rx={2} />
      </g>
    </g>
  </svg>
);
