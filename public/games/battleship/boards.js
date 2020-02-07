const popup = document.getElementById('menu_popup');
const scoreToShow = document.getElementById('score_to_show');
let userMatrix, compMatrix;
const initText = 'Please place your ships!';
const compTurnTxt = 'It is computer turn!';
const humanTurnTxt = 'It is your turn!';
const messageBoard = document.getElementById('message');
const position = 'h';
let chosen = 0;
let shipToDisappear;
const letterTable = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10 };
let isHumanTurnFinished = false;
const success = 'rgb(242, 27, 63)';
const fail = 'lightblue';
const hover = '#fed766';
const click_color = 'rgb(0, 78, 100)';
let comp_success = 0;
let user_success = 0;
let score = 0;
let moves = 0;
const ships = {
  carrier: 5,
  battle: 4,
  cruiser: 3,
  destroyer: 2,
  submarine: 3,
};

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + 1 + min);
}

function randomEvenInRange(min, max) {
  const nr = Math.floor(Math.random() * (max - min) + 1 + min);
  return nr % 2 === 0 ? nr : randomEvenInRange(min, max);
}

/**
 * Changes the color of  a nr of cells string from a specific row and column
 * @param column
 * @param color
 * @param row
 * @param cells number of cells to color
 */
const changeColor = (column, color, row, cells) => {
  const putRow = letterTable[row] - 1;
  let putColumn = parseInt(column) - 1;

  if (color === click_color) chosen++;
  for (let i = 0; i < cells; i++) {
    const sum = parseInt(column) + i;
    const tdClass = sum + row + 'u';
    const elem = document.getElementById(tdClass);
    if (
      elem.style.backgroundColor !== click_color &&
      elem.style.backgroundColor !== success &&
      elem.style.backgroundColor !== fail
    ) {
      elem.style.backgroundColor = color;
      if (color === click_color) {
        userMatrix[putRow][putColumn] = 1;
        putColumn++;
      }
    }
    // }
  }
  // }
};
let ship = 0;

let mouse_over;

/**
 * adds listeners for hover click and mouseout for the user to places it's ships
 */
function selectUser() {
  document.querySelectorAll('#user_board td').forEach((e) => {
    let tokens;
    let column, row;
    tokens = e.id.split('');
    if (e.id.includes('10')) {
      column = 10;
      row = tokens[2];
    } else {
      column = tokens[0];
      row = tokens[1];
    }

    const right = 10 - column;

    mouse_over = () => {
      if (
        right < ship - 1 ||
        isPositionOcupied(ship, letterTable[row] - 1, column - 1, userMatrix)
      ) {
        changeColor(column, 'red', row, ship);
      } else {
        if (e.style.backgroundColor !== success && e.style.backgroundColor !== fail)
          changeColor(column, hover, row, ship);
      }
    };

    e.addEventListener('mouseover', mouse_over);

    e.addEventListener('click', function mouse_click() {
      if (position === 'h') {
        if (
          right >= ship - 1 &&
          !isPositionOcupied(ship, letterTable[row] - 1, column - 1, userMatrix)
        ) {
          changeColor(column, click_color, row, ship);
          ship = 0;
          if (chosen === 15) {
            humanTurn();
          }
          shipToDisappear.style.visibility = 'hidden';
        }
      }
      // e.removeEventListener("click",mouse_click);
    });
    e.addEventListener('mouseout', () => {
      if (e.style.backgroundColor !== success && e.style.backgroundColor !== fail)
        changeColor(column, 'white', row, ship);

      // }
    });
  });
}

/**
 * if a aircraft from the list is clicked
 */
const aircraftClick = () => {
  document.querySelectorAll('.ship').forEach((Ship) => {
    Ship.addEventListener('click', () => {
      ship = ships[Ship.id];
      shipToDisappear = Ship;
      selectUser();
      document.querySelectorAll('#user_board td').forEach((e) => {
        e.removeEventListener('mouseover', mouse_over);
        // e.removeEventListener("click",mouse_click);
      });
    });
  });
};
/**
 *
 * @param number the number of cell to the left to look
 * @param row the row
 * @param column the start column
 * @param matrix
 * @returns {boolean}
 */
const isPositionOcupied = (number, row, column, matrix) => {
  if (isNaN(row)) return true;
  for (let i = 0; i < number; i++) {
    if (matrix[row][column + i] !== 0) return true;
  }
  return false;
};
/**
 * places each ship in the computer board
 *
 */
