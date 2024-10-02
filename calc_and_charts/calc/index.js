const math = require('mathjs');
const fs = require('fs');

// Lendo dados do arquivo JSON
const rawData = fs.readFileSync('bubblechart.json');
const dados = JSON.parse(rawData);

console.log(dados.length)

// Organizando os dados
dados.sort((a, b) => a.value - b.value);

const valores = dados.map(d => d.value);

// Análise Descritiva
const media = math.mean(valores);
const mediana = math.median(valores);
const desvioPadrao = math.std(valores);

console.log(`Média: ${media}`);
console.log(`Mediana: ${mediana}`);
console.log(`Desvio Padrão: ${desvioPadrao}`);

// Classificação e Contagem
const corte = 100000;
const menosQueMediana = valores.filter(x => x <= mediana);
const maisQueMediana = valores.filter(x => x > mediana);

const acima = valores.filter(x => x >= corte);
const somaAcima = acima.reduce((acc, val) => acc + val, 0);

const abaixo = valores.filter(x => x < corte);
const somaAbaixo = abaixo.reduce((acc, val) => acc + val, 0);

// Contagem total de usuários
const totalUsuarios = valores.reduce((acc, val) => acc + val, 0);

console.log(`Número de redes com menos usuários que a mediana: ${menosQueMediana.length}`);
console.log(`Número de redes com mais usuários que a mediana: ${maisQueMediana.length}`);
console.log(`Nós acima do corte de ${corte} é igual a ${acima.length} com a quantidade de usuários igual a ${somaAcima} usuários`)
console.log(`Nós abaixo do corte de ${corte} é igual a ${abaixo.length} com a quantidade de usuários igual a ${somaAbaixo} usuários`)
console.log(`Total de usuários: ${totalUsuarios}`);
