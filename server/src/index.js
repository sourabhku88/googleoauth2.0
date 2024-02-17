// const express = require('express');
// const passport = require('passport');
// const session = require('express-session')
// const GoogleOauth = require('passport-google-oauth20').Strategy;

// require('dotenv').config();


// const app = express();

// app.use(express.json());
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
// }));


// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

// passport.use(new GoogleOauth({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:4000/auth/google",
//     userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
// },
//     function (accessToken, refreshToken, profile, cb) {
//         console.log(refreshToken)
//         console.log(profile)
//         // console.log(profile._json);

//         cb(null, profile)
//     }
// ))

// app.get('/', (req, res) => {
//     res.send('Hello  Google Oauth2.0!')
// })

// app.get('/auth/login/google', passport.authenticate('google', {
//     scope:
//         [
//             'https://www.googleapis.com/auth/userinfo.email',
//             'https://www.googleapis.com/auth/user.phonenumbers.read',
//             'https://www.googleapis.com/auth/user.addresses.read',
//             'https://www.googleapis.com/auth/profile.agerange.read'
//         ]
// }));

// app.get('/auth/google',
//     passport.authenticate('google', { failureRedirect: '/fail' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });


// app.get('/fail', (req, res) => res.send('login process fail'));

// app.listen(process.env.PORT, () => console.log('server running on ' + process.env.PORT))




/** chatgpt */
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleOauth = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleOauth({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
},
function (accessToken, refreshToken, profile, cb) {
    console.log(profile); // Check the console to see the user profile data
    cb(null, profile)
}));

app.get('/', (req, res) => {
    res.send('Hello Google Oauth2.0!')
});

app.get('/auth/login/google', passport.authenticate('google', {
    scope: [
        'profile','emails'
    ]
}));

app.get('/auth/google',
    passport.authenticate('google', { failureRedirect: '/fail' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/fail', (req, res) => res.send('Login process failed'));

app.listen(process.env.PORT, () => console.log('Server running on ' + process.env.PORT));
