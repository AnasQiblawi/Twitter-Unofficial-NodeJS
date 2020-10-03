var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
// =====================================================

// Settings --------------------------------------------
// app.listen(80);
// app.listen(process.env.PORT);
// app.listen(process.env.PORT || 80);
var port = process.env.PORT || 80;
app.listen(port)
app.set('view engine', 'ejs');
console.log('Server is running on port ' + port);
//


//  404 Redered Page -------------------------------------


//  Home Redered Page -------------------------------------
app.get('/', function (req, res) {
    console.log('Home Page')
    res.sendFile(__dirname + '/pages/home.html')
})


//  Twitter Profile Redered Page -------------------------------------
app.get('/twitter/:name', function (req, res) {
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
            // fs.writeFile('userPage.html', body)
            const userPage = body;
            const dom = new JSDOM(userPage);

            if (dom.window.document.getElementsByClassName('flex-module error-page clearfix')[0]) {
                // Suspended Account
                var twitter = {
                    available: 1,
                    // name: name,
                    // account: name.toLowerCase().split(' ').join(''),
                    name: 'Suspended Account',
                    account: req.params.name.toLowerCase().split(' ').join(''),
                    user_id: '',
                    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                    banner: '',
                    tweets: '',
                    following: '',
                    followers: '',
                    likes: ''
                };
            } else {
                // New info
                var name;
                if (dom.window.document.getElementsByClassName('ProfileHeaderCard-nameLink')[0]) {
                    name = dom.window.document.getElementsByClassName('ProfileHeaderCard-nameLink')[0].textContent
                } else {
                    name = ''
                }
                ;
                var account;
                if (dom.window.document.getElementsByClassName('u-linkComplex-target')[0]) {
                    account = dom.window.document.getElementsByClassName('u-linkComplex-target')[0].textContent
                } else {
                    account = ''
                }
                ;
                var user_id;
                if (dom.window.document.getElementById('init-data')) {
                    user_id = JSON.parse(dom.window.document.getElementById('init-data').value).profile_user.id_str
                } else {
                    user_id = ''
                }
                ;
                var avatar;
                if (dom.window.document.getElementsByClassName('ProfileAvatar-image')[0]) {
                    avatar = dom.window.document.getElementsByClassName('ProfileAvatar-image')[0].src
                } else {
                    avatar = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg'
                }
                ;
                var banner;
                if (dom.window.document.querySelector('.ProfileCanopy-headerBg img')) {
                    banner = dom.window.document.querySelector('.ProfileCanopy-headerBg img').src
                } else {
                    banner = ''
                }
                ;
                var tweets;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[0]) {
                    tweets = dom.window.document.getElementsByClassName('ProfileNav-value')[0].textContent
                } else {
                    tweets = ''
                }
                ;
                var following;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[1]) {
                    following = dom.window.document.getElementsByClassName('ProfileNav-value')[1].textContent
                } else {
                    following = ''
                }
                ;
                var followers;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[2]) {
                    followers = dom.window.document.getElementsByClassName('ProfileNav-value')[2].textContent
                } else {
                    followers = ''
                }
                ;
                var likes;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[3]) {
                    likes = dom.window.document.getElementsByClassName('ProfileNav-value')[3].textContent
                } else {
                    likes = ''
                }
                ;

                var twitter = {
                    available: 1,
                    name: name,
                    account: account,
                    user_id: user_id,
                    avatar: avatar,
                    banner: banner,
                    tweets: tweets,
                    following: following,
                    followers: followers,
                    likes: likes
                }

                // var twitter = {
                //     name: dom.window.document.getElementsByClassName('ProfileHeaderCard-nameLink')[0].textContent,
                //     account: dom.window.document.getElementsByClassName('u-linkComplex-target')[0].textContent,
                //     user_id: '',
                //     avatar: dom.window.document.getElementsByClassName('ProfileAvatar-image')[0].src,
                //     banner: dom.window.document.querySelector('.ProfileCanopy-headerBg img').src,
                //     tweets: dom.window.document.getElementsByClassName('ProfileNav-value')[0].textContent,
                //     following: dom.window.document.getElementsByClassName('ProfileNav-value')[1].textContent,
                //     followers: dom.window.document.getElementsByClassName('ProfileNav-value')[2].textContent,
                //     likes: dom.window.document.getElementsByClassName('ProfileNav-value')[3].textContent
                // }
            }
            ;
            console.log(twitter);
            console.log(res.statusCode);
            res.render(__dirname + '/pages/twitter', twitter);
        }
        // if error
        else {
            console.log('No Such a User .');

            var twitter = {
                available: 0,
                name: '',
                account: '',
                user_id: '',
                avatar: '',
                banner: '',
                tweets: '',
                following: '',
                followers: '',
                likes: ''
            }

            res.sendFile(__dirname + '/pages/404.html');
        }
    })


})