const createCompMatrix = () => {
  const a = Object.keys(ships);
  for (let compShip in a) {
    const b = a[compShip];
    const cells = ships[b];
    const max = 9 - cells;
    let startRow = randomInRange(0, 9);
    let startColumn = randomInRange(0, max);

    while (isPositionOcupied(cells, startRow, startColumn, compMatrix)) {
      startRow = randomInRange(0, max);
      startColumn = randomInRange(0, max);
    }

    for (let i = 0; i < cells; i++) {
      compMatrix[startRow][startColumn + i] = 1;
    }
  }
  console.log(compMatrix);
};

/**
 * When it is human turn it will get the clicked cell , mark it in the userMatrix
 * @param e the td clicked
 */
const humanTurnClick = (e) => {
  if (e.target.style.backgroundColor === success || e.target.style.backgroundColor === fail)
    alert("You can't click here");
  else {
    let i, j, values;
    if (e.target.id.includes('10')) {
      values = e.target.id.split('0');
      i = 10;
    } else {
      values = e.target.id.split('');
      i = parseInt(values[0]) - 1;
    }
    j = letterTable[values[1]] - 1;
    if (compMatrix[j][i] === 1) {
      score += 1;
      e.target.style.backgroundColor = success;
      user_success++;
    } else {
      e.target.style.backgroundColor = fail;
    }
    moves++;
    isHumanTurnFinished = true;
    messageBoard.innerText = compTurnTxt;
    isGameOver();
    setTimeout(compTurn, 800);
  }
};

const humanTurnHover = (e) => {
  if (e.target.style.backgroundColor !== success && e.target.style.backgroundColor !== fail)
    e.target.style.backgroundColor = hover;
};
/**
 * initiate the game , create 2 empty matrixes for user ad computer
 */
const initGame = () => {
  popup.style.visibility = 'hidden';
  scoreToShow.innerText = '0';
  score = 0;
  moves = 0;
  messageBoard.innerText = initText;
  scoreToShow.innerText = score.toString();
  chosen = 0;

  document.querySelectorAll('td').forEach((e) => (e.style.backgroundColor = 'white'));
  //
  document.querySelectorAll('#user_board td').forEach((e) => {
    e.removeEventListener('mouseover', mouse_over);
    // e.removeEventListener("click",mouse_click);
  });
  document.querySelectorAll('#computer_board td').forEach((e) => {
    e.removeEventListener('mouseover', humanTurnHover);
    e.removeEventListener('click', humanTurnClick);
  });
  document.querySelectorAll('.ship').forEach((Ship) => {
    Ship.style.visibility = 'visible';
  });
  userMatrix = [];
  compMatrix = [];

  comp_success = 0;
  user_success = 0;
  for (let i = 0; i < 10; i++) {
    const toAddComp = [];
    const toAdd = [];
    for (let j = 0; j < 10; j++) {
      toAdd.push(0);
      toAddComp.push(0);
    }
    userMatrix.push(toAdd);
    compMatrix.push(toAddComp);
  }
  createCompMatrix();
  aircraftClick();
};
// var cors = require('cors');
//
// app.use(cors());
const sendScoreServer = (score) => {
  const url = 'http://localhost:8080/scores';
  const Data = {
    userId: 1,
    gameId: 7,
    score: score,
  };
  // postData(url, Data).then((data)=>{console.log(data)});
  // const otherParams = {
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: Data,
  //     method: "POST"
  // };
  // fetch(url, {
  //     method: "GET",
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     mode: 'cors', cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin',
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer',
  //     // body: JSON.stringify(Data)
  // }).then((data)=> console.log(data));
};
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit',
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
/**
 * checks if the human or the computer won the game if so i will restart the game
 */
const isGameOver = () => {
  let final_score = 100 - moves + score;

  if (user_success === 16) {
    // alert("User wins");
    final_score += 5;
    messageBoard.innerText = 'You win';
  }
  if (comp_success === 16) {
    final_score -= 5;
    messageBoard.innerText = 'Computer wins';
  }
  if (user_success === 16 || comp_success === 16) {
    document.querySelectorAll('#user_board td').forEach((e) => {
      e.removeEventListener('mouseover', mouse_over);
      // e.removeEventListener("click",mouse_click);
    });
    let array;
    if (sessionStorage.getItem('scores') == null) {
      array = [final_score];
    } else {
      array = JSON.parse(sessionStorage.getItem('scores'));
      console.log(array);
      array.push(final_score);
    }
    sessionStorage.setItem('scores', JSON.stringify(array));
    removeListeners();
    parent.setScore(final_score);
    /* sendScoreServer(final_score);*/

    // setTimeout(initGame, 2000);
  }
  scoreToShow.innerText = final_score.toString();
};

