import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const API_URL = process.env.API_URL || 'http://localhost:4000'
    const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (!development) API_URL = 'https://league-it-out.herokuapp.com';
    const navigate = useNavigate();
    function send() {
        axios.get(`${API_URL}/past3Games`, { params: { username: document.getElementById('searchSummoner').value } })
            .then(function (response) {
                console.log(response.data)
                //https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
                navigate('/summonerInfo', {
                    state: {
                        gameList: response.data.matches,
                        playerInfo: response.data.playerInfo
                    }
                });
            }).catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className='homeDiv'>
            <h2> Become A Better League Summoner </h2>
            <div className='searchTextButton'>
                <input id='searchSummoner' type="text" placeholder='Enter Summoner Name' />

                {/* need to create getPlayerGames function above return statement */}
                <button id='searchSummonerButton' onClick={send}> Click for Info </button>
            </div>
            <div className="footer" />
        </div>
    )
}

export default Home;