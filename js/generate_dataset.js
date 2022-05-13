var fs = require('fs');
const Nodes = require('../data/nodes.json');
const StatsNode = require('../data/statsnode.json') 

const nodes = Nodes.data.nodes;
const stats = StatsNode.data.statsNodes;

function result_by_stats(stats, plataform){
  return stats.filter(
    el => el.node.id === plataform.id
  );
}

function result_by_country(country_name){
  return nodes.filter(
    el => el.countryName === country_name
  );
}

function uniq(a) {
  return Array.from(new Set(a));
}

function get_all_countries(){
  let countries = []
  nodes.forEach(element => {
    countries.push(element.countryName)
  });

  return uniq(countries)
}

function get_all_plataforms(){
  let platforms = []
  nodes.forEach(element => {
    platforms.push(element.platform.name)
  });

  return uniq(platforms)
}

function result_by_plataform(country_code, platform){
  return result_by_country(country_code).filter(
    el => el.platform.name === platform
  );
}

function format_json(name, usersTotal){
  let name_ = name.replace(/[\\"]/g, '')
  return `{ "name": "${name_}", "children": [ { "name": "${name_}", "size": "${usersTotal}" } ] }`
}

function users_total(result_stats){
  return result_stats.length == 0 ? 0 : result_stats[0].usersTotal
}

function format_dataset(countries = [], plataforms = []){
  var dataset = {};
  dataset.name = "Fediverse";
  dataset.children = [{}];
  
  countries.forEach((country, c) => {
    dataset.children[c] = {};
    dataset.children[c].name = country;
    dataset.children[c].children = [{}];

    plataforms.forEach((plataform, p) => {
      let nodes = result_by_plataform(country, plataform)
      dataset.children[c].children[p] = {};
      dataset.children[c].children[p].name = plataform;
      dataset.children[c].children[p].children = [{}];
     
      nodes.forEach((node, n) => {
        node_formated = format_json(node.name, users_total(result_by_stats(stats, node)));
        dataset.children[c].children[p].children[n] = JSON.parse(node_formated);
      });
    });
  });
  
  return JSON.stringify(dataset)
}

let json = format_dataset(get_all_countries(), get_all_plataforms())
fs.writeFile("./data/dataset.json", json, function(err, result) {
  if(err) console.log('error', err);
});