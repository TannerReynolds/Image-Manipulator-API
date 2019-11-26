module.exports = {
    command:"keygen",
    description: "Generate API key for a user",
    syntax: "{PREFIX}keygen [user mention]",
    execute:async (bot, msg, args, commands, prefix) => {
        if(msg.mentions.length > 0) {
            msg.channel.createMessage(`Token for **${msg.mentions[0].username}#${msg.mentions[0].discriminator}**: \`${generateKey(msg.mentions[0].id)}\``)
        } else {
            msg.channel.createMessage("Mention a user to generate an API key for them")
        }
    }
  }
function generateKey(id) {
    let firstPart = Buffer.from(id).toString('base64')
    let timeStamp = Date.now()
    let middlePart = Buffer.from(timeStamp.toString()).toString('base64')
    let text = "";
    let possible = "!@#$%^&*()/;:[]}{-_~?.,<>|=+!@#$%^&*()/;:[]}{-_~?.,<>|=+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 13; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    let lastPart = Buffer.from(text).toString('base64')
    let token = `${firstPart}.${middlePart}.${lastPart}`.replace(/=/g, "")
    return token
}