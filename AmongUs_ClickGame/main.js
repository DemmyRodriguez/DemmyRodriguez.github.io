
function startBut(){
    var player1= document.getElementById("fname").value;
    var player2=document.getElementById("sname").value;
    window.location.href='pages/game.html?player1='+player1+'?player2='+player2
}

window.onload=function (){
    document.getElementById("startBut").onclick = function() {startBut()}
}
