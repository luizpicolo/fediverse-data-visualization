import './prepare.js'; // Prepara os arquivos para a importação

import chalk from 'chalk';
import { isValidJSON } from './helpers/Validation.js';
import { promises, readFileSync, writeFileSync } from 'fs';
import { extname, join, basename } from 'path';

class Import {
  #directoryPath;
  #data = [];

  input(path) {
    this.#directoryPath = path;
  }

  output(path) {
    this.readJSONFilesInDirectory()
      .then(() => {
        this.#writeJSONFile(path);
      })
      .catch((error) => {
        throw new Error(`Error output: ${error.message}`);
      });
  }

  async readJSONFilesInDirectory() {
    console.log(chalk.green('Reading directory to JSON files'));
    try {
      const files = await promises.readdir(this.#directoryPath);
      const jsonFiles = files.filter((file) => extname(file).toLowerCase() === '.json');

      for (const jsonFile of jsonFiles) {
        const filePath = join(this.#directoryPath, jsonFile);

        try {
          const jsonData = this.#readJSONFile(filePath);
          this.#data.push({ fileName: basename(filePath), data: jsonData });
        } catch (error) {
          this.#data.push({ fileName: basename(filePath), error: error.message });
        }
      }

      return this.#data;
    } catch (error) {
      throw new Error(`Error reading directory: ${error.message}`);
    }
  }

  #readJSONFile(filePath) {
    const data = readFileSync(filePath);
    return JSON.parse(data);
  }

  #writeJSONFile(path) {
    console.log(chalk.green('Writing JSON file'));
    try {
      const finalJSON = {
        data: this.#data,
      };
      const json = JSON.stringify(finalJSON);
      if (isValidJSON(json)) {
        writeFileSync(`./${path}/combined.json`, json);
      }
    } catch (error) {
      throw new Error('Error writing combined data to the file: ' + error);
    }
  }
}

export default Import;
