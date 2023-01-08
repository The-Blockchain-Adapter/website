const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	discordId: String,
	username: String,
});

const DiscordUser = (module.exports = mongoose.model("User", UserSchema));
