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

// New video from Streamable
const videoURL = 'https://cdn.streamable.com/video/4qcivo.mp4';

const tmpFolderPath = path.join(__dirname, 'tmp');

if (!fs.existsSync(tmpFolderPath)) {
  fs.mkdirSync(tmpFolderPath);
}

const videoResponse = await axios.get(videoURL, { responseType: 'arraybuffer' });
const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

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
  attachment: fs.createReadStream(videoPath)
}, event.threadID, event.messageID);

fs.unlinkSync(videoPath);

api.setMessageReaction('🔥', event.messageID, () => {}, true);

} catch (error) {
console.error('Error in owner command:', error);
return api.sendMessage('An error occurred while processing the command.', event.threadID);
}
}
};
