const { model, Schema } = require('mongoose');
const CodeSchema = new Schema({
	_userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	code: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		index: {
			expireAfterSeconds: 60
		}
	}
});

module.exports = model('Codes', CodeSchema);
