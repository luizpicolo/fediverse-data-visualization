import define from "./definition/bubblechart/index.js";
import { Runtime, Inspector } from "./runtime.js";

class BubbleChart {
  constructor() {
    this.runtime = new Runtime();
  }

  render(element) {
    this.runtime.module(define, Inspector.into(element));
  }
}

export default BubbleChart;
