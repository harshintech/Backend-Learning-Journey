import readline from "readline";
//This is also package from npm called "readline"
//and it's have method like createInterface,question etc....

const r1 = readline.createInterface({
  input: process.stdin, //take input in ( c++ we stdIn for take input)
  output: process.stdout, //show output to console
});

const todos = [];

const showMenu = () => {
  console.log("\n1. Add a Task");
  console.log("2. View Tasks");
  console.log("3. Exit");
  r1.question("Choose an option: ", handleInput);
};

const handleInput = (option) => {
  if (option === "1") {
    r1.question("Enter the Task:", (task) => {
      todos.push(task);
      console.log("Task Added: ", task);
      showMenu();
    });
  } else if (option === "2") {
    console.log("\n Your Todo Lists");
    todos.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
    showMenu();
  } else if (option === "3") {
    console.log("Good Bye");
    r1.close();
  } else {
    console.log("Invalid Option. Please Try Again Later");
    showMenu();
  }
};

showMenu();
