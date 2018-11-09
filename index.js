const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const request = require('request')
// Create the server
const app = express()

var client_id = '867521c942e94dc3a5c3fe2ec399e307'; // Your client id
var client_secret = 'c05d16f9fc7140c28ea321a38a6536b8'; // Your secret
var token ='';
// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  var res = response 
  if (!error && response.statusCode === 200) {
    var access_token = body.access_token;
    token = access_token;
    // res.json({
    //   token : access_token
    // })
    // console.log(token);
  }
});

app.get('/token/', cors(), async (req, res, next) => {
  try {
    // const moo = cowsay.say({ text: 'Hello World!' })
    var acctoken = {token};
    res.json(acctoken);
  } catch (err) {
    next(err)
  }
})
const path = require('path')

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
