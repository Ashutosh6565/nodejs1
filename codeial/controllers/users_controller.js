const User = require('../models/user');

module.exports.profile = async function (req, res) {
  try {
    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id).exec();

      if (user) {
        return res.render('user_profile', {
          title: 'User profile',
          user: user,
        });
      }
    } else {
      return res.redirect('/users/sign-in');
    }
  } catch (err) {
    console.error('Error in profile:', err);
    return res.redirect('/users/sign-in');
  }
};


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function (req, res) {
    try {
      if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
      }
  
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        await User.create(req.body);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.error('Error in creating user while signing up:', err);
      return res.redirect('back');
    }
  };

// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.redirect('back');
    }

    res.cookie('user_id', user.id);
    return res.redirect('/users/profile');
  } catch (err) {
    console.log('Error in finding user while sign in:', err);
    return res.redirect('back');
  }
};
