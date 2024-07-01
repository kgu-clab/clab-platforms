import * as React from 'react';
import type { SVGProps } from 'react';

const SvgApproval = (props: SVGProps<SVGSVGElement>) => (
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
      fill="#8BC34A"
      d="m24 3 4.7 3.6 5.8-.8 2.2 5.5 5.5 2.2-.8 5.8L45 24l-3.6 4.7.8 5.8-5.5 2.2-2.2 5.5-5.8-.8L24 45l-4.7-3.6-5.8.8-2.2-5.5-5.5-2.2.8-5.8L3 24l3.6-4.7-.8-5.8 5.5-2.2 2.2-5.5 5.8.8z"
    />
    <path
      fill="#CCFF90"
      d="M34.6 14.6 21 28.2l-5.6-5.6-2.8 2.8 8.4 8.4 16.4-16.4z"
    />
  </svg>
);
export default SvgApproval;
