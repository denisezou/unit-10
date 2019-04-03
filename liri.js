require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

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
    "/events?app_id=codingbootcamp") {
        if (!error) {

            let theBand = JSON.parse(body);
            if (theBand.length > 0){
                console.log('\n\ Artist: ')
            }
        }
    }
}

function spotifyThis () {

    console.log('\n -------------------\n')

    if (!searchterm) {searchterm= "The Sign Ace of Base"}

}