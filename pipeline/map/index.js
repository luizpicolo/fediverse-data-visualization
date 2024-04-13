import chalk from 'chalk';
import { isValidJSON } from '../helpers/Validation.js';
import { readFileSync, writeFileSync } from 'fs';
import { formatDomain } from '../helpers/ClearDomain.js';

class Mapper {
  #jsonObject;
  #attributesToMap;

  input(path) {
    try {
      console.log(chalk.blue('Mapping Files...'));
      this.#jsonObject = this.#readJSONFile(path);
    } catch (error) {
      console.error("Error defining the JSON object:", error);
    }
  }

  output(path, chart) {
    try {
      if (chart){
        const mappedJson = this.#mapAttributes(this.#attributesToMap, chart);
        if (isValidJSON(mappedJson) && mappedJson[0]) {
          this.#writeJSONFile(path, mappedJson, chart);
          console.log(chalk.blue(`Mapper Files to ${chart} Finished`));
        }
      }
    } catch (error) {
      console.error("Error outputting mapped JSON:", error.message);
    }
  }

  #readJSONFile(filePath) {
    console.log(chalk.green(' --> Reading JSON Files'));
    const data = readFileSync(filePath);
    return JSON.parse(data);
  }

  #writeJSONFile(path, fileJson, chart) {
    try {
      const json = JSON.stringify(fileJson);
      writeFileSync(`./${path}/${chart.toLowerCase()}.json`, json);
    } catch (error) {
      throw new Error('Error writing mapped data to the file: ' + error);
    }
  }

  #getNode(item) {
    return item.data.data || item.data.instances || item.data;
  }

  set mapAttributes(attributes) {
    this.#attributesToMap = attributes;
  }

  #mapAttributes(attributesToMap, chart) {
    try {
      const mappedData = [];

      this.#jsonObject.data.forEach(item => {
        const nodes = this.#getNode(item);

        attributesToMap.forEach(attributes => {
          const allAttributesPresent = attributes.every(attribute => nodes[0].hasOwnProperty(attribute));

          if (allAttributesPresent) {
            nodes.forEach(node => {
              // name e users
              // hostname, user_count
              // domain, stats -> { user_count }
              // name, host, usersTotal

              // Mapping to BubbleChart
              if (chart.toLowerCase() == 'bubblechart' && node[`${attributes[1]}`] != null){
                mappedData.push({
                  "id": `flare.mastodon.${formatDomain(node[`${attributes[0]}`])}`,
                  "value": node[`${attributes[1]}`].user_count || node[`${attributes[1]}`]
                });
              }
            });
          }
        });
      });

      return mappedData;
    } catch (error) {
      console.error("Error mapping attributes:", error.message);
    }
  }
}

export default Mapper;
