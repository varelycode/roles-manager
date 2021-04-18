// import express from "express";
import express from "express";
import fetch from "node-fetch";

// Glue between Engine & SocketIO --------------
const run = async (): Promise<void> => {
  var client_id = "client_id=" + process.env.CLIENT_ID;

  var client_secret = "client_secret" + process.env.CLIENT_SECRET;

  var grant_type = "grant_type=client_credentials";

  console.log(client_id, client_secret);

  const base_url = "https://id.twitch.tv/oauth2/token?";

  const url = base_url + client_id + "&" + client_secret + "&" + grant_type;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });
  // If you care about a response:
  if (response.body !== null) {
    console.log("body null", response);
  }

  if (!response.ok) {
    console.log(response);
  }
};

export default { run };

// const TWITCH_CLIENT_ID = "<YOUR CLIENT ID HERE>";
// const TWITCH_SECRET = "<YOUR CLIENT SECRET HERE>";
// const SESSION_SECRET = "<SOME SECRET HERE>";
// const CALLBACK_URL = "<YOUR REDIRECT URL HERE>"; // You can run locally with - http://localhost:3000/auth/twitch/callback

// const app = express();

// app.use(
//   session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
// );
// app.use(express.static("public"));
// app.use(passport.initialize());
// app.use(passport.session());

/////////////////////
// var express        = require('express');
// var session        = require('express-session');
// var passport       = require('passport');
// var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
// var request        = require('request');
// var handlebars     = require('handlebars');

// // Define our constants, you will change these with your own
// const TWITCH_CLIENT_ID = '<YOUR CLIENT ID HERE>';
// const TWITCH_SECRET    = '<YOUR CLIENT SECRET HERE>';
// const SESSION_SECRET   = '<SOME SECRET HERE>';
// const CALLBACK_URL     = '<YOUR REDIRECT URL HERE>';  // You can run locally with - http://localhost:3000/auth/twitch/callback

// // Initialize Express and middlewares
// var app = express();
// app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
// app.use(express.static('public'));
// app.use(passport.initialize());
// app.use(passport.session());

// // Override passport profile function to get user profile from Twitch API
// OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
//   var options = {
//     url: 'https://api.twitch.tv/helix/users',
//     method: 'GET',
//     headers: {
//       'Client-ID': TWITCH_CLIENT_ID,
//       'Accept': 'application/vnd.twitchtv.v5+json',
//       'Authorization': 'Bearer ' + accessToken
//     }
//   };

//   request(options, function (error, response, body) {
//     if (response && response.statusCode == 200) {
//       done(null, JSON.parse(body));
//     } else {
//       done(JSON.parse(body));
//     }
//   });
// }

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });

// passport.use('twitch', new OAuth2Strategy({
//     authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
//     tokenURL: 'https://id.twitch.tv/oauth2/token',
//     clientID: TWITCH_CLIENT_ID,
//     clientSecret: TWITCH_SECRET,
//     callbackURL: CALLBACK_URL,
//     state: true
//   },
//   function(accessToken, refreshToken, profile, done) {
//     profile.accessToken = accessToken;
//     profile.refreshToken = refreshToken;

//     // Securely store user profile in your DB
//     //User.findOrCreate(..., function(err, user) {
//     //  done(err, user);
//     //});

//     done(null, profile);
//   }
// ));

// // Set route to start OAuth link, this is where you define scopes to request
// app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

// // Set route for OAuth redirect
// app.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/' }));

// // Define a simple template to safely generate HTML with values from user's profile
// var template = handlebars.compile(`
// <html><head><title>Twitch Auth Sample</title></head>
// <table>
//     <tr><th>Access Token</th><td>{{accessToken}}</td></tr>
//     <tr><th>Refresh Token</th><td>{{refreshToken}}</td></tr>
//     <tr><th>Display Name</th><td>{{display_name}}</td></tr>
//     <tr><th>Bio</th><td>{{bio}}</td></tr>
//     <tr><th>Image</th><td>{{logo}}</td></tr>
// </table></html>`);

// // If user has an authenticated session, display it, otherwise display link to authenticate
// app.get('/', function (req, res) {
//   if(req.session && req.session.passport && req.session.passport.user) {
//     res.send(template(req.session.passport.user));
//   } else {
//     res.send('<html><head><title>Twitch Auth Sample</title></head><a href="/auth/twitch"><img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"></a></html>');
//   }
// });

// app.listen(3000, function () {
//   console.log('Twitch auth sample listening on port 3000!')
// });
