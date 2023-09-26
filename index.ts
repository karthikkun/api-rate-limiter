import Startup from "./startup";
// const config = require('./config.js');
const PORT = 9000;

const serverObj = new Startup();
serverObj.run(PORT)