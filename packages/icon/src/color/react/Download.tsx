import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
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
    <g fill="#1565C0">
      <path d="M24 37.1 13 24h22zM20 4h8v4h-8zm0 6h8v4h-8z" />
      <path d="M20 16h8v11h-8zM6 40h36v4H6z" />
    </g>
  </svg>
);
export default SvgDownload;