//  Twitter api -------------------------------------
app.get('/twitter/api/:name', function (req, res) {
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
            // fs.writeFile('userPage.html', body)
            const userPage = body;
            const dom = new JSDOM(userPage);

            if (dom.window.document.getElementsByClassName('flex-module error-page clearfix')[0]) {
                // Suspended Account
                var twitter = {
                    available: 1,
                    suspended: '1',
                    // name: name,
                    // account: name.toLowerCase().split(' ').join(''),
                    name: '',
                    account: req.params.name.toLowerCase().split(' ').join(''),
                    user_id: '',
                    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                    banner: '',
                    tweets: '',
                    following: '',
                    followers: '',
                    likes: ''
                };
            } else {
                // Active user
                var name;
                if (dom.window.document.getElementsByClassName('ProfileHeaderCard-nameLink')[0]) {
                    name = dom.window.document.getElementsByClassName('ProfileHeaderCard-nameLink')[0].textContent
                } else {
                    name = ''
                }
                ;
                var account;
                if (dom.window.document.getElementsByClassName('u-linkComplex-target')[0]) {
                    account = dom.window.document.getElementsByClassName('u-linkComplex-target')[0].textContent
                } else {
                    account = ''
                }
                ;
                var user_id;
                if (dom.window.document.getElementById('init-data')) {
                    user_id = JSON.parse(dom.window.document.getElementById('init-data').value).profile_user.id_str
                } else {
                    user_id = ''
                }
                ;
                var avatar;
                if (dom.window.document.getElementsByClassName('ProfileAvatar-image')[0]) {
                    avatar = dom.window.document.getElementsByClassName('ProfileAvatar-image')[0].src
                } else {
                    avatar = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg'
                }
                ;
                var banner;
                if (dom.window.document.querySelector('.ProfileCanopy-headerBg img')) {
                    banner = dom.window.document.querySelector('.ProfileCanopy-headerBg img').src
                } else {
                    banner = ''
                }
                ;
                var tweets;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[0]) {
                    tweets = dom.window.document.getElementsByClassName('ProfileNav-value')[0].textContent;
                } else {
                    tweets = ''
                }
                ;
                var following;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[1]) {
                    following = dom.window.document.getElementsByClassName('ProfileNav-value')[1].textContent
                } else {
                    following = ''
                }
                ;
                var followers;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[2]) {
                    followers = dom.window.document.getElementsByClassName('ProfileNav-value')[2].textContent
                } else {
                    followers = ''
                }
                ;
                var likes;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[3]) {
                    likes = dom.window.document.getElementsByClassName('ProfileNav-value')[3].textContent
                } else {
                    likes = ''
                }
                ;

                var twitter = {
                    available: 1,
                    suspended: '0',
                    name: name,
                    account: account,
                    user_id: user_id,
                    avatar: avatar,
                    banner: banner,
                    tweets: tweets,
                    following: following,
                    followers: followers,
                    likes: likes
                }
            }
            ;
            console.log(twitter);
            res.send(twitter)
        }


        // if error
        else {
            console.log('No Such a User .');

            var twitter = {
                available: 0,
                suspended: '0',
                name: '',
                account: '',
                user_id: '',
                avatar: '',
                banner: '',
                tweets: '',
                following: '',
                followers: '',
                likes: ''
            }
            console.log(twitter)
            res.send(twitter)

        }
    })

})

