import chalk from 'chalk';
import { isValidJSON } from '../helpers/Validation.js';
import { readFileSync, writeFileSync } from 'fs';
import { formatDomain } from '../helpers/ClearDomain.js';

class Mapper {
  #jsonObject;
  #attributesToMap;
  #deleteNodes;

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

  set deleteNodes(nodes) {
    this.#deleteNodes = nodes;
  }

  #removeDuplicates(json, chart) {
    const map = new Map();
    json.forEach(item => {
        const existingItem = map.get(item.id);
        if (!existingItem || item.value > existingItem.value) {
            map.set(item.id, item);
        }
    });

    this.#deleteNodes.forEach((node) => {
      //console.log(chalk.blue(`Delete nodes ${node} to BubleChart...`));
      if (chart.toLowerCase() == "bubblechart"){
        map.delete(`flare.mastodon.${node}`);
      }

      //console.log(chalk.blue(`Delete nodes ${node} to BarChart...`));
      if (chart.toLowerCase() == "barchart"){
        map.delete(`${node}`);
      }
    })
    
    return Array.from(map.values());
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
              // Mapping to BubbleChart
              if (chart.toLowerCase() == 'bubblechart'){
                mappedData.push({
                  "id": `flare.mastodon.${formatDomain(node[`${attributes[0]}`])}`,
                  "value": node[`${attributes[1]}`] || 1
                });
              } 

              // Mapping to BarChart
              if (chart.toLowerCase() == "barchart") {
                mappedData.push({
                  id: `${formatDomain(node[`${attributes[0]}`])}`,
                  value: parseInt(node[`${attributes[1]}`]) || 1,
                });
              }

            });
          }
        });
      });

      return this.#removeDuplicates(mappedData, chart);
    } catch (error) {
      console.error("Error mapping attributes:", error.message);
    }
  }
}

export default Mapper;
