
// My Experimental Code
https://repl.it/@AnasQiblawi/Twitter-API
// Twitter v1 API
https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-search
	

// Puppeteer //
https://github.com/puppeteer/puppeteer
https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack
https://help.heroku.com/18PI5RSY/how-do-i-clear-the-build-cache
// I used the request from next code & URL 
// So I don't need to install it but get its results as POST requests
https://try-puppeteer.appspot.com 
const browser = await puppeteer.launch({'args' : ['--no-sandbox','--disable-setuid-sandbox']});
const page = await browser.newPage();
await page.goto('http://twitter.com');
  const cookies = await page.evaluate(() => {
    return document.cookie.split('gt=')[1].split(';')[0]
  });
  console.log(cookies);
await browser.close();

	
	
	
// Headers
// I take headers from a random search request from twitter page
// Auto get Headers
// by getting cookie value of    gt     or    x-guest-token
decodeURIComponent(document.cookie.split('gt=')[1].split(';')[0])
// to get real cookies
// upi have to download the website's content and parse its JavaScript
https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
https://stackoverflow.com/questions/61140863/python-downloading-twitter-video-using-python-without-using-twitter-api

// Manually get Headers
// headers of a request from a twitter page and login as a guest 	
	headers: {
		'authorization': ' Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
		'x-guest-token': ' 1310998165819138048'
	}
// headers when I login to my account then make a search request
	'headers': {
		'x-csrf-token': ' 2549ce8ff29dcf107227daad84705cbca4f25413fbf034487e4aac1fb6fb75a7fc2a14883fab4b440146f1995a431e9a533a18b38692bea399b622cb3fdf2b5b9d2ae86737fe4f1f8fd482768e0f3bb3',
		'authorization': ' Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
		'Cookie': ' personalization_id="v1_uNY+hCALY/9VHLheaM8lQQ=="; guest_id=v1%3A154719727239623211; _ga=GA1.2.1129466888.1547197284; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; ads_prefs="HBERAAA="; kdt=DwtbwLnzjCuFQdVdFxv1QGcUJSxswEkjLyEvey6m; remember_checked_on=1; twid=u%3D32936928; auth_token=d6d832522eca0ce548756e37dc5a38b5d5037036; _twitter_sess=BAh7CiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCPLvPeVoAToMY3NyZl9p%250AZCIlYTIyYzAxNDVmNGY1YWI3NDBlYjNhOGY1ZTJiOGExZDU6B2lkIiU5Y2Q4%250ANWU5YWZlMTY3NDIyYmFmOTNlNTUzZTJkNDZiZDoJdXNlcmkE4JP2AQ%253D%253D--a15a8ca584044d759d0d58f6238a8c36763d8229; ct0=2549ce8ff29dcf107227daad84705cbca4f25413fbf034487e4aac1fb6fb75a7fc2a14883fab4b440146f1995a431e9a533a18b38692bea399b622cb3fdf2b5b9d2ae86737fe4f1f8fd482768e0f3bb3; _gid=GA1.2.1231935430.1601398684; des_opt_in=N; eu_cn=; personalization_id="v1_xESmeH0ZEMpY5JQt/jJ+3Q=="; guest_id=v1%3A160141294769048221; lang=en'
	}
	
	


// Response body example for when I search for "Anas Qiblawi"
// GET https://api.twitter.com/1.1/users/search.json?q=anasqiblawi  +  {headers}
// it returns an array
[
    {
        "id": 32936928,
        "id_str": "32936928",
        "name": "Anas Qiblawi",
        "screen_name": "anasqiblawi",
        "location": "",
        "description": "",
        "url": null,
        "entities": {
            "description": {
                "urls": []
            }
        },
        "protected": false,
        "followers_count": 73,
        "fast_followers_count": 0,
        "normal_followers_count": 73,
        "friends_count": 243,
        "listed_count": 0,
        "created_at": "Sat Apr 18 16:44:27 +0000 2009",
        "favourites_count": 433,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 1398,
        "media_count": 878,
        "lang": null,
        "status": {
            "created_at": "Fri Sep 25 09:14:20 +0000 2020",
            "id": 1309420964728328192,
            "id_str": "1309420964728328192",
            "text": "@alenezi_mr الي حاب يجرب البرنامج على الاندرويد\nhttps://t.co/0fBlEEJcGu",
            "truncated": false,
            "entities": {
                "hashtags": [],
                "symbols": [],
                "user_mentions": [
                    {
                        "screen_name": "alenezi_mr",
                        "name": "د. محمد ربيّع",
                        "id": 2402270289,
                        "id_str": "2402270289",
                        "indices": [
                            0,
                            11
                        ]
                    }
                ],
                "urls": [
                    {
                        "url": "https://t.co/0fBlEEJcGu",
                        "expanded_url": "https://play.google.com/store/apps/details?id=com.tickettothemoon.gradient.photo",
                        "display_url": "play.google.com/store/apps/det…",
                        "indices": [
                            48,
                            71
                        ]
                    }
                ]
            },
            "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
            "in_reply_to_status_id": 1309254762441977858,
            "in_reply_to_status_id_str": "1309254762441977858",
            "in_reply_to_user_id": 2402270289,
            "in_reply_to_user_id_str": "2402270289",
            "in_reply_to_screen_name": "alenezi_mr",
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 0,
            "favorite_count": 0,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "possibly_sensitive_editable": true,
            "lang": "ar",
            "supplemental_language": null
        },
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "C0DEED",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme7/bg.gif",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme7/bg.gif",
        "profile_background_tile": true,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1291641766236622850/MQXwBtQ7_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1291641766236622850/MQXwBtQ7_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/32936928/1507468245",
        "profile_link_color": "545454",
        "profile_sidebar_border_color": "FFFFFF",
        "profile_sidebar_fill_color": "F3F3F3",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": true,
        "default_profile": false,
        "default_profile_image": false,
        "pinned_tweet_ids": [],
        "pinned_tweet_ids_str": [],
        "has_custom_timelines": true,
        "following": null,
        "follow_request_sent": null,
        "notifications": null,
        "advertiser_account_type": "none",
        "advertiser_account_service_levels": [],
        "business_profile_state": "none",
        "translator_type": "none",
        "require_some_consent": false
    }
]