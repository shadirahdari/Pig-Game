'use strict';
// selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // select id use# ,select class use dot.
const score1El = document.getElementById('score--1'); //  both of them are the same but getelementbyid is faster than queryselector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let Scores, currentScore, activePlayer, playing;

// starting condition,initialazing
const init= function(){
 Scores = [0, 0];
// its the biggest score on screen,we use an array because of score start from zero & players start from 0 too
currentScore = 0;
activePlayer = 0;
 playing = true;
 
    score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('plyer--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('plyer--active');
  player1El.classList.remove('player--active');
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



init();// we should call the function

/*score0El.textContent = 0;
score1El.textContent = 0; duplicate*/
diceEl.classList.add('hidden');
// rolling dice functoinality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generateing a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      /* 
     we do instead select the score element dynamically based on which 
    is the active player right now,
    So this is a very handy trick
    of building the ID name like this dynamically//
    // insted of (current0El.textContent = currentScore)*/
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    Scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      Scores[activePlayer];
    if (Scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.payer--active${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
  
