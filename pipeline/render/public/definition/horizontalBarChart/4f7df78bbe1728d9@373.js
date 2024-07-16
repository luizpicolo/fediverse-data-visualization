// function _1(md){return(
// md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Horizontal bar chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

// # Horizontal bar chart

// This chart shows the quantity of users in a descentralized social network.`
// )}

function _chart(barchart,d3)
{
  // Specify the chart’s dimensions, based on a bar’s height.
  const barHeight = 25;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 10;
  const marginLeft = 175;
  const width = 928;
  const height = Math.ceil((barchart.length + 0.1) * barHeight) + marginTop + marginBottom;

  // Create the scales.
  const x = d3.scaleLinear()
      .domain([0, d3.max(barchart, d => d.value)])
      .range([marginLeft, width - marginRight]);
  
  const y = d3.scaleBand()
      .domain(d3.sort(barchart, d => -d.value).map(d => d.id))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

  // Create a value format.
  const format = x.tickFormat(10, ",d");

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
  
  // Append a rect for each id.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(barchart)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.id))
      .attr("width", (d) => x(d.value) - x(0))
      .attr("height", y.bandwidth());
  
  // Append a label for each id.
  svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
    .selectAll()
    .data(barchart)
    .join("text")
      .attr("x", (d) => x(d.value))
      .attr("y", (d) => y(d.id) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text((d) => format(d.value))
    .call((text) => text.filter(d => x(d.value) - x(0) < 50) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));

  // Create the axes.
  svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x).ticks(width / 80, ",.0f"))
      .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0));

  return svg.node();
}


function _barchart(FileAttachment){return(
FileAttachment("barchart.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["barchart.json", {url: new URL("../../input/barchart.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  // main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["barchart","d3"], _chart);
  main.variable(observer("barchart")).define("barchart", ["FileAttachment"], _barchart);
  return main;
}
