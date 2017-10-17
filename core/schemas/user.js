var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        trim: true
    }
});


/* //authenticate input against database
UserSchema.statics.authenticate = function(email, password, callback){
    console.log('comparandoemail');
    User.findOne({ email: email })
        .exec(function(err, user){
            if (err) {
                return callback(err);
            } else if(!user){
                var err = new Error('Page not found.');
                err.status = 404;
                return callback(err);
                
            }
            console.log('comparandopass');
            bcrypt.compare(password, user.password, function(err, result){
                if(result === true){
                    return callback(null, user);
                } else {
                    return callback();
                }
            } )
        });
} */

//hashing a password before saving it to the database

/* UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    })
}); */

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;