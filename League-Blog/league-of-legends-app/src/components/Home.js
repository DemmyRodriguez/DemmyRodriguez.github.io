import { useState } from 'react';
import axios from 'axios';


function Home () {
    const [searchText, setSearchText] = useState("");
    const [gameList, setGameList] = useState([]);
    
    function getPlayerGames(event) {
        axios.get("http://localhost:4000/past3Games", { params: { username : searchText}})
            .then(function (response) {
                setGameList(response.data);
                console.log(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        }

    
    return(
        <div className="Home">

            {/* Create search bar */}
            <input type="text" onChange={e => setSearchText(e.target.value)}/>
            
            {/* need to create getPlayerGames function above return statement*/}
            <button onClick={getPlayerGames}> Click for Info </button>

            {
                gameList.length !== 0 ? 
                <><p> This player exists </p> 
                {
                    gameList.map((gameData, index) =>
                    <>
                        <h2> Game {index + 1} </h2>
                        <div>
                            {gameData.info.participants.map((data, participantIndex) =>
                                <p>Player: {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists} </p>
                            )}
                        </div>
                    </>
                    )
                }
                </>
                : 
                <><p> This player does NOT exist </p></>
            }
        
        <div className="footer" />
        </div>
        
    )
}

export default Home;