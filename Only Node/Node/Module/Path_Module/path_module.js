const path = require("path");


console.log(path)
console.log("this id dirpath",__dirname);
console.log(__filename);

// school folder/students/data.txt
console.log("------------------")
const filePath = path.join("folder", "students", "data.txt");
console.log(filePath);

const parseData = path.parse(filePath);
const resolvedPath = path.resolve(filePath);
const extname = path.extname(filePath);
const basename = path.basename(filePath);
const dirname = path.dirname(filePath);

console.log({
  parseData,
  resolvedPath,
  extname,
  basename,
  dirname,
  separator: path.sep,
});


//in terminal you see "\\" double bcz in terminal it's look like json but in reality it's convert to look like json so it;s use "\\"