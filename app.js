var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
// =====================================================

// Settings --------------------------------------------
// app.listen(80);
app.listen(process.env.PORT);
app.set('view engine', 'ejs');
console.log('Server is running on port 80 .');
//



//  404 Redered Page -------------------------------------



//  Home Redered Page -------------------------------------
app.get('/', function(req,res) {
    console.log('Home Page')
    res.sendFile(__dirname + '/pages/home.html')
})


//  Profile Redered Page -------------------------------------
app.get('/profile/:name', function (req, res) {
    var name = req.params.name;
    console.log('Profile Page : @' + name);
// make GET request to twitter
    // Set the headers
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // Configure the request
    var options = {
        url: 'https://twitter.com/' + name.split(' ').join(''),
        method: 'GET',
        headers: headers,
    }
    // Start the request
    request(options, function (error, response, body) {
        console.log(response.statusCode)
        // if no error
        if (!error && response.statusCode == 200) {
            const userPage = body;
            const dom  = new JSDOM(userPage);
            if (document.getElementsByClassName('flex-module error-page clearfix')[0]) {
            // Default info
            var twitter = {
                name: name,
                account: name.toLowerCase().split(' ').join(''),
                avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                banner: '',
                tweets: '-',
                following: '-',
                followers: '-',
                likes: '-'
            };
            } else {
            // New info
            var twitter = {
                name: dom.window.document.getElementsByClassName('ProfileHeaderCard-nameLink')[0].textContent,
                account: dom.window.document.getElementsByClassName('u-linkComplex-target')[0].textContent,
                avatar: dom.window.document.getElementsByClassName('ProfileAvatar-image')[0].src,
                banner: dom.window.document.querySelector('.ProfileCanopy-headerBg img').src,
                tweets: dom.window.document.getElementsByClassName('ProfileNav-value')[0].textContent,
                following: dom.window.document.getElementsByClassName('ProfileNav-value')[1].textContent,
                followers: dom.window.document.getElementsByClassName('ProfileNav-value')[2].textContent,
                likes: dom.window.document.getElementsByClassName('ProfileNav-value')[3].textContent
            }
            };
            console.log(twitter);
            console.log(res.statusCode);
            res.render(__dirname + '/pages/profile', twitter);
        }
        // if error
        else {
            console.log('Something went wrong .');
            res.sendFile(__dirname + '/pages/404.html');
        }
    })


})