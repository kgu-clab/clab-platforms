/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

// 관리할 디렉토리
const directories = [
  { dir: 'color', subDir: 'react' },
  { dir: 'outline', subDir: 'react' },
  { dir: 'solid', subDir: 'react' },
];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

directories.forEach(({ dir, subDir }) => {
  const directoryPath = path.join(__dirname, '..', 'src', dir, subDir);
  const outputPath = path.join(__dirname, '..', 'src', dir, 'index.ts');

  fs.readdir(directoryPath, (err: NodeJS.ErrnoException, files: string[]) => {
    if (err) {
      console.error('Error reading directory', err);

      return;
    }

    const exportStatements = files
      .filter((file) => file.endsWith('.tsx'))
      .map((file) => {
        const componentName = file.replace('.tsx', '');

        return `export { default as ${componentName}${capitalize(dir)} } from './${subDir}/${componentName}';\n`;
      })
      .join('');

    fs.writeFile(outputPath, exportStatements, (err: NodeJS.ErrnoException) => {
      if (err) {
        console.error('Error writing to file', err);
        return;
      }
      console.log(`Exports generated successfully for ${dir}.`);
    });
  });
});
