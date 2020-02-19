const config = require("./config.json");

var mqtt = require('mqtt')
var client = mqtt.connect('http://api.akriya.co.in');

const Discord = require('discord.js');
const discord_client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

var message = "Hola!!";
discord_client.on('ready', () => {
  console.log(`Logged in as ${discord_client.user.tag}!`);
//  discord_client.channels.get(config.channelid).send('My Message');

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




discord_client.on('message', msg => {
    console.log(msg);
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  // if(msg.content.c )
});



client.on('message', function (topic, message) {
  // message is Buffer
  message = message.toString();
  console.log(`${topic}: ${message.toString()}`);

  const embed = new Discord.RichEmbed()
	.setTitle(message)
  .setColor('#0099ff');

  webhookClient.send('Webhook test', {
    username: 'HS-Logger',
    avatarURL: 'https://abacusservices.in/wp-content/uploads/2019/08/logo-abacus-smart.png',
    embeds: [embed],
  });



  
});

  
discord_client.login(config.discordtoken);






