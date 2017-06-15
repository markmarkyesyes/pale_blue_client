import constants from "./constants";

const io = require('socket.io-client')  
const socket = io(constants.baseUrl);

export default socket;