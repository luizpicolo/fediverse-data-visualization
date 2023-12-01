import chalk from 'chalk';
import { isValidJSON } from '../helpers/Validation.js';
import { readFileSync, writeFileSync } from 'fs';

class Filter {
  #jsonObject;
  #attributesToRemove;

  input(path) {
    try {
      console.log(chalk.blue('Filtering Files...'));
      this.#jsonObject = this.#readJSONFile(path);
    } catch (error) {
      console.error("Error defining the JSON object:", error);
    }
  }

  output(path) {
    const filteredJson = this.#removeAttributes(this.#attributesToRemove);
    if (isValidJSON(filteredJson)) {
      this.#writeJSONFile(path, filteredJson);
      console.log(chalk.blue('Filter Files Finished'));
    } 
  }

  #readJSONFile(filePath) {
    console.log(chalk.green(' --> Reading Json Files'));
    const data = readFileSync(filePath);
    return JSON.parse(data);
  }

  #writeJSONFile(path, fileJson) {
    console.log(chalk.green('  --> Writing JSON file Filtered'));
    try {
      const json = JSON.stringify(fileJson);
      if (isValidJSON(json)) {
        writeFileSync(`./${path}/filtered.json`, json);
      }
    } catch (error) {
      throw new Error('Error writing filtered data to the file: ' + error);
    }
  }

  set removeAttributes(attributes) {
    this.#attributesToRemove = attributes;
  }

  #getNode(item) {
    return item.data.data || item.data.instances || item.data;
  }

  #removeAttributes(attributesToRemove) {
    try {
      if (!Array.isArray(attributesToRemove) || attributesToRemove.length === 0) {
        throw new Error("The array of attributes to be removed is empty or not an array.");
      }

      if (!Array.isArray(this.#jsonObject.data) || this.#jsonObject.data.length === 0) {
        throw new Error("The array of data in the object is empty or not an array.");
      }

      this.#jsonObject.data.forEach(item => {
        const node = this.#getNode(item);

        attributesToRemove.forEach(attribute => {
          node.forEach(element => {
            if (element.hasOwnProperty(attribute)) {
              delete element[attribute];
            }
          });
        });
      });

      return this.#jsonObject;
    } catch (error) {
      console.error("Error removing attributes:", error.message);
    }
  }
}

export default Filter;
