import chalk from 'chalk';
import MergeJsonTheFederation from "./helpers/MergeJsonTheFederation.js";
import FileCopy from "./helpers/FileCopy.js";

console.log(chalk.green("Preparing files for import..."))

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

console.log(chalk.green("Preparation finished"))
