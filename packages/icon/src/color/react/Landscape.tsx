import * as React from 'react';
import type { SVGProps } from 'react';

const SvgLandscape = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    data-slot="icon"
    viewBox="0 0 48 48"
    {...props}
  >
    <g fill="#FF9800">
      <path d="m40.997 6.065 7 7-7 6.999-7-7z" />
      <path d="M36 8h10v10H36z" />
    </g>
    <circle cx={41} cy={13} r={3} fill="#FFEB3B" />
    <path fill="#2E7D32" d="M16.5 18 0 42h33z" />
    <path fill="#4CAF50" d="M33.6 24 19.2 42H48z" />
  </svg>
);
export default SvgLandscape;
