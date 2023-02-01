// Dependencies ----------------------------------------------------
const fs		= require('fs');
const request	= require('request');
const express	= require('express');
const app 		= express();
const compression = require('express-compression')
// =====================================================


// Compression Middleware -----------------------------------------
// https://tools.keycdn.com/brotli-test
app.use(compression({
    // filter: compress/don't compress
    filter: (req, res) => {
        // don't compress responses with this request header
        if (req.headers['x-no-compression']) {
            return false
        }
        // fallback to standard filter function
        // return compression.filter(req, res)
        return true;
    },
    // use Brotli compression
    brotli: {
        enabled: true,
        zlib: {}
    }
}));



// Server setup --------------------------------------------------
const port = process.env.PORT || 80;
app.listen(port);
app.set('view engine', 'ejs');
console.log('Server is running on port ' + port);

// Static Pages ---------------------------------------------------
app.use('/img', express.static(__dirname + '/pages/img'));
///////////////////////////////////////////////////////////////////

// 
const api = {
    endPoints:{
        // Get new Twitter guest token
        token:	"https://api.twitter.com/1.1/guest/activate.json",
        // lookup for a user with exat username
        lookup:	"https://api.twitter.com/1.1/users/lookup.json?screen_name=",
        // search for users with similar username, or most searched
        search:	"https://api.twitter.com/1.1/users/search.json?count=1&q="
    },
    headers: {
        authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
    }
};


// Twitter Token
async function twitter_token(callback) {
    const options = {
        method: 'POST',
        url: api.endPoints.token,
        headers: api.headers
    };
    request(options, function (error, response, body) {
        if (!error) {
            const { guest_token } = JSON.parse(body);
            //console.log('New token : ' + guest_token);
            callback(guest_token);
        }
    });
};




// Format numbers
// https://en.wikipedia.org/wiki/Names_of_large_numbers

// function formatNum(x) {
//     x = Number(x)
//     if (x > 1e4-1  && x < 1e6-1 ) x = (x/1e3).toFixed()  + 'K'
//     if (x > 1e6-1  && x < 1e9-1 ) x = (x/1e6).toFixed()  + 'M'
//     if (x > 1e9-1  && x < 1e12-1) x = (x/1e9).toFixed()  + 'B'
//     if (x > 1e12-1 && x < 1e15-1) x = (x/1e12).toFixed() + 'T'
//     if (x > 1e15-1 && x < 1e18-1) x = (x/1e15).toFixed() + 'P'
//     if (x > 1e18-1 && x < 1e21-1) x = (x/1e18).toFixed() + 'E'
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// };

function formatNum(num, decimals = 1) {
    if (!+num) return '0';
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const symbol = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion', 'Duodecillion', 'Tredecillion', 'Quattuordecillion', 'Quindecillion', 'Sedecillion', 'Septendecillion', 'Octodecillion', 'Novendecillion', 'Vigintillion'];
    const i = Math.floor(Math.log(num) / Math.log(k));
    return `${parseFloat((num / Math.pow(k, i)).toFixed(dm))} ${symbol[i]}`;
};



// Home Page ------------------------------------------------------------
app.get('/', function (req, res) {
    console.log('Twitter Main Page : ' + req.url)
    res.sendFile(__dirname + '/pages/twitter.html')
})



