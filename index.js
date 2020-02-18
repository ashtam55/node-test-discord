const config = require("./config.json");

var mqtt = require('mqtt')
var client = mqtt.connect('http://api.akriya.co.in');

const Discord = require('discord.js');
const discord_client = new Discord.Client();

discord_client.on('ready', () => {
  console.log(`Logged in as ${discord_client.user.tag}!`);
});


client.on('connect', function () {
    
    // client.publish('HS/303385001/status','11110000');
    // client.publish('homeSwitch/ready/2761046813','sReady!');
    console.log("I am connected to the MQTT Server");
    // start();
    client.subscribe('HS/#', function (err) {
        if (!err) {
            client.publish('HS/root-node/presence', 'Connected')
        } else {
            console.error(err);
        }
    });
    
});


client.on('message', function (topic, message) {
    // message is Buffer
    console.log(`${topic}: ${message.toString()}`);
});


discord_client.on('message', msg => {
    console.log(msg);
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
discord_client.login(config.discordtoken);
