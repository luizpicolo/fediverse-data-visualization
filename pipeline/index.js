import Import from "./import/Import.js";

import './import/prepare.js'; // Prepara os arquivos para a importação

// Primeiro passo do Pipeline
const _import = new Import();
_import.input('./import/input')
_import.output('./import/output')