// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

app.get("/dreams", (request, response) => {
  response.send(dreams)
})

app.get("/api/timestamp/:date?", (req, res) => {
  
  let date = null;
  if (req.params.date !== undefined) {

    // check if it is a unix timestamp...
    const unixTimestamp = parseInt(req.params.date*1);
    if (isNaN(unixTimestamp)) {

      // it's not a unix timestamp string
      date = new Date(req.params.date);
    } else {

      // it is a timestamp
      date = new Date(unixTimestamp);
    }

  } else {

    // the date string parameter is empty. 
    // create a new date based on current time 
    date = new Date(Date.now());
  }

  // Initialize the response object, if Date is invalid
  // this one will be returned

  let response = date == "Invalid Date" ? 
    { error: "Invalid Date" } :
    { "unix": date.getTime(),
      "utc": date.toUTCString()
    };

  res.json(response);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
