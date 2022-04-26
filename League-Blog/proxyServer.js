const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');

const app = express();

app.use(express.json())
app.use(cors());

const API_KEY = "RGAPI-1de5a20f-72b3-4491-a202-387415cb2164";
const articles = [
    {
        id: 0,
        title: "My first article",
        body: "My article is the best article in the world My article is the best article in the world My article is the best article in the world My article is the best article in the world",
        author: "Demmy",
        createdAt: '2022-04-25T20:42:39.413Z',
    },
    {
        id: 1,
        title: "My second article",
        body: "My article is the best article in the world",
        author: "Denilson",
        createdAt: '2022-04-25T20:42:39.413Z',
    },
    {
        id: 2,
        title: "My third article",
        body: "My article is the best article in the world",
        author: "Ousmane",
        createdAt: '2022-04-25T20:42:39.413Z',
    },
]

app.get('/articles', async (req, res) => {
    res.json(getArticles())
})

app.get('/articles/:id', async (req, res) => {
    const articleID = req.params['id']
    const article = getArticle(articleID)
    res.json(article)
})

app.post('/articles', async (req, res) => {
    const {title, body, author} = req.body
    const newArticle = createArticle(title, body, author)
    res.json(newArticle)
})

app.delete('/articles/:id', async (req, res) => {
    const articleID = req.params['id']
    deleteArticle(articleID)
    res.json(getArticles)
})

app.put('/articles/:id', async (req, res) => {
    const articleID = req.params['id']
    const {title, body, author} = req.body
    updateArticle(articleID, title, body, author)
    res.json(getArticle(articleID))
})

function getArticles() {
    return articles;
}

function getArticle(id) {
    return articles[id];

}

function createArticle(title, body, author) {
    articles.push({ id: articles.length, title: title, body: body, author: author })
}

function deleteArticle(id) {
    articles.splice(id, 1)
}

function updateArticle(id, title, body, author) {
    articles[id].title = title;
    articles[id].body = body;
    articles[id].author = author;
}

// Need to get PUUID
function getPlayerInfo(playerName) {
    return axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${API_KEY}`)
        .then(response => {
            console.log(response.data);
            playerInfo = response.data;
            return playerInfo;
        }).catch(err => err);
}

// Want to GET past3Games
// Make endpoint localhost:4000/past3Games
app.get('/past3Games', async (req, res) => {
    const playerName = req.query.username;
    const playerInfo = await getPlayerInfo(playerName);
    const PUUID = playerInfo.puuid;
    console.log('id', PUUID)
    console.log('playerData: ', playerInfo)
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
    res.json({
       matches: matchDataArray,
       playerInfo: playerInfo
    })
});

app.listen(4000, function () { //localhost will be 4000 instead of 3000
    console.log("Server started on port 4000");
}); 