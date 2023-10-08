const Validation = require("./validation");
const fediDB = require("../../d3js/data/fedidb_290823.json")
const fediverseParty = require("../../d3js/data/fediverse_party_280823.json")
const instancesSocial = require("../../d3js/data/instances_social1_230823.json")
const instancesSocial2 = require("../../d3js/data/instances_social2_230823.json")
const instancesSocial3 = require("../../d3js/data/instances_social3_230823.json")
const theFederationInfo = require("../../d3js/data/the_federation_info_100923.json")
const theFederationInfo2 = require("../../d3js/data/the_federation_info_110923.json")

// Aqui deve vir todo o algoritmo para unir os dados

// Aqui todos os JSONs importados estão em um array
const data = [fediDB, fediverseParty, instancesSocial, instancesSocial2, instancesSocial3, theFederationInfo, theFederationInfo2]

// Aqui um objeto é inicializado para receber os dados
const JSONs = {}

// Aqui cada JSON é iterado e seus dados são adicionagidos ao objeto JSONs caso ele seja válido
for (item of data) {
  Validation.isValidJSON(JSON.stringify(item)) && Object.assign(JSONs, item)
}
