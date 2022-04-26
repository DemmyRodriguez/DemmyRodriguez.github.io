
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home () {
    const navigate= useNavigate();
    function send(){
        axios.get("http://localhost:4000/past3Games", { params: { username : document.getElementById('searchSummoner').value}})
        .then(function (response) {
            console.log(response.data)
            //https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
            navigate('/summonerInfo',{
                state:{
                    gameList: response.data.matches,
                    playerInfo: response.data.playerInfo
                }
            });
        }).catch(function (error) {
            console.log(error);
        })
    }
    // const [gameList, setGameList] = useState([]);
    // const [playerInfo, setPlayerInfo] = useState({});

    return(
        <div className='yolo'>
            {/* <h1>Hello</h1> */}
            <h2 className="yolo"> Become A Better League Summoner </h2>
         <section className='searchTextButton'>
            <input id='searchSummoner' type="text" placeholder='Enter Summoner Name' />
                
                {/* need to create getPlayerGames function above return statement */}
        </section>
        <button id='searchSummonerButton' onClick={send}> Click for Info </button>

        <div className="footer" />
        </div>
    )
}

export default Home;