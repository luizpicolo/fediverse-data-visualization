import Import from "./import/index.js";

// Primeiro passo do Pipeline
const _import = new Import();
_import.input('./import/input')
_import.output('./import/output')