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
    setTimeout(anotherFunction, 500,character);
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
    setInterval(clearBoard,1000,redDiv,greenDiv,cyanDiv)
    // return clearBoard(redDiv,greenDiv,cyanDiv);
}

function turn(){
    document.getElementById("score").innerHTML=0; // reamins to be seen if this will behave as expected; reset the score to 0 for each players turn
    let time;// need a variable counting the secs
    while(time<70){//We should give 10 to get prepared, so 70-10 equal 60sec of playing time
        setInterval(spawn,1200,0); // spawn (and by extension, despwn)
    }
    let score= document.getElementById("score").innerHTML;// the players final score
    return score;
}
//create turn function; based on setupevents function


window.onload = function(){
    setInterval(spawn,1200,0); //This will mimic the function turn, without using the yet to be difined time variable
}

//display hidden or remove it in total


