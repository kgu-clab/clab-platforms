import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTemplate = (props: SVGProps<SVGSVGElement>) => (
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
    <path fill="#BBDEFB" d="M4 7h40v34H4z" />
    <path fill="#3F51B5" d="M9 12h30v5H9z" />
    <path fill="#2196F3" d="M9 21h13v16H9zm17 0h13v16H26z" />
  </svg>
);
export default SvgTemplate;
