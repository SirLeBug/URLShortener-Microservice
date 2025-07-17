require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let urlDB = {};
let urlID = 1;

app.post('/api/shorturl', function(req, res) {
  const original_url = req.body.url;

  let hostname;
  try {
    hostname = new URL(original_url).hostname;
  } catch (err) {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    const short_url = urlID++;
    urlDB[short_url] = original_url;

    res.json({ original_url, short_url });
  });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const short_url = req.params.short_url;
  const original_url = urlDB[short_url];
  console.log(short_url);
  if (original_url) {
    return res.redirect(original_url);
  } else {
    return res.json({ error: 'No short URL found' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});