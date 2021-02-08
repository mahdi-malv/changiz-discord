const c = require('./config')

const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} - ${client.user.username}!`);
});

client.on('message', msg => {
    const content = msg.content;
    const username = client.user.username.toLowerCase();
    const parts = content.split(' ');
    if (parts.length < 2 && parts[0].toLowerCase() !== username) {
        console.log(`Must be something like ${username} COMMAND`);
    } else if (parts[0].toLowerCase() !== username) {
        console.log(`Must start with ${username}`);
    } else {
        if (parts[1]) {
            const what = parts.slice(1, -1).join(' ');
            msg.reply(respondTo(msg, what))
                .catch(console.error);
        } else {
            msg.channel.send(getAWhat(msg))
                .catch(console.error);
        }
    }
});

// Login
client.login(process.env.BOT_TOKEN);

/**
 * 
 * @param {Discord.Message} msg 
 * @param {String} what 
 * @returns {String}
 */
function respondTo(what) {
    let answers = [
        `هنوز این کد رو نزده واسم. نمیدونم با ${what} باید چه خاکی برسر بریزم`,
        `نمیزنه کدمو حاجی. الان نمیدونم اصلا '${what}' چی هست...`,
        `چی میگی؟ نمی‌فهمم. کدم نمیکشه`,
        `اگه کدمو زده بود که میدونستم چی جوابتو بدم... حیف که نزده`,
        `هااا اییی که گفتییی یعنیییی چه؟؟؟`,
        `'${what}' خودتی`,
        `'${what}' to you too citizen`,
    ];
    return answers[Math.floor(Math.random() * answers.length)];
}

/**
 * 
 * @param {Discord.Message} msg 
 * @returns {String}
 */
function getAWhat() {
    const whats = [
        'چی شده؟',
        'جان؟',
        'بلی؟',
        'سلام هستم. بفرما؟',
        'هی خدایا... در خدمتم',
        'عباس معصومیه؟',
    ]
    return whats[Math.floor(Math.random() * whats.length)];
}



