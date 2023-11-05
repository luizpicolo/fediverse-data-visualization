import chalk from 'chalk';
import { isValidJSON } from './Validation.js';
import { readFileSync, writeFileSync } from 'fs';

class CSVFileHandler {
  #csvFilePath;

  input(csvFilePath) {
    console.log(chalk.green('Input CSV files'));
    this.#csvFilePath = csvFilePath;
  }

  output(filePath) {
    try {
      console.log(chalk.green('Processing CSV files'));
      let content = this.#readCSVFile();
      this.#createFile(filePath, JSON.stringify(content));
      console.log(chalk.green('File processed successfully'));
    } catch (error) {
      throw new Error('An error occurred during processing:', error);
    }
  }

  #readCSVFile() {
    try {
      const data = readFileSync(this.#csvFilePath, 'utf8');
      const lines = data.split('\n');
      const headers = lines[0].split(',');
      const jsonData = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(',');
        const entry = {};

        for (let j = 0; j < headers.length; j++) {
          entry[headers[j]] = line[j];
        }

        jsonData.push(entry);
      }

      return jsonData;
    } catch (error) {
      console.error('Error while reading the CSV file:', error);
      return null;
    }
  }

  #createFile(filePath, content) {
    try {
      if (isValidJSON(content)) {
        writeFileSync(filePath, content);
        console.log(chalk.green(`The file ${filePath} has been created successfully.`));
      }
    } catch (error) {
      console.error('Error while creating the file:', error);
    }
  }
}

export default CSVFileHandler;
