const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    token: {
        type: String
    }

});

// hasig user password
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});



userSchema.methods.generateToken = async function () {
    const token = await bcrypt.hash(this.username, 10);
    this.token = token;
    await this.save();
    return token;
}


module.exports = mongoose.model('User', userSchema);