const removeListeners = () => {
  document.querySelectorAll('#user_board td').forEach((e) => {
    e.removeEventListener('mouseover', mouse_over);
    // e.removeEventListener("click",mouse_click);
  });
  document.querySelectorAll('#computer_board td').forEach((e) => {
    e.removeEventListener('mouseover', humanTurnHover);
    e.removeEventListener('click', humanTurnClick);
  });
};
const reloadPage = () => {
  location.reload();
};

/**
 * add listeners for the human turn checking his moves
 */
const humanTurn = () => {
  messageBoard.innerText = humanTurnTxt;
  document.querySelectorAll('#computer_board td').forEach((e) => {
    e.addEventListener('mouseover', humanTurnHover);
    e.addEventListener('click', humanTurnClick);
    e.addEventListener('mouseout', () => {
      if (e.style.backgroundColor !== success && e.style.backgroundColor !== fail)
        e.style.backgroundColor = 'white';
    });
  });
};

/**
 *
 * @param number the value from letter table
 * @returns {string} the letter corresponding to that value
 */
const getLetterNumber = (number) => {
  for (let obj in letterTable) if (letterTable[obj] === number) return obj;
};

let hunt = true;
const visited = [];
const stack = [];
// let rows = [0,-1,0,1];
// let columns = [-1,0,1,0];
const rows = [0, 0];
const columns = [-1, 1];
/**
 * Adds a specific cell to stack if it'wasn't already visited
 * @param row
 * @param column
 */
const addToStack = (row, column) => {
  for (let i = 0; i < rows.length; i++) {
    const rowToAdd = row + rows[i];
    const columnToAdd = column + columns[i];
    if (!isCellVisited(rowToAdd, columnToAdd)) {
      const obj = { row: rowToAdd, column: columnToAdd };
      stack.push(obj);
    }
  }
};

/**
 * checks if a cell wa already visited
 * @param row
 * @param column
 * @returns {boolean}
 */
const isCellVisited = (row, column) => {
  for (let cell of visited) {
    if (cell.row === row && cell.column === column) return true;
  }
  return false;
};

/**
 * the algorithm for the computer to make his choice
 * It has 2 modes Hunt mode when it searches until it finds a part of a ship and
 * the strike that will target the ships added to the stack(left, right) of a valid cell until the stack is empty
 */
const compTurn = () => {
  document.querySelectorAll('#computer_board td').forEach((e) => {
    e.removeEventListener('mouseover', humanTurnHover);
    e.removeEventListener('mouseover', humanTurnClick);
  });
  let row, column;

  let td;
  if (stack.length === 0) {
    hunt = true;
  }

  if (hunt) {
    row = randomInRange(0, 10);
    column = randomEvenInRange(1, 10);

    while (isCellVisited(row - 1, column - 1)) {
      row = randomInRange(0, 10);
      column = randomInRange(0, 10);
    }
    const rowL = getLetterNumber(row) + 'u';
    const compClass = column + rowL;
    td = document.getElementById(compClass);

    if (row !== 0) row--;
    if (column !== 0) column--;
  } else {
    const ob = stack.pop();
    row = ob.row;
    column = ob.column;
    const rowL = getLetterNumber(row + 1) + 'u';
    const col = column + 1;
    const compClass = col + rowL;
    td = document.getElementById(compClass);
  }

  if (userMatrix[row][column] === 1) {
    td.style.backgroundColor = success;
    comp_success++;
    if (hunt) {
      hunt = false;
    }
    visited.push({ row: row, column: column });
    addToStack(row, column);
  } else {
    td.style.backgroundColor = fail;
    visited.push({ row: row, column: column });
  }

  humanTurn();
};

// let playGame = () =>{
//     console.log(userMatrix);
//
// };
initGame();

const restart = document.querySelector('#restart');
const resume = document.querySelector('#resume');
const menu = document.querySelector('#menu');
menu.addEventListener('click', () => {
  popup.style.visibility = 'visible';
});
restart.addEventListener('click', initGame);
resume.addEventListener('click', () => {
  popup.style.visibility = 'hidden';
});
