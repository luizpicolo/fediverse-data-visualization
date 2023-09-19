const Validation = require("./validation");

// Aqui deve vir todo o algoritmo para unir os dados

const output = '{"name": "John", "age": 30}';
if (Validation.isValidJSON(output)) {
  console.log('JSON is valid');
} else {
  console.log('JSON is not valid');
}
