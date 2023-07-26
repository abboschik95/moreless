'use strict';

//Selecting elements
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove(`player--winner`);
  player1.classList.remove(`player--winner`);
  player0.classList.add(`player--active`);
  player1.classList.remove(`player--active`);
};

init();

//Toggle active player
const toggleActive = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Roll Dice
rollDice.addEventListener('click', function () {
  if (playing) {
    //Random Dice
    let dice = Math.floor(Math.random() * 6) + 1;
    //Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check for rolled 1 : if true, switch to next player
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      toggleActive();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check winner
    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add('hidden');
    } else {
      toggleActive();
    }
  }
});

document.querySelector(`.btn--new`).addEventListener('click', init);
