/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, diceResults = [], winningScore = 20;
diceResults[0] = [];
diceResults[1] = [];

var dices = document.querySelectorAll(".dice");
var dice1 = dices[0];
var dice2 = dices[1];



init(); 

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
document.getElementById('change-winning-score').addEventListener('click', function() {
    winningScore = document.getElementById('winning-score').value;
    console.log(winningScore);
});

 //event handler with anonymous function
 document.querySelector('.btn-roll').addEventListener('click',  function () {
    if(gamePlaying) {

    // 1. Random number
    var dice1Number = Math.floor(Math.random() * 6) + 1;
    var dice2Number = Math.floor(Math.random() * 6) + 1;
    //diceResults[activePlayer].push(dice1, dice2);

    // 2. Display the result
    dice1.style.display = 'block';
    dice1.src = 'dice-' + dice1Number + '.png';

    dice2.style.display = 'block';
    dice2.src = 'dice-' + dice2Number + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1
    if(dice1Number !== 1 && dice2Number !== 1) {
        //Add score
        roundScore += dice1Number + dice2Number;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //NExt player
        /*if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
            
        }
        roundScore = 0; */
        roundScore = 0; 
        nextPlayer();
    }
    /*if(dice == 6 &&  diceResults[activePlayer][ diceResults[activePlayer].length-2]) {
        roundScore = 0;
    }*/
}

 });
 document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
        // Add current score to global score 
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if the player won the game  
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        dice1.style.display = 'none';
        dice2.style.display = 'none';

        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winnner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winnner');

        gamePlaying = false;
    } else {
       //Next player
        nextPlayer();
    }
  }
 });

 function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    /* document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active'); */
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    dice1.style.display = 'none';
    dice2.style.display = 'none';
 }

 document.querySelector('.btn-new').addEventListener('click', init);

 function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    dice1.style.display = 'none';
    dice2.style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winnner');
    document.querySelector('.player-1-panel').classList.remove('winnner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('winning-score').value = winningScore;
}