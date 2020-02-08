const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const commentsIP = `http://35.163.180.83:4001`;
const playerIp = `http://44.232.36.205:3002`;
const relatedTracksIp = `http://44.226.147.90:1000`;

const PORT = 4000;

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
console.log('getting');

// COMMENTS ROUTES
app.get('/comments_bundle', (req, res, next) => {
  console.log('hello');
  axios
    .get(commentsIP + '/comments_bundle')
    .then((response) => {
      const data = response.data;
      console.log('got something');
      res.send(data);
    })
    .catch((err) => {
      console.log("didn't get something");
      console.log(err);
      res.send(err);
    });
});

app.get('/api/comments/songs/:songId', (req, res, next) => {
  let { page, limit, join } = req.query;
  const { songId } = req.params;
  limit = Number(limit);
  console.log('proxy asking for json');
  axios
    .get(
      `${commentsIP}/api/comments/songs/${songId}?page=${page}&limit=${limit}&join=false`,
    )
    .then((response) => {
      const data = response.data;
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// // PLAYER ROUTES
// app.get('/player_bundle', (req, res) => {
//   axios.get(`${playerIp}/player_bundle`)
//   .then(data => {
//     res.send(data.data);
//   })
//   .catch(err => {
//     console.log('ERROR RETRIEVING PLAYER BUNDLE', err);
//     res.send(err);
//   });
// })
// app.get('/api/player/songs/:songId', (req, res) => {
//   const { songId } = req.params;
//   axios.get(`${playerIp}/api/player/songs/${songId}`)
//   .then(data => res.send(data.data))
//   .catch(err => {
//     console.log('ERROR RETRIEVING PLAYER FOR SONG', err);
//     res.send(err);
//   })
// })

// // RELATED ROUTES
// app.get('/relatedTracks_bundle', (req, res) => {
//   axios.get(`${relatedTracksIp}/relatedTracks_bundle`)
//   .then(data => res.send(data.data))
//   .catch(err => {
//     console.log('ERROR RETRIEVING RELATED TRACKS BUNDLE', err);
//     res.send(err);
//   })
// });

// app.get('/api/relatedTracks/songs/:songId', (req, res) => {
//   const { songId } = req.params;
//   axios.get(`${relatedTracksIp}/api/relatedTracks/songs/${songId}`)
//   .then(data => res.send(data.data))
//   .catch(err => {
//     console.log('ERROR RETRIEVING RELATED TRACKS FOR SONG', err);
//     res.send(err);
//   })
// })

app.listen(8080, () => console.log(`listening to port ${PORT}, yo`));
