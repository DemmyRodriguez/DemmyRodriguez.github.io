

function createRed(){
    // creating the div element
    let redDiv = document.createElement('div')
    // creating class name for div element
    redDiv.className = "red";
    redDiv.style.top=  (Math.random() * window.innerHeight).toString()+"px";
    redDiv.style.left = (Math.random() * window.innerWidth).toString() + 'px';
    // appending div to body using appendChild
    document.body.appendChild(redDiv);

    return redDiv
}

function createGreen(){
    // creating the div element
    let greenDiv = document.createElement('div')
    // creating class name for div element
    greenDiv.className = "green";
    greenDiv.style.top=  (Math.random() * window.innerHeight).toString()+"px";
    greenDiv.style.left = (Math.random() * window.innerWidth).toString() + 'px';
    // appending div to body using appendChild
    document.body.appendChild(greenDiv);
    return greenDiv
}

function createCyan(){
    // creating the div element
    let cyanDiv = document.createElement('div')
    // creating class name for div element
    cyanDiv.className = "cyan";
    cyanDiv.style.top=  (Math.random() * window.innerHeight).toString()+"px";
    cyanDiv.style.left = (Math.random() * window.innerWidth).toString() + 'px';
    // appending div to body using appendChild
    document.body.appendChild(cyanDiv);
    return cyanDiv
}

// function setUpEvents() {
//     let score=0;
//     let redDiv = createRed();
//     redDiv.onclick = function() { clickCharacter(redDiv) };

//     let greenDiv=createGreen();
//     greenDiv.onclick= function() { clickCharacter(greenDiv) };

//     let cyanDiv=createCyan();
//     cyanDiv.onclick= function() { clickCharacter(cyanDiv) };

//     function clickCharacter(character) {
//     // character.className = "shot";
//     score+=200;
//     document.getElementById("score").innerHTML=score;
//     setTimeout(anotherFunction(character), 500);
//     }
//     function anotherFunction(crewmate){
//       crewmate.parentNode.removeChild(crewmate);
//     }
// }

// create spawn function based on setupevent code
function spawn() {
    let redDiv = createRed();
    redDiv.onclick = function() { clickRedCharacter(redDiv) };
    
    let greenDiv=createGreen();
    greenDiv.onclick= function() { clickCharacter(greenDiv) };

    let cyanDiv=createCyan();
    cyanDiv.onclick= function() { clickCharacter(cyanDiv) };

    function clickCharacter(character) {
    // character.className = "shot";
    document.getElementById("score").innerHTML=parseInt( document.getElementById("score").innerHTML) + 200;
    setTimeout(anotherFunction(character), 500);
    }
    function anotherFunction(crewmate){
      crewmate.parentNode.removeChild(crewmate);
    }

    function clickRedCharacter(character) {
    // character.className = "shot";
    document.getElementById("score").innerHTML=parseInt( document.getElementById("score").innerHTML) - 200;
    setTimeout(anotherFunction(character), 500);
    }

    function clearBoard(char1,char2,char3){
        if(char1.parentNode!==null){
            char1.parentNode.removeChild(char1);
        }
        
        if(char2.parentNode!==null){
            char2.parentNode.removeChild(char2);
        }
        
        if(char3.parentNode!==null){
            char3.parentNode.removeChild(char3);
        } 
    }
    myClear=setInterval(clearBoard,1000,redDiv,greenDiv,cyanDiv)
    if(parseInt( timeLeft.textContent)===0){
        clearInterval(window.mySpawn)
        clearInterval(window.myCountdown)
        clearBoard(redDiv,greenDiv,cyanDiv)
        clearInterval(myClear)
    }
}

function countDown() {
    currentTime=parseInt(timeLeft.textContent);
    if (currentTime>0){
        currentTime--
    }
    timeLeft.textContent = currentTime
}

function turn(){
    document.getElementById("score").innerHTML=0; // remains to be seen if this will behave as expected; reset the score to 0 for each players turn
    window.mySpawn = setInterval(function(){spawn()},1200); // spawn (and by extension, despwn)
    window.myCountdown=setInterval(countDown,1000);
}
//create gamefunction
function theGame(){
    document.getElementById("player").innerHTML = "Player 1's Score:"
    turn();
    setTimeout(afterTurn1,30500)
    setTimeout(startTurn2,40500)
    setTimeout(afterTurn2,70500)
    setTimeout(Winner,71000)

    function afterTurn1(){
        player1Score=document.getElementById("score").innerHTML;
        alert("Player 2 will start in 10 seconds")
        window.score1= parseInt(player1Score);
    }
    function startTurn2(){
        document.getElementById("player").innerHTML = "Player 2's Score:"
        document.getElementById("timeLeft").innerHTML="30";
        turn();
    }
    function afterTurn2(){
        player2Score=document.getElementById("score").innerHTML;
        window.score2= parseInt(player2Score);
    }
    function Winner(){
        if(window.score1>window.score2){
            alert("Player 1 wins! Your score is "+ window.score1 +" which is greater than "+ window.score2 )
        }else if (window.score2>window.score1){
            alert("Player 2 wins! Your score is "+ window.score2 +" which is greater than "+ window.score1 )
        }
    }
    
}
//Time handler
window.onload = function(){
    theGame(); //This will mimic the function turn, without using the yet to be difined time variable
}


//display hidden or remove it in total