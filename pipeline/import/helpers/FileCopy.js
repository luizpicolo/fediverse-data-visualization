import chalk from 'chalk';
import { copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, basename, dirname } from 'path';

class FileCopy {
  #destinationDir;

  constructor(destinationDir) {
    this.#destinationDir = destinationDir;
  }

  copyFiles(fileNames) {
    const currentFileDirectory = dirname(fileURLToPath(import.meta.url));

    fileNames.forEach((fileName) => {
      const sourceFile = join(currentFileDirectory, fileName);
      const destFilePath = join(this.#destinationDir, basename(fileName));

      try {
        console.log(chalk.green(` --> Copying a file ${fileName}!`));
        copyFileSync(sourceFile, destFilePath);
      } catch (err) {
        console.error(chalk.red(`Error copying ${fileName}: ${err}`));
      }
    });
  }
}

export default FileCopy;
