const http = require("http");

//--> We Write https.method means http is object

//Example
// http = {
//   name: "harsh",
//   age: 12,
//   createServer: function () {
//     console.log("Hello from Harsh!");
//   },
// };

//web server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1> I am Harsh Gohil (@harshintech)  </h1>");
    res.end();
  }

  if (req.url === "/source-code") {
    res.write(
      "Happy Diwali 🎉 Are you looking for high-quality, ready-to-use website source code? Look no further! Our collection of more than 10+ projects & websites has everything you need to get started on your next project. "
    );
    res.end();
  }

  if (req.url === "/contact") {
    res.setHeader("Content-Type", "text/plain");
    res.write("Have a Project or want to Collaborate? whatsapp now update ohk wow");
    res.end(); 
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🔥 Listening on PORT ${PORT}`);
});

//For See Output open Chrome and Check on Localhost
//http://localhost:3000
//http://localhost:3000//source-code
//http://localhost:3000/contact

//Without Watch You not see changes even you refresh page
//so we have two method use package nodemon or use built in feature --watch my advice use built in feature
//On Refresh You See Changes on `node --watch filename.js`

//--> Here "Server" Use Emit,On Function From Event Emitter

//--> In Future We Use Express For Server But Now it's important to Learn Here How Server Work in Node.js
//--> Express is Module Of Node.js Remember