//  Profile  Page --------------------------------------------------------
app.get('/lookup/:user', (req, res) => profile(req, res, 'lookup'));	// lookup
app.get('/search/:user', (req, res) => profile(req, res, 'search'));	// search
function profile(req, res, method) {
    twitter_token(token => {
        const user = req.params.user.toLowerCase().split(' ').join('');
        console.log('Search Name : ' + user);
        // make GET request to twitter

        // Configure the request
        const options = {
            method: 'GET',
            json: true,
            url: api.endPoints[method] + user,
            headers: {
                ...api.headers,
                'x-guest-token': token
            }
        };

        // Start the request
        request(options, function (error, response, body) {
            console.log(response.statusCode)
            // if no error
            if (!error && response.statusCode == 200 && body[0] ) {

                // Active Account 
                const profile_user = body[0];

                const tweets_str        = formatNum(profile_user.statuses_count);
                const following_str     = formatNum(profile_user.friends_count);
                const followers_str     = formatNum(profile_user.followers_count);
                const likes_str 	  	= formatNum(profile_user.favourites_count);
                const media_count_str	= formatNum(profile_user.media_count);

                const twitter = {
                    available: 1,
                    suspended: 0,
                    user_id: 	            profile_user.id,
                    user_id_str: 	        profile_user.id_str,
                    name: 		            profile_user.name,
                    account: 	            profile_user.screen_name,
                    verified: 		        profile_user.verified,
                    Bussnis_state: 	        profile_user.business_profile_state,
                    joined: 		        profile_user.created_at,
                    location: 		        profile_user.location,
                    website: 		        profile_user.url,
                    description: 	        profile_user.description,
                    tweets: 		        profile_user.statuses_count,
                    tweets_str: 	        tweets_str,
                    following: 		        profile_user.friends_count,
                    following_str: 	        following_str,
                    followers: 		        profile_user.followers_count,
                    followers_str: 	        followers_str,
                    likes: 			        profile_user.favourites_count,
                    likes_str: 		        likes_str,
                    media_count: 	        profile_user.media_count,
                    media_count_str:        media_count_str,
                    avatar: 		        profile_user.profile_image_url_https.replace("_normal", "_400x400"),
                    banner: 				profile_user.profile_banner_url,
                    background_image: 		profile_user.profile_background_image_url,
                    background_color: 		profile_user.profile_background_color,
                    link_color: 			profile_user.profile_link_color,
                    sidebar_border_color: 	profile_user.profile_sidebar_border_color,
                    sidebar_fill_color: 	profile_user.profile_sidebar_fill_color,
                    text_color: 			profile_user.profile_text_color
                };



                console.log(twitter);
                console.log(res.statusCode);
                res.render(__dirname + '/pages/twitter', twitter);
            }

            // if error = No User Found
            else {
                console.log('No Such a User .');

                const twitter = {
                    available: 0,
                    suspended: 0,
                    user_id: '',
                    user_id_str: '',
                    name: 'Not Found',
                    account: user,
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
                    avatar: '/img/user.jpg', //'https://s3-us-west-2.amazonaws.com/s.cdpn.io/256492/-_aKpGQt_400x400.jpg',
                    banner: '',
                    background_image: '',
                    background_color: '',
                    link_color: '',
                    sidebar_border_color: '',
                    sidebar_fill_color: '',
                    text_color: ''
                };

                res.render(__dirname + '/pages/twitter', twitter);
            }
        })

    })
};






// ===================================================================================================================
//  Twitter api ------------------------------------------------------------------------------------------------------
app.get('/api/:user', function (req, res) {
    twitter_token(token => {
        const user = req.params.user;
        console.log('Search Name : ' + user);
        // make GET request to twitter

        // Configure the request
        const options = {
            method: 'GET',
            json: true,
            url: api.endPoints.lookup + user,
            headers: {
                ...api.headers,
                'x-guest-token': token
            }
        };
        // Start the request
        request(options, function (error, response, body) {
            console.log(response.statusCode)
            // if no error
            if (!error && response.statusCode == 200 && body[0]) {

                // Active Account 
                res.send(body)
            }


            // if error or No Users Found
            else {
                console.log('Error or No Such a User .');
                res.send(body)

            }
        })

    })
})



// Twitter headers ---------------------------------------------------------------------------------------------------
app.get('/headers', (req, res) => {
	twitter_token(token => {
		res.send({
            ...api.headers,
			'x-guest-token': token
		})
	})
})


// robots.txt
app.get('/robots.txt', (req, res) => {
    res.send(`
    User-agent: *
    Allow: /
    # Disallow: /
    `);
});



// 404 Page ------------------------------------------------------------
// Redirect all unknown requests to the main page
app.get('*', function (req, res) {
    console.log('404 Request')
    res.redirect('/')
})
