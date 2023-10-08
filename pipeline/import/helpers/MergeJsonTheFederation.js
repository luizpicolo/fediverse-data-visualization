import chalk from 'chalk';
import { isValidJSON } from './Validation.js';
import fs from 'fs';

class MergeJsonTheFederation {
  #file1Path;
  #file2Path;
  #idToUsersTotalMap;
  #combinedData;

  constructor() {
    this.#idToUsersTotalMap = new Map();
    this.#combinedData = [];
  }

  input(file1Path, file2Path) {
    console.log(chalk.green('Input files'));
    this.#file1Path = file1Path;
    this.#file2Path = file2Path;
  }

  output(path) {
    try {
      console.log(chalk.green('Processing files'));
      this.#readAndMapFile();
      this.#combineData();
      this.#writeCombinedDataToFile(path);
      console.log(chalk.green('File processed successfully'));
    } catch (error) {
      throw new Error('An error occurred during processing:', error);
    }
  }

  #readAndMapFile() {
    try {
      const file2 = JSON.parse(fs.readFileSync(this.#file2Path));
      file2.data.statsNodes.forEach((item) => {
        const id = item.node.id;
        const usersTotal = item.usersTotal;
        this.#idToUsersTotalMap.set(id, usersTotal);
      });
    } catch (error) {
      throw new Error('Error reading and mapping file 2: ' + error);
    }
  }

  #combineData() {
    try {
      const file1 = JSON.parse(fs.readFileSync(this.#file1Path));
      this.#combinedData = file1.data.nodes.map((node) => {
        const id = node.id;
        const usersTotal = this.#idToUsersTotalMap.get(id);
        return { ...node, usersTotal };
      });
    } catch (error) {
      throw new Error('Error combining data: ' + error);
    }
  }

  #writeCombinedDataToFile(path) {
    try {
      const finalJSON = {
        data: this.#combinedData,
      };
      const json = JSON.stringify(finalJSON);
      if (isValidJSON(json)) {
        fs.writeFileSync(`${path}/combined.json`, JSON.stringify(finalJSON));
      }
    } catch (error) {
      throw new Error('Error writing combined data to the file: ' + error);
    }
  }
}

export default MergeJsonTheFederation;
