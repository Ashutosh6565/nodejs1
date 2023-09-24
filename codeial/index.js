const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//import the main passport and express session library
const session = require('express-session');
const passport = require('passport');

//Import the secondary "Strategy" library
const passportLocal = require('./config/passport-local-strategy');


//mongo store is used to store the session cookie in the db 
const MongoStore = require('connect-mongo');


require('dotenv').config()
// Middleware Order: Use session middleware before initializing Passport




// This is the basic express session({..}) initialization.


app.use(session({
    name: 'codeial',
    secret: 'besomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        // mongooseConnection: db,
            mongoUrl: process.env.MONGO_URI,
            autoRemove: 'disabled'
        
    },
    function(err){
        console.log(err | 'connect-mongodb setup ok')
    }
    )
}));

// init passport on every route call.
app.use(passport.initialize());
// allow passport to use "express-session".
app.use(passport.session());




app.use(passport.setAuthenticatedUser)
// ... Other middleware and configurations

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
