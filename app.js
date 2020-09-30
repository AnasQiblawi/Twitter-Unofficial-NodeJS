////////////////////////////////////////////
// https://github.com/puppeteer/puppeteer
// https://try-puppeteer.appspot.com/
const puppeteer = require('puppeteer');
const fs		= require('fs');
const request	= require('request');
const express	= require('express');
const app 		= express();
// =====================================================

// Settings --------------------------------------------
// app.listen(80);
// app.listen(process.env.PORT);
// app.listen(process.env.PORT || 80);
const port = process.env.PORT || 80;
app.listen(port)
app.set('view engine', 'ejs');
console.log('Server is running on port ' + port);

// Static Pages -----------------------------------------
app.use('/twitter/img', express.static(__dirname + '/pages/twitter/img'));
app.use('/img', express.static(__dirname + '/pages/twitter/img'));
////////////////////////////////////////////////////////////////////////////////////


// Twitter Cookies scraper
async function cookies(){
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://twitter.com');

  // get cookie
  const cookie = await page.evaluate(() => {
	  console.log(document.cookie)
    return document.cookie.split('gt=')[1].split(';')[0];
  });
  console.log('New Cookie : ' + cookie)
  fs.writeFileSync('./cookie.txt', cookie)

  await browser.close();
  //return cookie
}

setInterval(()=>{
	cookies()
},1000*60*5)







// Format numbers
function formatNum(x) {
 x = Number(x)
 x > 9999 && x < 999999 ? x= (x/1000).toFixed()  + 'K' : x=x
 x > 999999 && x < 999999999 ? x= (x/1000000).toFixed() + 'M' : x=x
 x > 999999999 && x < 999999999999 ? x= (x/1000000000).toFixed() + 'B' : x=x
 x > 999999999999 && x < 999999999999999 ? x= (x/1000000000000).toFixed() + 'T' : x=x
 x > 999999999999999 && x < 999999999999999999 ? x= (x/1000000000000000).toFixed() + 'P' : x=x
 x > 999999999999999999 && x < 999999999999999999999 ? x= (x/1000000000000000000).toFixed() + 'E' : x=x
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}







//  Online / 404  Page -------------------------------------
//  Home Page -------------------------------------
app.get('/', function (req, res) {
    console.log('Home Page : ' + req.url)
    res.sendFile(__dirname + '/pages/home.html')
})


// Twitter Home Page ------------------------------------------------------------
app.get('/twitter', function (req, res) {
    console.log('Twitter Main Page : ' + req.url)
	cookies() // Extract a new Cookie
    res.sendFile(__dirname + '/pages/twitter/twitter.html')
})



//  Twitter Profile  Page -------------------------------------
app.get('/twitter/:name', function (req, res) {
	var cookie = fs.readFileSync('./cookie.txt');
    var name = req.params.name;
    console.log('Search Name : ' + name);
// make GET request to twitter

    // Configure the request
	var options = {
		method: 'GET',
		json: true,
		url: 'https://api.twitter.com/1.1/users/search.json?q=' + name,
		'headers': {
			'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
			'x-guest-token': cookie
		}
	};
    // Start the request
    request(options, function (error, response, body) {
        console.log(response.statusCode)
        // if no error
        if (!error && response.statusCode == 200 && body[0] ) {

                // Active Account 
                var profile_user = body[0];


                var tweets_str   	= formatNum(profile_user.statuses_count);
                var following_str	= formatNum(profile_user.friends_count);
                var followers_str 	= formatNum(profile_user.followers_count);
                var likes_str 	  	= formatNum(profile_user.favourites_count);
                var media_count_str	= formatNum(profile_user.media_count);


                var twitter = {
                    available: 1,
                    suspended: 0,
                    user_id: 	profile_user.id,
                    user_id_str: 	profile_user.id_str,
                    name: 		profile_user.name,
                    account: 	profile_user.screen_name,
                    verified: 		profile_user.verified,
                    Bussnis_state: 	profile_user.business_profile_state,
                    joined: 		profile_user.created_at,
                    location: 		profile_user.location,
                    website: 		profile_user.url,
                    description: 	profile_user.description,
                    tweets: 		profile_user.statuses_count,
                    tweets_str: 	tweets_str,
                    following: 		profile_user.friends_count,
                    following_str: 	following_str,
                    followers: 		profile_user.followers_count,
                    followers_str: 	followers_str,
                    likes: 			profile_user.favourites_count,
                    likes_str: 		likes_str,
                    media_count: 	profile_user.media_count,
                    media_count_str:media_count_str,
                    avatar: 		profile_user.profile_image_url_https.replace("_normal", "_400x400"),
                    banner: 				profile_user.profile_banner_url,
                    background_image: 		profile_user.profile_background_image_url,
                    background_color: 		profile_user.profile_background_color,
                    link_color: 			profile_user.profile_link_color,
                    sidebar_border_color: 	profile_user.profile_sidebar_border_color,
                    sidebar_fill_color: 	profile_user.profile_sidebar_fill_color,
                    text_color: 			profile_user.profile_text_color
                }




            console.log(twitter);
            console.log(res.statusCode);
            res.render(__dirname + '/pages/twitter/twitter', twitter);
        }

        // if error = No User Found
        else {
            console.log('No Such a User .');

            var twitter = {
                available: 0,
                suspended: 0,
                user_id: '',
                user_id_str: '',
                name: 'Not Found',
                account: req.params.name.toLowerCase().split(' ').join(''),
                verified: '',
                Bussnis_state: '',
                joined: '',
                location: '',
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
                media_count: '',
                media_count_str: '',
                avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                banner: '',
                background_image: '',
                background_color: '',
                link_color: '',
                sidebar_border_color: '',
                sidebar_fill_color: '',
                text_color: ''
            };

            res.render(__dirname + '/pages/twitter/twitter', twitter);
        }
    })


})












