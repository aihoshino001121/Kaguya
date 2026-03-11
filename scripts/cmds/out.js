const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
	config: {
		name: "Out",
		aliases: ["left"],
		version: "1.0",
		author: "INDRA (UTSHO)ッ",
		countDown: 5,
		role: 2,
		shortDescription: "bot will leave gc",
		longDescription: "",
		category: "admin",
		guide: {
			vi: "{pn} [tid,blank]",
			en: "{pn} [tid,blank]"
		}
	},

	onStart: async function ({ api,event,args, message }) {
 var id;
 if (!args.join(" ")) {
 id = event.threadID;
 } else {
 id = parseInt(args.join(" "));
 }
 return api.sendMessage('Hey everyone! Kaguya Shinomiya (your favorite bot) is taking a short break. Created by Indra Otsutsuki, she thanks you all for the fun chats and will be back soon!', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
		}
	};
