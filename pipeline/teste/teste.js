const math = require('mathjs');
const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Configuração do ChartJSNodeCanvas
const width = 800; // largura do gráfico
const height = 600; // altura do gráfico
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

// Lendo dados do arquivo JSON
const rawData = fs.readFileSync('../map/output/bubblechart.json');
const dados = JSON.parse(rawData);
dados.sort((a, b) => a.value - b.value);

//console.table(dados)

const valores = dados.map(d => d.value);

// Análise Descritiva
const media = math.mean(valores);
const mediana = math.median(valores);
const desvioPadrao = math.std(valores);

console.log(`Média: ${media}`);
console.log(`Mediana: ${mediana}`);
console.log(`Desvio Padrão: ${desvioPadrao}`);

// Classificação e Contagem
const menosQueMediana = valores.filter(x => x <= mediana).length;
const maisQueMediana = valores.filter(x => x > mediana).length;

console.log(`Número de redes com menos usuários que a mediana: ${menosQueMediana}`);
console.log(`Número de redes com mais usuários que a mediana: ${maisQueMediana}`);