// ===================================================================================================================
//  Twitter api ------------------------------------------------------------------------------------------------------
app.get('/twitter/api/:name', function (req, res) {
	var cookie = fs.readFileSync('./cookie.txt');
    var name = req.params.name;
    console.log('Search Name : ' + name);
// make GET request to twitter

    // Configure the request
	var options = {
		method: 'GET',
		json: true,
		url: 'https://api.twitter.com/1.1/users/search.json?q=' + name,
		'headers': {
			'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
			'x-guest-token': cookie
		}
	};
    // Start the request
    request(options, function (error, response, body) {
        console.log(response.statusCode)
        // if no error
        if (!error && response.statusCode == 200 && body[0] ) {

                // Active Account 
                var profile_user = body[0];


                var tweets_str   	= formatNum(profile_user.statuses_count);
                var following_str	= formatNum(profile_user.friends_count);
                var followers_str 	= formatNum(profile_user.followers_count);
                var likes_str 	  	= formatNum(profile_user.favourites_count);
                var media_count_str	= formatNum(profile_user.media_count);


                var twitter = {
                    available: 1,
                    suspended: 0,
                    user_id: 	profile_user.id,
                    user_id_str: 	profile_user.id_str,
                    name: 		profile_user.name,
                    account: 	profile_user.screen_name,
                    verified: 		profile_user.verified,
                    Bussnis_state: 	profile_user.business_profile_state,
                    joined: 		profile_user.created_at,
                    location: 		profile_user.location,
                    website: 		profile_user.url,
                    description: 	profile_user.description,
                    tweets: 		profile_user.statuses_count,
                    tweets_str: 	tweets_str,
                    following: 		profile_user.friends_count,
                    following_str: 	following_str,
                    followers: 		profile_user.followers_count,
                    followers_str: 	followers_str,
                    likes: 			profile_user.favourites_count,
                    likes_str: 		likes_str,
                    media_count: 	profile_user.media_count,
                    media_count_str:media_count_str,
                    avatar: 		profile_user.profile_image_url_https.replace("_normal", "_400x400"),
                    banner: 				profile_user.profile_banner_url,
                    background_image: 		profile_user.profile_background_image_url,
                    background_color: 		profile_user.profile_background_color,
                    link_color: 			profile_user.profile_link_color,
                    sidebar_border_color: 	profile_user.profile_sidebar_border_color,
                    sidebar_fill_color: 	profile_user.profile_sidebar_fill_color,
                    text_color: 			profile_user.profile_text_color
                }




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
                user_id_str: '',
                name: 'Not Found',
                account: name,
                verified: '',
                Bussnis_state: '',
                joined: '',
                location: '',
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
                media_count: '',
                media_count_str: '',
                avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                banner: '',
                background_image: '',
                background_color: '',
                link_color: '',
                sidebar_border_color: '',
                sidebar_fill_color: '',
                text_color: ''
            };
			
            console.log(twitter)
            res.send(twitter)

        }
    })

})

