// const startBut = document.getElementById("startBut");

// startBut.addEventListener("click", Start);

// function Start(){
//     console.log("Started");
//     mixBut.removeEventListener("click", Start);
// }

myFunction = function() {
    let first = document.getElementById("fname").value;
    let second = document.getElementById("sname").value;
    
    document.getElementById("here").innerHTML = first+" "+second;
}

// startBut.addEventListener('click', () => {
//     window.open(pages/game.html, '_top')
// });