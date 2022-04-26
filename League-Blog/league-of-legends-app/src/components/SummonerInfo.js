import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function SummonerInfo() {

    const navigation = useNavigate()
    //https://thewebdev.info/2022/03/08/how-to-use-usenavigate-passing-value-to-another-component-with-react-router-dom-v6/
    const location = useLocation();
    let playerInfo= location.state.playerInfo;
    let gameList= location.state.gameList;
    
    function errorBackhome(){
        navigation('/')
    }
    
    

    return(
        <div className="summonerInfo">

            {/* <section className='searchTextButton'>
            <input id='searchSummoner' type="text" onChange={e => setSearchText(e.target.value)} placeholder='Enter Summoner Name' />
            
            <button id='searchSummonerButton' onClick={getPlayerGames}> Click for Info </button>
            </section> */}


            {
                gameList.length !== 0 ? 
                <>
                <div className='summonerInfo-Obtained'>
                    <h1> {playerInfo.name} </h1>
                    <h2>Summoner Level: {playerInfo.summonerLevel}</h2>
                    <img width="200" height="200" src={`http://ddragon.leagueoflegends.com/cdn/12.7.1/img/profileicon/${playerInfo.profileIconId}.png`} alt="Summoner Profile Icon" />
                </div>
                </>
                :
                <>
                <div className='wrongSpellingDiv'>
                <p> This player does NOT exist, please check your spelling or another summoner name :) </p>
                <br />
                <br />
                <img className='errorImage' width="480" height="480" alt=''/>
                <br />
                <br />
                <button id='tryAgainButton' onClick={errorBackhome}> Try Again </button>
                </div>
                </>
            }
            {
                gameList.length !== 0 ? 
                <>
                {
                    gameList.map((gameData, index) =>
                    <>
                        <div className='participants-div'>
                        <h2> Game {index + 1} </h2>
                            {gameData.info.participants.map((data, participantIndex) =>
                                <p> Player: {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists} </p>
                            )}
                        </div>
                    </>
                    )
                }
                        </>
                        : 
                        <> </>
            }
        
        <div className="footer" />
        </div>
        
    )
}

export default SummonerInfo;