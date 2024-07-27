import define from "./definition/horizontalBarChart/index.js";
import { Runtime, Inspector } from "./runtime.js";

class BarChart {
  constructor() {
    this.runtime = new Runtime();
  }

  render(element) {
    this.runtime.module(define, Inspector.into(element));
  }
}

export default BarChart;
