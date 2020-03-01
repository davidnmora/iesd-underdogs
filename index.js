const SlackBot = require("slackbots");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const bot = new SlackBot({
  token: "xoxb-975798810645-964344195523-4NQN3yhPbIy9IWOV2xn167PY",
  name: "dummybot"
});

// Start Handler
bot.on("start", () => {
  bot.postMessageToChannel("general");
});

// Error Handler
bot.on("error", err => {
  console.log(err);
});

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

// Response Handler
function handleMessage(message) {
  if (message.includes(" find cat fact")) {
    getRandomCat();
  } else if (message.includes(" help")) {
    runHelp();
  }
}

function getRandomCat() {
  axios.get("https://cat-fact.herokuapp.com/facts/random").then(res => {
    const cat = res.data.text;
    const params = {
      icon_emoji: `:robot_face`
    };
    bot.postMessageToChannel("general", `${cat}`, params);
  });
}
// Show Help
function runHelp() {
  bot.postMessageToChannel(
    "general",
    `Type *@dummybot* with *find dog* to get a random dog`
  );
}
