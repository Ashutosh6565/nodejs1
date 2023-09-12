const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done){
// find the user and establish the  identity
User.findOne({email: email}, function(err, user){
    if(err){
        console.log("error in finding the user by passport in the code");
        return done(err);
    }
    if(!user || user.password != password){
        console.log('invalid Username/password');
        return done(null, false);
    }

    return done(null , user);
});

}

));

//serializing the user to decide which keyu is to kept in the cookies 
passport.serializeUser(function(user, done ){
    done(null, user.id);
});


//deserialzing the user form the key in the cookies  
passport.deserializeUser(function(id , done){
    User.findById(id, function(err, user){
if(err){
    console.log('error in finding the user using passport')
}
return done(null, user)
    });
});




module.exports = passport;