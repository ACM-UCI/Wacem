// Bot to send messages to multiple ACM board members simultaneously.
// See README for more info.

// Dependencies
const login = require('facebook-chat-api');
const readline = require('readline');
const fs = require('fs');
const Stream = require('stream');

// Constants
const HELLO_MESSAGE =
    'Hello! I am Wacem Acmuci. I was designed by my creator to enforce ' +
    'problem submission for ACM@UCI. I promise I won\'t spam you (that much)!';
const TEST_MESSAGE = 'This is a test of WACeM. Please disregard.';
const NICE_MESSAGE = 'Deadline approaching. Please submit problems soon!';
const MEAN_MESSAGE =
    'You are in violation of ACM code 12345: Board members must submit two ' +
    'problems weekly by Sunday 11:59PM. Please submit your problems ' +
    'immediately.';
const IDS_FILE = './ids.csv';

// Global vars and flags
let FLAG_EMAIL;
let FLAG_PASSWORD;
let FLAG_MSG_TYPE;
let MESSAGE;
const VICTIMS = []; // Each entry has submitted, id, and name

function parseCommandLineFlags() {
  if (process.argv.length != 5) {
    console.log(
        'USAGE: \'node bot.js <email_to_facebook> <password_to_facebook> ' +
        '<message_type>\'');
    process.exit();
  }
  FLAG_EMAIL = process.argv[2];
  FLAG_PASSWORD = process.argv[3];
  FLAG_MSG_TYPE = process.argv[4];

  switch (FLAG_MSG_TYPE) {
    case 'HELLO':
      MESSAGE = HELLO_MESSAGE;
      break;
    case 'TEST':
      MESSAGE = TEST_MESSAGE;
      break;
    case 'NICE':
      MESSAGE = NICE_MESSAGE;
      break;
    case 'MEAN':
      MESSAGE = MEAN_MESSAGE;
      break;
    default:
      console.log('Invalid message type');
      console.log('Message types are: HELLO, NICE, MEAN, TEST');
      process.exit();
  }

  console.log('Email Used: ' + FLAG_EMAIL);
  console.log('Message type: ' + FLAG_MSG_TYPE);
}

function parseVictimsFromFile() {
  const rl = readline.createInterface(
      {input: fs.createReadStream(IDS_FILE), output: new Stream});
  rl.on('line', (line) => {
    tokens = line.split(','); // There won't be commas in other parts of input
    VICTIMS.push({
      submitted: tokens[0] != '0',
      id: tokens[1],
      name: tokens[2],
    });
  });
}

function sendMessages() {
  login({email: FLAG_EMAIL, password: FLAG_PASSWORD}, (err, api) => {
    if (err) return console.error(err);
    if (FLAG_MSG_TYPE == 'TEST') {
      api.sendMessage(VICTIMS[0].name + ': ' + MESSAGE, VICTIMS[0].id);
    } else {
      VICTIMS.forEach((v) => {
        if (!v.submitted) api.sendMessage(v.name + ': ' + MESSAGE, v.id);
      });
    }
    console.log('MESSAGES SENT');
  });
}

function main() {
  parseCommandLineFlags();
  parseVictimsFromFile();
  sendMessages();
}

main();
