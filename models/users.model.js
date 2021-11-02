const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new Schema(
	{
		username: {
			type: String,
			minlength: 3,
			maxlength: 20,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			minlength: 8
		},
		profile: {
			type: String
		}
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function(next) {
	const user = this;
	const hash = await bcrypt.hash(user.password, 8);
	next();
});

UserSchema.methods.comparePasswords = async function(inputPassword) {
	const user = this;
	return await bcrypt.compare(inputPassword, user.password);
};

module.exports = model('Users', UserSchema);
