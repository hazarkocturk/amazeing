const LEVEL_1 = [
  ["*","*","*","*","*","*","*","*","*","*","*",".","*"],
  ["*","S",".",".",".",".",".","*","*",".","*",".","T"],
  ["*","*","*","*","*",".",".",".",".",".","*",".","*"],
  ["*","*","*","*","*",".","*","*","*",".","*",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*",".","*"],
  ["*","*","*","*","*",".",".",".",".",".",".",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*","*","*"],
  ["*",".",".",".",".",".",".",".",".",".","*","*","*"],
  ["*",".","*","*","*","*","*","*",".",".",".","*","*"],
  ["*",".",".",".",".","*","*","*","*","*","*","*","*"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*"]
]

const LEVEL_2 = [
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
  ["*",".",".","S",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","*"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*",".","*"],
  ["*",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","*"],
  ["*",".","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
  ["*",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","T"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"]
]

const LEVEL_3 = [
  ["*","*","*","*","*","*","*","*"],
  ["*","*","*","*","S","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*",".",".",".",".",".",".","*"],
  ["*",".","*","*","*","*",".","*"],
  ["*",".",".","*","*","*",".","*"],
  ["*",".",".","*","*","*",".","*"],
  ["*","*",".","*","*","*","*","*"],
  ["*","T",".","*","*","*","*","*"],
  ["*","*","*","*","*","*","*","*"]
]

let main = document.querySelector("main")
maze=[]
currentLvl = LEVEL_1


currentLvl.forEach(function(row){
  let rowHTML = document.createElement('div');
  rowHTML.classList.add('row');
  row.forEach(function(col){
    let pixel = document.createElement('span');
    pixel.textContent = col;
    rowHTML.appendChild(pixel);
    if(col === "*") {
      pixel.classList.add('rock');
    }
    if(col === ".") {
      pixel.classList.add('water');
    }
    if(col === "S") {
      pixel.classList.add('ship');
    }
    if(col === "T") {
      pixel.classList.add('treasure');
    }
  });
  maze.push(rowHTML);
});

maze.forEach(function(row){
  main.appendChild(row);
});


window.addEventListener("keydown", function(e) {
  // Find player position
  let playerRow = -1;
  let playerCol = -1;
  let treasureRow = -1;
  let treasureCol = -1;
  
  for (let i = 0; i < currentLvl.length; i++) {
    let row = currentLvl[i];
    let index = row.indexOf('S');
    if (index !== -1) {
      playerRow = i;
      playerCol = index;
    }
    
    let tindex = row.indexOf('T');
    if (tindex !== -1) {
      treasureRow = i;
      treasureCol = tindex;
    }
    console.log( playerRow, playerCol, treasureRow, treasureCol)
  }

  if (e.key === "ArrowUp" && playerRow > 0 && currentLvl[playerRow - 1][playerCol] !== "*") {
    currentLvl[playerRow][playerCol] = ".";
    currentLvl[playerRow - 1][playerCol] = "S";
  } else if (e.key === "ArrowDown" && playerRow < currentLvl.length - 1 && currentLvl[playerRow + 1][playerCol] !== "*") {
    currentLvl[playerRow][playerCol] = ".";
    currentLvl[playerRow + 1][playerCol] = "S";
  } else if (e.key === "ArrowLeft" && playerCol > 0 && currentLvl[playerRow][playerCol - 1] !== "*") {
    currentLvl[playerRow][playerCol] = ".";
    currentLvl[playerRow][playerCol - 1] = "S";
  } else if (e.key === "ArrowRight" && playerCol < currentLvl[playerRow].length - 1 && currentLvl[playerRow][playerCol + 1] !== "*") {
    currentLvl[playerRow][playerCol] = ".";
    currentLvl[playerRow][playerCol + 1] = "S";
  }

  if (treasureRow === -1 && treasureCol === -1){
    alert('Ahoy! You found the treasure!');
    if (currentLvl === LEVEL_1) {
      currentLvl = LEVEL_2;
    } else if (currentLvl === LEVEL_2) {
      currentLvl = LEVEL_3;
    } else if (currentLvl === LEVEL_3) {
      currentLvl = LEVEL_1;
    }
  }

  main.innerHTML = '';
  currentLvl.forEach(function(row) {
    let rowHTML = document.createElement('div');
    rowHTML.classList.add('row');
    row.forEach(function(col) {
      let pixel = document.createElement('span');
      pixel.textContent = col;
      rowHTML.appendChild(pixel);
      if (col === "*") {
        pixel.classList.add('rock');
      }
      if (col === ".") {
        pixel.classList.add('water');
      }
      if (col === "S") {
        pixel.classList.add('ship');
      }
      if (col === "T") {
        pixel.classList.add('treasure');
      }
    });
    main.appendChild(rowHTML);
  });
});
