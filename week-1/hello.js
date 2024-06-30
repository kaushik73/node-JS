const math = require("./math");
const os = require("os");
console.log("Sum is : ", math.add(2, 3));

console.log("My PC has CPU : ", os.cpus().length);
