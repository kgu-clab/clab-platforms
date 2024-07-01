/* eslint-disable no-undef */
function template({ componentName, props, jsx }, { tpl }) {
  return tpl`  
  import type { SVGProps } from 'react';
  
  const ${componentName} = ${props} => {
    return (
      ${jsx}
    );
  };
    
  export default ${componentName};
  `;
}

module.exports = template;
