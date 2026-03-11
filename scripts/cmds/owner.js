const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "INDRA",
    role: 0,
    shortDescription: "Bot owner information",
    longDescription: "",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerInfo = {
        name: 'INDRA OTSUTSUKI',
        gender: 'Male',
        age: 'Unknown',
        height: 'Unknown',
        facebookLink: 'https://www.facebook.com/indra.otsutsuki.627332',
        nick: 'INDRA'
      };

      // List of images
      const images = [
        'https://i.postimg.cc/t45YQzG6/Screenshot_20260206_140552_2.jpg',
        'https://i.postimg.cc/cJ2fzN3s/Screenshot_20260206_140528_2.jpg',
        'https://i.postimg.cc/fbpYPhdT/Screenshot_20251201_231142_2.jpg',
        'https://i.postimg.cc/d0pGfKCV/Screenshot_20260310_235647_2.jpg',
        'https://i.postimg.cc/tgwFcHxK/Screenshot_20260307_135049_4.jpg'
      ];

      // Pick a random image
      const randomImage = images[Math.floor(Math.random() * images.length)];

      const tmpFolderPath = path.join(__dirname, 'tmp');
      if (!fs.existsSync(tmpFolderPath)) fs.mkdirSync(tmpFolderPath);

      const imgResp = await axios.get(randomImage, { responseType: 'arraybuffer' });
      const imgPath = path.join(tmpFolderPath, 'owner_image.jpg');
      fs.writeFileSync(imgPath, Buffer.from(imgResp.data, 'binary'));

      const response = `
╭─────❁
│  OWNER INFORMATION
│
│ Name: ${ownerInfo.name}
│ Gender: ${ownerInfo.gender}
│ Age: ${ownerInfo.age}
│ Height: ${ownerInfo.height}
│
│ Facebook:
│ ${ownerInfo.facebookLink}
│
│ Nickname: ${ownerInfo.nick}
╰────────────❁
`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, event.messageID);

      fs.unlinkSync(imgPath);

      api.setMessageReaction('🔥', event.messageID, () => {}, true);

    } catch (error) {
      console.error('Error in owner command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};
