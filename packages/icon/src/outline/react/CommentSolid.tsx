import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCommentSolid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    data-slot="icon"
    viewBox="0 0 32 32"
    {...props}
  >
    <path d="M3 6v20h9.586L16 29.414 19.414 26H29V6Zm2 2h22v16h-8.414L16 26.586 13.414 24H5Zm4 3v2h14v-2Zm0 4v2h14v-2Zm0 4v2h10v-2Z" />
  </svg>
);
export default SvgCommentSolid;
