

// authentication using passport
// Import necessary modules and User model
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust the path as needed

// Configure Passport to use the LocalStrategy
passport.use(new LocalStrategy({
  usernameField: 'email'
},
async (email, password, done) => {
  try {
    // Find the user by email using async/await
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      // User not found or password doesn't match
      console.log('Invalid Username/Password');
      return done(null, false);
    }

    // User found and password matches, return the user
    return done(null, user);
  } catch (err) {
    // Handle any errors that occur during the query
    console.log('Error in finding the user by Passport in the code');
    return done(err);
  }
}));


//serializing the user to decide which keyu is to kept in the cookies 
passport.serializeUser(function(user, done ){
    done(null, user.id);
});


//deserialzing the user form the key in the cookies  adn there was error while using this code in the termuinal because of tyhe version problem in the code so because of this we are using async and wait function in the code 
// passport.deserializeUser(function(id , done){
//     User.findById(id, function(err, user){
// if(err){
//     console.log('error in finding the user using passport')
// }
// return done(null, user)
//     });
// });
// deserialzing the user from the key in the cookies




 
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log('User not found');
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log('Error in finding the user using Passport');
        return done(err);
    }
});




module.exports = passport;