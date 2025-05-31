// const add = require("./math");
// const mult = require("./math");
// const math = require("./math");

//Remember ------> add "type":"module", in package.json file to use this feature import and export
// import multiply from "./math.js";
//import {add,mult} from "./math.js"
import { add, subs, mult, div, PI } from "./math.js";
import * as math from "./math.js";

console.log(math.add(5, 10));
console.log(mult(70, 10));
console.log(math.subs(5, 10));
console.log(div(50, 10));
console.log(math.PI);

//ECMA Script Js New Way To Import and Export