var express = require('express');
var app = express();
var request = require('request');
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

// Static Pages -----------------------------------------
app.use('/twitter/img', express.static(__dirname + '/pages/twitter/img'));
app.use('/img', express.static(__dirname + '/pages/twitter/img'));






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







//  404  Page -------------------------------------
//  Home Page -------------------------------------
app.get('/', function (req, res) {
    console.log('Home Page : ' + req.url)
    res.sendFile(__dirname + '/pages/home.html')
})


// Twitter Home Page ------------------------------------------------------------
app.get('/twitter', function (req, res) {
    console.log('Twitter Main Page : ' + req.url)
    res.sendFile(__dirname + '/pages/twitter/twitter.html')
})



//  Twitter Profile  Page -------------------------------------
app.get('/twitter/:name', function (req, res) {
    var name = req.params.name;
    console.log('Search Name : ' + name);
// make GET request to twitter

    // Configure the request
	var options = {
		method: 'GET',
		json: true,
		url: 'https://api.twitter.com/1.1/users/search.json?q=' + name,
		'headers': {
			'x-csrf-token': ' 2549ce8ff29dcf107227daad84705cbca4f25413fbf034487e4aac1fb6fb75a7fc2a14883fab4b440146f1995a431e9a533a18b38692bea399b622cb3fdf2b5b9d2ae86737fe4f1f8fd482768e0f3bb3',
			'authorization': ' Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
			'Cookie': ' personalization_id="v1_uNY+hCALY/9VHLheaM8lQQ=="; guest_id=v1%3A154719727239623211; _ga=GA1.2.1129466888.1547197284; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; ads_prefs="HBERAAA="; kdt=DwtbwLnzjCuFQdVdFxv1QGcUJSxswEkjLyEvey6m; remember_checked_on=1; twid=u%3D32936928; auth_token=d6d832522eca0ce548756e37dc5a38b5d5037036; _twitter_sess=BAh7CiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCPLvPeVoAToMY3NyZl9p%250AZCIlYTIyYzAxNDVmNGY1YWI3NDBlYjNhOGY1ZTJiOGExZDU6B2lkIiU5Y2Q4%250ANWU5YWZlMTY3NDIyYmFmOTNlNTUzZTJkNDZiZDoJdXNlcmkE4JP2AQ%253D%253D--a15a8ca584044d759d0d58f6238a8c36763d8229; ct0=2549ce8ff29dcf107227daad84705cbca4f25413fbf034487e4aac1fb6fb75a7fc2a14883fab4b440146f1995a431e9a533a18b38692bea399b622cb3fdf2b5b9d2ae86737fe4f1f8fd482768e0f3bb3; _gid=GA1.2.1231935430.1601398684; des_opt_in=N; eu_cn=; personalization_id="v1_xESmeH0ZEMpY5JQt/jJ+3Q=="; guest_id=v1%3A160141294769048221; lang=en'
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
                    avatar: 		profile_user.profile_image_url.replace("_normal", "_400x400"),
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
    var name = req.params.name;
    console.log('Search Name : ' + name);
// make GET request to twitter

    // Configure the request
	var options = {
		method: 'GET',
		json: true,
		url: 'https://api.twitter.com/1.1/users/search.json?q=' + name,
		'headers': {
			'x-csrf-token': ' 2549ce8ff29dcf107227daad84705cbca4f25413fbf034487e4aac1fb6fb75a7fc2a14883fab4b440146f1995a431e9a533a18b38692bea399b622cb3fdf2b5b9d2ae86737fe4f1f8fd482768e0f3bb3',
			'authorization': ' Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
			'Cookie': ' personalization_id="v1_uNY+hCALY/9VHLheaM8lQQ=="; guest_id=v1%3A154719727239623211; _ga=GA1.2.1129466888.1547197284; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; ads_prefs="HBERAAA="; kdt=DwtbwLnzjCuFQdVdFxv1QGcUJSxswEkjLyEvey6m; remember_checked_on=1; twid=u%3D32936928; auth_token=d6d832522eca0ce548756e37dc5a38b5d5037036; _twitter_sess=BAh7CiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCPLvPeVoAToMY3NyZl9p%250AZCIlYTIyYzAxNDVmNGY1YWI3NDBlYjNhOGY1ZTJiOGExZDU6B2lkIiU5Y2Q4%250ANWU5YWZlMTY3NDIyYmFmOTNlNTUzZTJkNDZiZDoJdXNlcmkE4JP2AQ%253D%253D--a15a8ca584044d759d0d58f6238a8c36763d8229; ct0=2549ce8ff29dcf107227daad84705cbca4f25413fbf034487e4aac1fb6fb75a7fc2a14883fab4b440146f1995a431e9a533a18b38692bea399b622cb3fdf2b5b9d2ae86737fe4f1f8fd482768e0f3bb3; _gid=GA1.2.1231935430.1601398684; des_opt_in=N; eu_cn=; personalization_id="v1_xESmeH0ZEMpY5JQt/jJ+3Q=="; guest_id=v1%3A160141294769048221; lang=en'
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
                    avatar: 		profile_user.profile_image_url.replace("_normal", "_400x400"),
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

