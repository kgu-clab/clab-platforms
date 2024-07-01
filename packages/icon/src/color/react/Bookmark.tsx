import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBookmark = (props: SVGProps<SVGSVGElement>) => (
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
    <path
      fill="#F44336"
      d="m37 43-13-6-13 6V9c0-2.2 1.8-4 4-4h18c2.2 0 4 1.8 4 4z"
    />
  </svg>
);
export default SvgBookmark;
