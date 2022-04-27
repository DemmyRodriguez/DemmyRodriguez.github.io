const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose')
const app = express();

app.use(express.json())
app.use(cors());

const ArticleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    body: String,
    author: String,
})

const ArticleModel = mongoose.model('article', ArticleSchema, 'Articles');

const mongoURI = "mongodb+srv://demmy:oUKguYTE4Mz4oo4T@cluster-1.axr01.mongodb.net/leagueItOut?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
    if (error) {
        console.log("Errror!" + error)
    }
})
const API_KEY = process.env.RIOT_API_KEY || "RGAPI-85779b4c-cd2f-42dc-9740-734726b92e9c";
const articles = [
    {
        id: 0,
        title: "My First Champion",
        body: "My first champion predates back to the year 2016 where I was still very new at playing games, especially PC ones and the way I chose was sorely based on aethetics. Now, I'm not going to lie... I still very much choose my champions based on if I find them aesthetically pleasing or not but at least now I've grown to expand and try new champions that I feel like will give me a fun time too. Anyway, down to the real reason I wrote this blog. My first League of Legends champion was none other than Syndra!",
        author: "Demmy",
    },
    {
        id: 1,
        title: "K/DA Proves How Awesome Riot Really Is",
        body: "Riot is always looking at ways to improve and gain new consumers. Lately they've delved into the music industry and fortunately enough for us they decided to jump on the hype train of k-pop music that has made a really huge name for itself in western society with bands such as BTS, Shinee, Twice, BlakcPink, and Mamamoo beating U.S. top charts and in some cases, world records. Riot really outdid themselves and created a whole k-pop band out of 4 league of legends champions (Kai'sa, Evelynn, Ahri, and Akali). They did not hold back on the music, visuals, and even on-stage presence in concert. I don't think they expected K/DA to get this big but they went above and beyond... I hope to see more out of K/DA in the coming months.",
        author: "Denilson",
    },
    {
        id: 2,
        title: "League of Legends Almost Caused My Downfall",
        body: "I know most people say to own up to your mistakes but I think this time I can truly blame two things for my freshmen year downfall, my friends and League of Legends. Freshmen year of college was not a great time to be introduced to League of Legends by my friends, especially when I went from bronze to gold in a matter of months. My grades slipped but my League of Legends rank only increased. League of Legends is amazing but be aware of the addiciton that will come with it too.",
        author: "Ousmane",
    },
]


app.get('/articles', async (req, res) => {
    ArticleModel.find(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})

app.get('/articles/:id', async (req, res) => {
    const articleID = req.params['id']
    ArticleModel.findOne({ _id: articleID },
        function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(data);
            }
        });
})

app.post('/articles', async (req, res) => {
    console.log(req.body)
    const { title, body, author } = req.body
    const article = new ArticleModel({
        title: title, body: body, author: author,
    })
    article.save(function (err, data) {
        if (err) {
            console.log(error)
        } else {
            res.json({ status: 'ok', message: 'article created', data: data })
        }
    })
})

app.delete('/articles/:id', async (req, res) => {
    const articleID = req.params['id']
    ArticleModel.findByIdAndDelete(articleID,
        function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ status: 'ok', message: 'successfully deleted article: ' + articleID })
            }
        });
})

app.put('/articles/:id', async (req, res) => {
    const articleID = req.params['id']
    const { title, body, author } = req.body
    updateArticle(articleID, title, body, author)
    ArticleModel.findByIdAndUpdate(articleID, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data)
        }
    })
})

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

app.listen(process.env.PORT || 4000, function () { //localhost will be 4000 instead of 3000
    console.log("Server started on port 4000");
}); 