//Strike Button
var strikeButton = document.querySelector("#strike")
// Reset Button
var resetButton = document.querySelector("#reset")
//Score 
var team1score_tag = document.getElementById("score-team1")
var team2score_tag = document.getElementById("score-team2")
//wicket
var team1wicket_tag = document.getElementById("wicket-team1")
var team2wicket_tag = document.getElementById("wicket-team2")
//Audio
var strikeAudio = new Audio("http://bit.ly/so-ball-hit")
var gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")
//variable to keep track of game
var team1score = 0
var team2score = 0
var team1wicket = 0
var team2wicket = 0
var team1BallsFaced = 0
var team2BallsFaced = 0
var turn = 1

var possibleOutcomes = [0,1,2,3,4,6,"W"];
strikeButton.addEventListener("click",strikeButtonClicked)
function strikeButtonClicked(){
    strikeAudio.pause()//to pause when button is clicked second time
    strikeAudio.currentTime=0//to start the audio from start when clicked second time 
    strikeAudio.play()
    //choosing random value
    var randomness = Math.random()
    var random1 = randomness * possibleOutcomes.length
    var randomIndex = Math.floor(random1)
    var randomValue= possibleOutcomes[randomIndex]
    //India batting
    if(turn==1){
        team1BallsFaced++;
        var ball = document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`)
        ball.innerHTML=randomValue
        if(randomValue=="W"){
            team1wicket++;
            team1wicket_tag.innerHTML = team1wicket
        }else{
            team1score+= randomValue
            team1score_tag.innerHTML=team1score
        }
    }
    if(team1BallsFaced==6 || team1wicket ==2){
        turn=2
        if(turn==2){
            team2BallsFaced++;
            var ball = document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`)
            ball.innerHTML=randomValue
            if(randomValue=="W"){
            team2wicket++;
            team2wicket_tag.innerHTML = team2wicket
            }else{
            team2score+= randomValue
            team2score_tag.innerHTML=team2score
            }
        }

    }
    if(team2score>team1score || team2wicket==2 || team2BallsFaced==6){
        turn=3
        setTimeout(()=>{
        gameOver();
       },10)
    }
}
function gameOver(){
    if(team1score>team2score || team2wicket==2){
        alert("India Wins!!!")
        
    }
    else if(team1score<team2score || team1wicket==2){
        alert("Pakistan Wins booooooooo")
        
    }else{
        alert("It's a tie...")
    }
    document.querySelectorAll(".ball").forEach(e=>{
        if(e.innerHTML==""){
            e.innerHTML="X"
            e.style.backgroundColor="grey"
        }
    })
    
    gameOverAudio.play();
    
}
resetButton.addEventListener("click",resetFunction)
function resetFunction(){
    window.location.reload()
}

