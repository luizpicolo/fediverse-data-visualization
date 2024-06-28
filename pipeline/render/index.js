import chalk from 'chalk';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.input = (pathToAdd) => { 
  console.log(chalk.blue('Rendering...'));
};

app.get('/', (req, res) => {
  res.render('bubble_chart');
});

export default app;