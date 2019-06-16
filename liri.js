require("dotenv").config();

const keys = require("./keys.js");

const Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);

let input = process.argv[2]
let searchterm = process.argv.slice(3).join(" ");


function whichCommand(input, searchterm){
switch (input) {
    case "concert-this":
    concertThis();
    break;
    
    case "spotify-this-song":
    spotifyThis();
    break;

    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doThis();
    break;
}

}

whichCommand(input, searchterm);

function concertThis () {
    console.log('\n ------------------\n');
    request ("https://rest.bandsintown.com/artists/" + searchterms + 
    "/events?app_id=trilogy")
        if (!error) {

            let theBand = JSON.parse(body);
            if (theBand.length > 0){
                console.log('\n\ Artist: ')
            
            }
        }
    }

function spotifyThis () {

    console.log('\n ------------------------------------------\n')

    if (searchterm === undefined) {
        searchterm = "The Sign Ace of Base";
        spotifyDeets();
    } else if (searchterm !== undefined) {
        spotifyDeets();
    }
}

function spotifyDeets () {
spotify.search({
    type: "track",
    query: title,
    limit: 1,
}, function (err, data) {
    if (data) {
        const data = data.tracks.items
        const deets = 
            "\n----------------------YOUR RESULTS FOR " + data[0].name + " BY " + data[0].artists[0].name +
            "\nAlbun: " + data[0].album.name +
            "\nPreview: " + data[0].preview_url
        console.log(deets)
    } else if (err) {
        const noDeets =
            "\n----------------------NO DEETS AVAILABLE FOR SPOTIFY-----------------------------------\n"
            console.log(noDeets);
    }
});
}


function movieThis () {

    console.log('\n -------------------\n')
    if (searchterm === undefined) {
        searchterm = "Mr+Nobody";
        movieDeets();
    } else if (searchterm !==undefined) {
        movieDeets();
    }

}


function movieDeets() {
    const queryURL = "http://www.omdbapi.com/?t=" + searchterm + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            if (body) {
                const data = JSON.parse(body);
                if (data.Error == "Try again!") {

                } else if (data.Ratings[1].Value !== undefined) {
                    const deets = 
                    "\n---------------YOUR RESULTS FOR" + data.Title + " AND MOVIE THIS------------------------" +
                    "\nYear: " +data.Year +
                    "\nRating: " +data.imdbRating +
                    "\nActors: " +data.Actors + "---------------------------------------------------------------------------";
                    console.log(deets);
                }

            }
        }
    })
}