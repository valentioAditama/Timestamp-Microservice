const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', function(req, res) {
  let date = new Date();
  let UTC = date.toUTCString();
  let unix = date.getTime();
  res.json({
    unix: unix, 
    utc: UTC
  });
});

app.get("/api/:date", function (req, res) {
  try {
    let input = req.params.date;

    let timestamp;
    if (!input) {
      // If date parameter is empty, return the current time with a "unix" key
      timestamp = new Date().getTime();
      res.json({
        unix: timestamp
      });
      return;
    } else {
      timestamp = isNaN(input) ? new Date(input).getTime() : parseInt(input);

      if (isNaN(timestamp)) {
        res.status(400).json({
          error: "Invalid Date"
        });
        return;
      }
    }

    const timestampDate = new Date(timestamp);
    res.json({
      unix: timestamp,
      utc: timestampDate.toUTCString()
    });
  } catch (error) {
    res.status(400).json({
      error: error
    });
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
