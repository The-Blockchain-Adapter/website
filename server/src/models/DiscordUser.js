const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	discordId: String,
	username: String,
	guilds: Array,
});

const DiscordUser = (module.exports = mongoose.model("User", UserSchema));
