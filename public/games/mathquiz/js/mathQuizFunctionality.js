alert('Get Ready and press ok, you start with 10 second!');

var level = 1;
var score = 0;
var vIntervalFunc, vAnswerFunc;

const exercices = [
  {
    exercice: '33 + 66 = X',
    answer: '99',
  },
  {
    exercice: 'X + 1 - 1 + 1 = 2',
    answer: '1',
  },
  {
    exercice: '33 = X - 100',
    answer: '133',
  },
  {
    exercice: 'X + 45 = -45',
    answer: '-90',
  },
  {
    exercice: 'X - 1.5 = 8.5',
    answer: '10',
  },

  //2
  {
    exercice: '2( X + 14 ) = 30',
    answer: '1',
  },
  {
    exercice: '60 + 60 * 1 + 1 = X',
    answer: '121',
  },
  {
    exercice: '44 : 22 : 2 : 2 = X',
    answer: '0.5',
  },
  {
    exercice: '1.4 = X - 12',
    answer: '13.4',
  },
  {
    exercice: '49 - 7 * X = 14',
    answer: '5',
  },
  //3
  {
    exercice: '3 + 3 * 3 - 3 + 3 = X',
    answer: '12',
  },
  {
    exercice: '6 - 1 * 0 + 2 : 2 = X',
    answer: '7',
  },
  {
    exercice: '30 : 1/2 + 10 = X',
    answer: '70',
  },
  {
    exercice: '3 - 3 - 3 + 4 = X',
    answer: '1',
  },
  {
    exercice: '9 - 3 : 1/3 + 1 = X',
    answer: '1',
  },
  //4
  {
    exercice: '6 : 2( 1 + 2) = X',
    answer: '9',
  },
  {
    exercice: '4X + 18 = 2',
    answer: '-4',
  },
  {
    exercice: 'X + 1/2 = 1/4',
    answer: '-1/4',
  },
  {
    exercice: '2 - 2 * 2 + 2 = X',
    answer: '0',
  },
  {
    exercice: '7 + 7 : 7 + 7 * 7 - 7',
    answer: '50',
  },
];
var userAnswer = true;
var iglobal = 0;
var btnRestart = document.getElementById('btn-restart');

function Start() {
  document.getElementById('current-level').innerHTML = level;
  document.getElementById('current-score').innerHTML = score;
  target = document.getElementById('ex');
  target.innerText = exercices[iglobal].exercice;
  btnRestart.style.visibility = 'hidden';

  if (level <= 5) {
    timeInterval(11);
    vAnswerFunc = setTimeout(verifyAnswer, 12000, iglobal);
  } else if (level > 5 && level <= 10) {
    timeInterval(10);
    vAnswerFunc = setTimeout(verifyAnswer, 11000, iglobal);
  } else if (level > 10 && level <= 15) {
    timeInterval(9);
    vAnswerFunc = setTimeout(verifyAnswer, 10000, iglobal);
  } else if (level > 15 && level <= 20) {
    timeInterval(8);
    vAnswerFunc = setTimeout(verifyAnswer, 9000, iglobal);
  } else {
    timeInterval(6);
    vAnswerFunc = setTimeout(verifyAnswer, 7000, iglobal);
  }
}

Start();

const restart = () => {
  level = 1;
  score = 0;
  iglobal = 0;
  document.getElementById('input-answer').value = '';
  Start();
};
const next = () => {
  clearInterval(vIntervalFunc);
  clearTimeout(vAnswerFunc);
  verifyAnswer(iglobal);
};

function verifyAnswer(i) {
  var response = document.getElementById('input-answer').value;

  if (response === exercices[i].answer) {
    score++;
    level++;
    document.getElementById('current-level').innerHTML = level;
    document.getElementById('current-score').innerHTML = score;
    alert("That's Correct, Press OK and continue.");
    iglobal++;
    document.getElementById('input-answer').value = '';
    if (iglobal === exercices.length) {
      parent.setScore(score);
      alert('In the end YOU ROCK! \n You make: ' + score + ' points');
      btnRestart.style.visibility = 'visible';
    }
    showLevelMessage(level);
    Start();
  } else {
    parent.setScore(score);
    alert('Wrong , your score is: ' + score + ' and you stop at level: ' + (level - 1));
    userAnswer = false;
    btnRestart.style.visibility = 'visible';
  }
}

function timeInterval(counter) {
  vIntervalFunc = setInterval(function() {
    counter--;
    if (counter > 0) {
      id = document.getElementById('timer');
      id.innerHTML = counter;
    }
    if (counter === 0) {
      id.innerHTML = 'COMPLETE';
    }
  }, 1000);
}

function showLevelMessage(currentLevel) {
  stages = [5, 10, 15];
  let i = 0;
  stages.forEach(function(stage) {
    if (currentLevel - 1 === stage)
      alert('you are at stage: ' + stages[i] + ', time drop with ' + (i + 1) + ' second now on.');
    i++;
  });
}
