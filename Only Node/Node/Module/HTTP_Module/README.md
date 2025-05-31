# 📦 Understanding `package.json` and `nodemon` in Node.js

## 🔹 What is `package.json`?

`package.json` is the heart of any Node.js project. It holds essential metadata about your project and manages project dependencies.

### ✅ Key Purposes:
- Defines project name, version, and description
- Manages dependencies (like `express`, `nodemon`, etc.)
- Declares scripts to automate tasks (e.g., `npm start`)
- Helps others install and run your project with `npm install`

---

## 📄 Basic Structure of `package.json`

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A basic Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {},
  "devDependencies": {}
}


// 🚀 What is nodemon?
// nodemon is a utility that monitors for file changes in your Node.js app and automatically restarts the server.

// 🔁 No need to stop and restart manually every time you save a file.


// 💡 Why Use nodemon?
// | Feature              | Benefit                            |
// | -------------------- | ---------------------------------- |
// | Auto-restart server  | Saves time during development      |
// | Watches file changes | Reflects updates instantly         |
// | Simple to use        | Runs just like `node`, but smarter |


// 📦 How to Install nodemon
// 🔹 Globally (available everywhere)

// bash
// `npm install -g nodemon`
// `nodemon app.js`



/But Now Not Need To Dowload Nodemon Bcz Npm Give You Buit-in Feature -->  `--watch`
simply use `node --watch 1_server.js`