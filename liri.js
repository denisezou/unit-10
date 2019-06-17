require("dotenv").config();

const moment = require("moment");
const fs = require("fs");
const keys = require("./keys.js");
const request = require("request");
const Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify);

let input = process.argv[2];
let searchterm = process.argv.slice(3).join(" ");

function whichCommand(input, searchterm) {
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

function doThis() {
  fs.readFile("random.txt", "UTF8", function(err, data) {
    if (err) {
      const deets =
        "\n--------------TRIED DO THIS AND THERE'S NOTHING---------------";
      console.log(deets);
      fs.appendFile("log.txt", deets, function(err) {
        if (err) {
          return console.log("Recording to txt file did not go through.");
        }
      });
    }
    console.log(data);
    const readableData = data.split(",");
    console.log(readableData);
    input = readableData[0];
    process.argv[3] = readableData[1];
    searchterm = process.argv[3];
    whichCommand(input, searchterm);
  });
}

function concertThis() {
  console.log("\n ------------------------------------------\n");

  if (process.argv[3] === undefined) {
    searchterm = "The Rolling Stones";
    concertDeets();
  } else if (searchterm !== undefined) {
    concertDeets();
  }
}

function concertDeets() {
  console.log("\n \n ... ... ... loading ... ... ... : ) : ) : ) ;) \n");
  const queryURL =
    "https://rest.bandsintown.com/artists/" +
    searchterm +
    "/events?app_id=8ec324ef826291ad5730d77aad454740";
  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      if (body) {
        const data = JSON.parse(body);
        if (data === undefined) {
          const nada =
            "------------------TRIED CONCERT THIS AND THERE'S NOTHING----------------";
          fs.appendFile("log.txt", nada, function(err) {
            if (err) {
              return console.log("Recording to txt file did not go through.");
            }
          });
        } else if (data !== undefined) {
          for (i = 0; i < data.length; i++) {
            const deets =
              "\n------------YOUR RESULTS FOR " +
              data[0].lineup[0] +
              " AND CONCERT THIS---------------" +
              "\nVenue: " +
              data[i].venue.name +
              "\nCity: " +
              data[i].venue.city +
              "\nState: " +
              data[i].venue.region +
              "\nDate: " +
              moment(data[i].datetime).format("MM/DD/YYYY");
            ("\n---------------------------------------------------------------------------");
            console.log(deets);
            fs.appendFile("log.txt", deets, function(err) {
              if (err) {
                return console.log("Recording to txt file did not go through.");
              }
            });
          }
        }
      }
    }
  });
}

function spotifyThis() {
  console.log("\n \n ... ... ... loading ... ... ... : ) : ) : ) ;) \n");

  if (process.argv[3] === undefined) {
    searchterm = "The Sign Ace of Base";
    spotifyDeets();
  } else if (process.argv[3] !== undefined) {
    spotifyDeets();
  }
}

function spotifyDeets() {
  spotify.search(
    {
      type: "track",
      query: searchterm,
      limit: 20
    },
    function(err, data) {
      if (data) {
        let info = data.tracks.items;
        const deets =
          "\n--------YOUR RESULTS FOR " +
          info[0].name +
          " BY " +
          info[0].artists[0].name +
          "---------" +
          "\nThe album is: " +
          info[0].album.name +
          "\nPreview url of song: " +
          info[0].preview_url +
          "\nRelease date: " +
          info[0].album.release_date +
          "\nPopularity score: " +
          info[0].popularity +
          " out of 100" +
          "\n------------------------------------------------------------------------\n";

        console.log(deets);
      } else if (err) {
        const noDeets = console.log(err);
        ("\n----------------------NO DEETS AVAILABLE FOR SPOTIFY-----------------------\n");
        console.log(noDeets);
      }
    }
  );
}

function movieThis() {
  console.log("\n \n ... ... ... loading ... ... ... : ) : ) : ) ;) \n");
  if (process.argv[3] === undefined) {
    searchterm = "Mr+Nobody";
    movieDeets();
  } else if (process.argv[3] !== undefined) {
    movieDeets();
  }
}

function movieDeets() {
  const queryURL =
    "http://www.omdbapi.com/?t=" + searchterm + "&y=&plot=short&apikey=trilogy";
  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      if (body) {
        const data = JSON.parse(body);
        if (data.Error == "Try again!") {
          const nada =
            "------------------TRIED MOVIE THIS AND THERE'S NOTHING-------------------";
          fs.appendFile("log.txt", nada, function(err) {
            if (err) {
              return console.log("Recording to txt file did not go through.");
            }
          });
        } else if (data.Ratings !== undefined) {
          const deets =
            "\n---------------YOUR RESULTS FOR " +
            data.Title +
            " AND MOVIE THIS-------------" +
            "\nYear movie was released: " +
            data.Year +
            "\nIMDB rating: " +
            data.imdbRating +
            "\nActors featured: " +
            data.Actors +
            "\nPlot boiled down: " +
            data.Plot +
            "\n------------------------------------------------------------------------\n";
          console.log(deets);
          fs.appendFile("log.txt", deets, function(err) {
            if (err) {
              return console.log("Recording to txt file did not go through.");
            }
          });
        }
      }
    }
  });
}
