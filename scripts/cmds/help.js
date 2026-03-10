fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ I N D R A ]"; 

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "INDRA",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "╭───────❁";

      msg += `\n╭─────✰\n│ ♥︎╣[❉ 𝗜𝗡𝗗𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 ❉]╠♥︎\n╰────────────✰`;

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────✰『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✰`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n╭─────✰[𝗘𝗡𝗝𝗢𝗬]\n│>𝗧𝗢𝗧𝗔𝗟 𝗖𝗠𝗗𝗦: [${totalCommands}].\n│𝗧𝗬𝗣𝗘𝖳:[ ${prefix}𝗛𝗘𝗟𝗣 𝗧𝗢\n│<𝗖𝗠𝗗> 𝗧𝗢 𝗟𝗘𝗔𝗥𝗡 𝗧𝗛𝗘 𝗨𝗦𝗔𝗚𝗘.]\n╰────────────✰`;
      msg += ``;
      msg += `\n╭─────✰\n│ ♥︎╣[❉ 𝗜𝗡𝗗𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 ❉]╠♥︎\n╰────────────✰`;

 				const helpListImages = [
 "https://i.postimg.cc/D0QCSx9f/1764772502239.jpg",
 "https://i.postimg.cc/htKGQhd7/Screenshot_20260206_140552.png",
 "https://i.postimg.cc/bwLwx8xR/Screenshot_20260206_140528.png",
 "https://i.postimg.cc/25KjtwXw/Screenshot_20251201_231142.png",
 "https://i.postimg.cc/J7B09f8y/PSX_20260126_221850_2.jpg",
 "https://i.postimg.cc/NFT0mHDL/1771259976264.jpg",
 "https://i.postimg.cc/zDRv9sNb/1769594377847.jpg",
 "https://i.postimg.cc/4xX3Hn94/1768484208950.jpg",
 "https://i.postimg.cc/BnJvPtKP/1765957585286.jpg",
 "https://i.postimg.cc/x8Vxjw48/1764772618489.jpg",
 "https://i.postimg.cc/BQr6SMqB/Screenshot-20260310-165531-2.jpg"
];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = "INDRA OTSUTSUKI";
        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `
  ╭───⊙
  │ 🔶 ${configCommand.name}
  ├── INFO
  │ 📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${longDescription}
  │ 👑 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
  │ ⚙ 𝗚𝘂𝗶𝗱𝗲: ${usage}
  ├── USAGE
  │ 🔯 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configCommand.version || "1.0"}
  │ ♻𝗥𝗼𝗹𝗲: ${roleText}
  ╰────────────⊙`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
