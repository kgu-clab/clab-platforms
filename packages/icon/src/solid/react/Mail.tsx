import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    data-slot="icon"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fillRule="evenodd" d="M23 20V6l-11 9L1 6v14zm-11-8 10-8H2z" />
  </svg>
);
export default SvgMail;
