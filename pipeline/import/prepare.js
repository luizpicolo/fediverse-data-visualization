import chalk from 'chalk';
import MergeJsonTheFederation from "./helpers/MergeJsonTheFederation.js";
import FileCopy from "./helpers/FileCopy.js";
import CSVFileHandler from "./helpers/CSVFileHandler.js";

console.log(chalk.blue("Preparing files for import..."))

// Merge dos arquivos do the Federation
const mergeFile = new MergeJsonTheFederation();
mergeFile.input('./sources/nodes.json', './sources/statsnode.json');
mergeFile.output('./import/input')

// Copia os arquivos necessários para o input
const filesToCopy = [
  '../../sources/fedidb.json', 
  '../../sources/instances_social.json'
];
new FileCopy('./import/input').copyFiles(filesToCopy);

// Converter os arquivos CVS para JSOn
const csvFilePath = './sources/fedilist.csv';
const csvFileHandler = new CSVFileHandler();
csvFileHandler.input(csvFilePath);
csvFileHandler.output('./import/input/fedilist.json')
console.log(chalk.blue("Preparation finished"))
