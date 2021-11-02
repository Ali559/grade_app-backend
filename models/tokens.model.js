const { model, Schema } = require('mongoose');
const tokenSchema = new Schema({
	_userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
	token: { type: String, required: true },
	expireAt: { type: Date, default: Date.now, index: { expires: 3600 } }
});

module.exports = model('Tokens', tokenSchema);
