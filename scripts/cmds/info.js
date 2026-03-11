const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "info",
		aliases: ["admin"],
		author: "INDRA",
		role: 0,
		shortDescription: "Owner information",
		longDescription: "",
		category: "INFO",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {

			const INDRAInfo = {
				name: "𝐈𝐍𝐃𝐑𝐀 𝐎𝐓𝐒𝐔𝐓𝐒𝐔𝐊𝐈",
				gender: "Male",
				religion: "Islam",
				facebook1: "https://www.facebook.com/profile.php?id=61576009718382",
				facebook2: "https://www.facebook.com/indra.otsutsuki.627332"
			};

			const images = [
				"https://i.postimg.cc/t45YQzG6/Screenshot_20260206_140552_2.jpg",
				"https://i.postimg.cc/R0ZqMnvW/Screenshot_20260304_201124_2.jpg",
				"https://i.postimg.cc/QdbHGqZp/Screenshot_20260206_140528_2.jpg",
				"https://i.postimg.cc/hGthS7K8/Screenshot_20260307_135049_4.jpg",
				"https://i.postimg.cc/s2g1VZ3h/Screenshot_20260307_135828_2.jpg",
				"https://i.postimg.cc/XvYXVyn2/Screenshot_20260310_165247_2.jpg",
				"https://i.postimg.cc/fbRkw0Mv/Screenshot_20260310_235647_2.jpg",
				"https://i.postimg.cc/HLkjp7T6/Screenshot_20260310_165531_2.jpg",
				"https://i.postimg.cc/9fQzWqc4/Screenshot_20251201_231142_2.jpg",
				"https://i.postimg.cc/pLxp664N/Screenshot_20251113_205025_2.jpg"
			];

			const randomImage = images[Math.floor(Math.random() * images.length)];

			const tmpFolderPath = path.join(__dirname, "tmp");

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const imgResponse = await axios.get(randomImage, { responseType: "arraybuffer" });
			const imgPath = path.join(tmpFolderPath, "owner_img.jpg");

			fs.writeFileSync(imgPath, Buffer.from(imgResponse.data, "binary"));

			const message = `
╭─────❁
│  𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢
│
│ 𝗡𝗮𝗺𝗲: ${INDRAInfo.name}
│ 𝗚𝗲𝗻𝗱𝗲𝗿: ${INDRAInfo.gender}
│ 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: ${INDRAInfo.religion}
│
│ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 1:
│ ${INDRAInfo.facebook1}
│
│ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 2:
│ ${INDRAInfo.facebook2}
╰────────────❁`;

			await api.sendMessage({
				body: message,
				attachment: fs.createReadStream(imgPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(imgPath);

		} catch (error) {
			console.error(error);
			api.sendMessage("Error loading owner info.", event.threadID);
		}
	}
};
