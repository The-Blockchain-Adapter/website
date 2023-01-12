const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const requiredString = { type: String, required: true };

const discordGuildSchema = new Schema({
	id: requiredString,
	name: requiredString,
	icon: requiredString,
	owner: Boolean,
	permissions: Number,
	features: [String],
	permissions_new: requiredString,
});

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	discordId: requiredString,
	discordUsername: requiredString,
	discordImage: requiredString,
	discordGuilds: [discordGuildSchema],
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
