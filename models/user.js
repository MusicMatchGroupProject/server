const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        validate: [{
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Invalid email format'
        }, {
            isAsync: true,
            validator: function(v, cb) {
                User.findOne({email: v, _id: {$ne: this._id}})
                    .then(data => {
                        if (data) {
                            cb(false)
                        } else {
                            cb(true)
                        }
                    })
                    .catch(err => {
                        cb(false)
                    })
            },
            message: 'Email is already used'
        }]
    },
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;