import * as React from "react";

interface EllipsisVerticalIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const EllipsisVerticalIcon = ({
  className = "",
  ...props
}: EllipsisVerticalIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={5}
    height={20}
    fill="none"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <circle cx={2.308} cy={2.308} r={2.308} fill="currentColor" />
    <circle cx={2.308} cy={10} r={2.308} fill="currentColor" />
    <circle cx={2.308} cy={17.692} r={2.308} fill="currentColor" />
  </svg>
);
