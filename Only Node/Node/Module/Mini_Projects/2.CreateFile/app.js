import fs from "fs";
import { findSourceMap } from "module";
import readline from "readline";

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileCreation = () => {
  r1.question("Enter Your File Name : ", (filename) => {
    r1.question("Enter the Content For Your File : ", (content) => {
      fs.writeFile(`${filename}.txt`, content, (err) => {
        if (err) {
          console.error(`Error writing the file : , ${err.message}`);
        } else {
          console.log(`File ${filename}.txt created successfully!`);
        }
        r1.close();
      });
    });
  });
};

fileCreation();
