const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');

const app = express();

app.use(cors());

const API_KEY = "RGAPI-c694b489-c4cc-4fc9-a765-59e5bd0c4215";

// Need to get PUUID
function getPlayerPUUID(playerName) {
    return axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${API_KEY}`)
        .then(response => {
            console.log(response.data);
            return response.data.puuid
        }).catch(err => err);
}


// Want to GET past3Games
// Make endpoint localhost:4000/past3Games
app.get('/past3Games', async (req, res) => {
    const playerName = req.query.username;
    const PUUID = await getPlayerPUUID(playerName);
    console.log('id', PUUID)
    const API_CALL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?api_key=${API_KEY}`

    // create get request with API_CALL
    // get request will give us list of game IDs
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
    console.log(gameIDs);
    // Loop through each game ID
    // At each loop, we will get information based of ID (API_CALL)
    let matchDataArray = [];
    for (let i = 0; i < gameIDs.length - 17; i++) {
        const matchID = gameIDs[i];
        const matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData)
    }

    // Save info above in an array, give array as JSON response to user
    res.json(matchDataArray)
});

app.listen(4000, function () { //localhost will be 4000 instead of 3000
    console.log("Server started on port 4000");
}); 