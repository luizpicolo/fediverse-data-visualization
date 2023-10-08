import Import from "./import/Import.js";

// Primeiro passo do Pipeline
const _import = new Import();
_import.input('./import/input')
_import.output('./import/output')