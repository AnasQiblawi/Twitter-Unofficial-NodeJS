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





// Twitter Home ------------------------------------------------------------
app.get('/twitter' , function (req,res) {
    res.sendfile(__dirname + '/pages/twitter.html')
})




//  Twitter Profile  Page -------------------------------------
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

            if (dom.window.document.getElementsByClassName('flex-module error-page clearfix')[0] || !dom.window.document.getElementById('init-data') || JSON.parse(dom.window.document.getElementById('init-data').value).sectionName == 'suspended' ) {
                // Suspended Account
                var twitter = {
                    available: 1,
                    suspended: 1,
                    user_id: '',
                    name: '',
                    account: req.params.name.toLowerCase().split(' ').join(''),
                    verified: '',
                    Bussnis_state: '',
                    created_at: '',
                    Loacation: '',
                    website: '',
                    description: '',
                    tweets: '',
                    tweets_str: '',
                    following: '',
                    following_str: '',
                    followers: '',
                    followers_str: '',
                    likes: '',
                    likes_str: '',
                    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                    banner: '',
                    background_image: '',
                    background_color: ''
                }

            } else {
                // Active Account 
                var profile_user = JSON.parse(dom.window.document.getElementById('init-data').value).profile_user


                var tweets_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[0]) {
                    tweets_str = dom.window.document.getElementsByClassName('ProfileNav-value')[0].textContent
                } else {
                    tweets_str = ''
                }
                ;
                var following_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[1]) {
                    following_str = dom.window.document.getElementsByClassName('ProfileNav-value')[1].textContent
                } else {
                    following_str = ''
                }
                ;
                var followers_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[2]) {
                    followers_str = dom.window.document.getElementsByClassName('ProfileNav-value')[2].textContent
                } else {
                    followers_str = ''
                }
                ;
                var likes_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[3]) {
                    likes_str = dom.window.document.getElementsByClassName('ProfileNav-value')[3].textContent
                } else {
                    likes_str = ''
                }
                ;

                var twitter = {
                    available: 1,
                    suspended: 0,
                    user_id: profile_user.id,
                    name: profile_user.name,
                    account: profile_user.screen_name,
                    verified: profile_user.verified,
                    Bussnis_state: profile_user.business_profile_state,
                    created_at: profile_user.created_at,
                    Loacation: profile_user.location,
                    website: profile_user.url,
                    description: profile_user.description,
                    tweets: profile_user.statuses_count,
                    tweets_str: tweets_str,
                    following: profile_user.friends_count,
                    following_str: following_str,
                    followers: profile_user.followers_count,
                    followers_str: followers_str,
                    likes: profile_user.favourites_count,
                    likes_str: likes_str,
                    avatar: profile_user.profile_image_url.replace("_normal", "_400x400"),
                    banner: profile_user.profile_banner_url,
                    background_image: profile_user.profile_background_image_url,
                    background_color: profile_user.profile_background_color
                }
            }
            ;
            console.log(twitter);
            console.log(res.statusCode);
            res.render(__dirname + '/pages/twitter', twitter);
        }

        // if error = No User Found
        else {
            console.log('No Such a User .');

            var twitter = {
                available: 0,
                suspended: 0,
                user_id: '',
                name: '',
                account: req.params.name.toLowerCase().split(' ').join(''),
                verified: '',
                Bussnis_state: '',
                created_at: '',
                Loacation: '',
                website: '',
                description: '',
                tweets: '',
                tweets_str: '',
                following: '',
                following_str: '',
                followers: '',
                followers_str: '',
                likes: '',
                likes_str: '',
                avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                banner: '',
                background_image: '',
                background_color: ''
            };

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
                    suspended: 1,
                    user_id: '',
                    name: '',
                    account: req.params.name.toLowerCase().split(' ').join(''),
                    verified: '',
                    Bussnis_state: '',
                    created_at: '',
                    Loacation: '',
                    website: '',
                    description: '',
                    tweets: '',
                    tweets_str: '',
                    following: '',
                    following_str: '',
                    followers: '',
                    followers_str: '',
                    likes: '',
                    likes_str: '',
                    avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                    banner: '',
                    background_image: '',
                    background_color: ''
                };
            } else {

                // Active user

                var profile_user = JSON.parse(dom.window.document.getElementById('init-data').value).profile_user


                var tweets_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[0]) {
                    tweets_str = dom.window.document.getElementsByClassName('ProfileNav-value')[0].textContent
                } else {
                    tweets_str = ''
                }
                ;
                var following_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[1]) {
                    following_str = dom.window.document.getElementsByClassName('ProfileNav-value')[1].textContent
                } else {
                    following_str = ''
                }
                ;
                var followers_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[2]) {
                    followers_str = dom.window.document.getElementsByClassName('ProfileNav-value')[2].textContent
                } else {
                    followers_str = ''
                }
                ;
                var likes_str;
                if (dom.window.document.getElementsByClassName('ProfileNav-value')[3]) {
                    likes_str = dom.window.document.getElementsByClassName('ProfileNav-value')[3].textContent
                } else {
                    likes_str = ''
                }
                ;

                var twitter = {
                    available: 1,
                    suspended: 0,
                    user_id: profile_user.id,
                    name: profile_user.name,
                    account: profile_user.screen_name,
                    verified: profile_user.verified,
                    Bussnis_state: profile_user.business_profile_state,
                    created_at: profile_user.created_at,
                    Loacation: profile_user.location,
                    website: profile_user.url,
                    description: profile_user.description,
                    tweets: profile_user.statuses_count,
                    tweets_str: tweets_str,
                    following: profile_user.friends_count,
                    following_str: following_str,
                    followers: profile_user.followers_count,
                    followers_str: followers_str,
                    likes: profile_user.favourites_count,
                    likes_str: likes_str,
                    avatar: profile_user.profile_image_url.replace("_normal", "_400x400"),
                    banner: profile_user.profile_banner_url,
                    background_image: profile_user.profile_background_image_url,
                    background_color: profile_user.profile_background_color
                }
            }
            ;
            console.log(twitter);
            res.send(twitter)
        }


        // if error = No User Found
        else {
            console.log('No Such a User .');

            var twitter = {
                available: 0,
                suspended: 0,
                user_id: '',
                name: '',
                account: req.params.name.toLowerCase().split(' ').join(''),
                verified: '',
                Bussnis_state: '',
                created_at: '',
                Loacation: '',
                website: '',
                description: '',
                tweets: '',
                tweets_str: '',
                following: '',
                following_str: '',
                followers: '',
                followers_str: '',
                likes: '',
                likes_str: '',
                avatar: '',
                banner: '',
                background_image: '',
                background_color: ''
            };
            console.log(twitter)
            res.send(twitter)

        }
    })

})

