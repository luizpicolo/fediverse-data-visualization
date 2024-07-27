import fs from 'fs';
import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

// Função para calcular a moda
const calcularModa = (arr) => {
    const freqMap = arr.reduce((acc, { value }) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    const maxFreq = Math.max(...Object.values(freqMap));
    const modas = Object.keys(freqMap)
        .filter(key => freqMap[key] === maxFreq)
        .map(Number);

    return modas.length === arr.length ? [] : modas;
};

// Função para calcular a soma total dos valores
const calcularSomaTotal = (arr) => arr.reduce((acc, { value }) => acc + value, 0);

// Função para calcular média
const calcularMedia = (arr) => arr.reduce((acc, curr) => acc + curr, 0) / arr.length;

// Função para calcular mediana
const calcularMediana = (arr, key) => {
    const sorted = arr.slice().sort((a, b) => a[key] - b[key]);
    const meio = Math.floor(sorted.length / 2);

    return sorted.length % 2 === 0
        ? (sorted[meio - 1][key] + sorted[meio][key]) / 2
        : sorted[meio][key];
};

// Função para calcular a regressão linear
const calcularRegressaoLinear = (x, y) => {
    const xMedia = calcularMedia(x);
    const yMedia = calcularMedia(y);

    const { slope, intercept } = x.reduce((acc, xi, i) => {
        const xiDiff = xi - xMedia;
        acc.slope += xiDiff * (y[i] - yMedia);
        acc.denominator += xiDiff * xiDiff;
        return acc;
    }, { slope: 0, denominator: 0 });

    return {
        slope: slope / intercept,
        intercept: yMedia - (slope / intercept) * xMedia
    };
};

// Lendo o arquivo JSON
fs.readFile('./map/output/bubblechart.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        // Calculando a soma total dos valores
        const somaTotal = calcularSomaTotal(jsonData);

        // Extrair os valores para calcular média e mediana
        const valores = jsonData.map(({ value }) => value);
        const xValores = jsonData.map((_, index) => index); // Supondo que x seja o índice dos valores

        // Calcular e exibir resultados
        const moda = calcularModa(jsonData);
        const media = calcularMedia(valores);
        const mediana = calcularMediana(jsonData, 'value');
        const regressao = calcularRegressaoLinear(xValores, valores);

        console.log('Moda:', moda);
        console.log('Média:', media);
        console.log('Mediana:', mediana);
        console.log('Soma total dos valores:', somaTotal);
        console.log('Regressão Linear: y =', regressao.slope, '* x +', regressao.intercept);
    } catch (err) {
        console.error('Erro ao parsear JSON', err);
    }
});
