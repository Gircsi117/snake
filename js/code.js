const ELEMETS = [
    "fild",
    "block",
    "snakebody",
    "snakehead",
    "apple",
    "goldenapple",
    "greanapple"
];

const DIFFICULTi = [
    "easy",
    "medium",
    "hard",
    "extreme"
];

const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    P: 80,
    ENTER: 13,
}

const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}

let gameTable = document.getElementById("gameTable");
let startBT = document.getElementById("startBT");
let gameBackGround = document.getElementById("gameBackGround");
let gameArea = document.getElementById("gameArea");
let startPanel = document.getElementById("startPanel");
let results = document.getElementById("results");
let easyBT = document.getElementById("easy");
let mediumBT = document.getElementById("medium");
let hardBT = document.getElementById("hard");
let extremeBT = document.getElementById("extreme");
let table = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
let snake = [];
let buttons = [easyBT, mediumBT, hardBT, extremeBT]
let buttonNumber = 0;
let moveDirection;
let speed;
let obstacle;
let snakeHeadPos;
let difficulti;
let point;
let game = false;
let move = false;
let moveIntervall;
let nextPos;
let double = false;

buttons[buttonNumber].classList.add("selectedBT");
difficulti = "easy"

easyBT.addEventListener("click", ()=>{
    difficulti = "easy";
    easyBT.classList.add("selectedBT");
    mediumBT.classList.remove("selectedBT");
    hardBT.classList.remove("selectedBT");
    extremeBT.classList.remove("selectedBT");


});

mediumBT.addEventListener("click", ()=>{
    difficulti = "medium";
    easyBT.classList.remove("selectedBT");
    mediumBT.classList.add("selectedBT");
    hardBT.classList.remove("selectedBT");
    extremeBT.classList.remove("selectedBT");

});

hardBT.addEventListener("click", ()=>{
    difficulti = "hard";
    hardBT.classList.add("selectedBT");
    easyBT.classList.remove("selectedBT");
    mediumBT.classList.remove("selectedBT");
    extremeBT.classList.remove("selectedBT");

});

extremeBT.addEventListener("click", ()=>{
    difficulti = "extreme";
    extremeBT.classList.add("selectedBT");
    easyBT.classList.remove("selectedBT");
    mediumBT.classList.remove("selectedBT");
    hardBT.classList.remove("selectedBT");

});

document.addEventListener("keydown", (key)=>{
    if (game) {
        if (move == false) {
            move = true;
            moveStart();
        }
        switch (key.keyCode) {
            case KEYS.UP: {swichDirection(KEYS.UP); break;};
            case KEYS.W: {swichDirection(KEYS.UP); break;};

            case KEYS.RIGHT: {swichDirection(KEYS.RIGHT); break;};
            case KEYS.D: {swichDirection(KEYS.RIGHT); break;};

            case KEYS.DOWN: {swichDirection(KEYS.DOWN); break;};
            case KEYS.S: {swichDirection(KEYS.DOWN); break;};

            case KEYS.LEFT: {swichDirection(KEYS.LEFT); break;};
            case KEYS.A: {swichDirection(KEYS.LEFT); break;};

            case KEYS.P: {move = false; clearInterval(moveIntervall); break;};
        }
        drawTable();
    }
    else{
        switch (key.keyCode) {
            case KEYS.UP: {previousMenu(); break;};
            case KEYS.W: {previousMenu(); break;};

            case KEYS.DOWN: {nextMenu(); break;};
            case KEYS.S: {nextMenu(); break;};

            case KEYS.ENTER: {start(); break;};
        }
    }
    
});

startBT.addEventListener("click", ()=>{
    start();
});

function start(params) {
    if (game == false) {
        game = true;
        if (difficulti != null) {
            switch (difficulti) {
                case "easy": {speed = 800; obstacle = 0; break;}
                case "medium": {speed = 650; obstacle = 5; break;}
                case "hard": {speed = 500; obstacle = 10; break;}
                case "extreme": {speed = 300; obstacle = 20; break;}
            }
            snakeHeadPos = null;
            snake = [];
            point = 0;
            moveDirection = 1;
            switchPanel(1, 2);
            generateTable();
            genarateObstacle();
            generateApple();
            generateSnake();
            drawTable();
        }
        else{
            alert("Válassz nehézséget!");
        }
    }
}

function drawTable() {
    let str = '<table class="tabla" id="tabla">'
    for (let i = 0; i < 20; i++) {
        
        str += '<tr>'
        for (let j = 0; j < 20; j++) {
            str += '<td id="'+ELEMETS[table[i][j]]+'"></td>'
            
            
        }
        str += '</tr>'
    }
    str += '</table>'
    gameTable.innerHTML = str;
    let sh = document.getElementById("snakehead");
    sh.style.transform = `rotate(${moveDirection*90}deg)`;
    kiirat();
}

function switchPanel(a, b){
    startPanel.style.zIndex = a;
    gameBackGround.style.zIndex = b;
}

function generateTable(params) {
    for (let i = 0; i < table.length; i++) {
        
        for (let j = 0; j < 20; j++) {
            if (i == 0 || i == 19 || j == 0 || j == 19) {
                table[i][j] = 1
            }
            else{
                table[i][j] = 0;
            }
            
        }
        
    }
}

function genarateObstacle(params) {
    for (let i = 0; i < obstacle; i++) {
        generateElement(1);
        
    }
}

function generateElement(element) {
    let x, y;
    if (element == 3) {
        do {
            x = Math.round(Math.random()*17+1);
            y = Math.round(Math.random()*17+1);
        } while (posscan(x, y));
        table[x][y] = element
        snakeHeadPos = {'x':x, 'y':y};
        snake.push(snakeHeadPos)
        generateElement(2);
    }
    else if (element == 2) {
        table[snakeHeadPos.x][snakeHeadPos.y-1] = 2;
        snake.push({'x':snakeHeadPos.x, 'y':snakeHeadPos.y-1})
    }
    else{
        do {
            x = Math.round(Math.random()*17+1);
            y = Math.round(Math.random()*17+1);
        } while (table[x][y] != 0);
        table[x][y] = element
    }
}

function kiirat(params) {
    results.innerHTML = `Az összegyűjtött pontok: ${point}`;
}

function generateApple() {
    generateElement(4);
}

function generateSnake(params) {
    generateElement(3);
}

function swichDirection(k) {
    if (k == KEYS.UP && (moveDirection == 1 || moveDirection == 3)) {
        moveDirection = 0;
    }
    if (k == KEYS.RIGHT && (moveDirection == 0 || moveDirection == 2)) {
        moveDirection = 1;
    }
    if (k == KEYS.DOWN && (moveDirection == 1 || moveDirection == 3)) {
        moveDirection = 2;
    }
    if (k == KEYS.LEFT && (moveDirection == 0 || moveDirection == 2)) {
        moveDirection = 3;
    }
}

function posscan(x, y) {
    //console.log(`${x}---${y}`);
    if (table[x-1][y-1] != 0 || table[x-1][y] != 0 || table[x-1][y+1] != 0 || table[x][y-1] != 0 || table[x][y] != 0 || table[x][y+1] != 0 || table[x+1][y-1] != 0 || table[x+1][y] != 0 || table[x+1][y+1] != 0) {
        return true;
    }
    else{
        return false;
    }
}

function moveStart(params) {
    moveIntervall = setInterval(() => {
        step();
    }, speed);
}

function step() {
    let mehet = true;
    switch (moveDirection) {
        case DIRECTION.UP: {nextPos = {'x':snakeHeadPos.x-1, 'y':snakeHeadPos.y}; break};
        case DIRECTION.RIGHT: {nextPos = {'x':snakeHeadPos.x, 'y':snakeHeadPos.y+1}; break};
        case DIRECTION.DOWN: {nextPos = {'x':snakeHeadPos.x+1, 'y':snakeHeadPos.y}; break};
        case DIRECTION.LEFT: {nextPos = {'x':snakeHeadPos.x, 'y':snakeHeadPos.y-1}; break};
    }
    switch (table[nextPos.x][nextPos.y]) {
        case 0: {nextadd(nextPos); break};
        case 1: {gameOver(); mehet = false; break};
        case 2: {if (nextPos.x == snake[snake.length-1].x && nextPos.y == snake[snake.length-1].y) {nextadd(nextPos); snake.pop()}else{gameOver(); mehet = false;} break};
        case 4: {nextadd(nextPos); break};
        case 5: {nextadd(nextPos); break};
        case 6: {nextadd(nextPos); break};
    }
    
    if (mehet) {
        for (let i = 0; i < snake.length-1; i++) {
            
            let a = table[snake[i].x][snake[i].y]
            table[snake[i].x][snake[i].y] = table[snake[i+1].x][snake[i+1].y]
            table[snake[i+1].x][snake[i+1].y] = a;
        }

        snakeHeadPos = {'x':snake[0].x, 'y':snake[0].y}

        let last = table[snake[snake.length-1].x][snake[snake.length-1].y]

        if (last == 0) {
            if (double == false) {
                snake.pop();
            }
            else{
                table[snake[snake.length-1].x][snake[snake.length-1].y] = 2;
                double = false;
            }
        }
        else if (last == 4) {
            table[snake[snake.length-1].x][snake[snake.length-1].y] = 2;
            generateElement(4);
            point++;
            kiirat();
            if (point % 10 == 0) {
                generateElement(5);
            }
            if (Math.round(Math.random()*10) == 5) {
                generateElement(6);
            }
        }
        else if (last == 5) {
            table[snake[snake.length-1].x][snake[snake.length-1].y] = 2;
            point += 2;
            double = true;
            kiirat();
        }
        else if (last == 6) {
            point--;
            for (let i = 0; i < 2; i++) {
                table[snake[snake.length-1].x][snake[snake.length-1].y] = 0;
                snake.pop();
            }
            if (snake.length == 1) {
                gameOver();
            }
        }
        
        
        drawTable();
    }
}

function nextadd(next) {
    let snaketable = [];
    snaketable.push(next);
    for (let i = 0; i < snake.length; i++) {
        snaketable.push(snake[i]);
    }
    snake = snaketable;
}

function gameOver(params) {
    game = false;
    move = false;
    clearInterval(moveIntervall);
    document.getElementById("snakehead").style.backgroundImage = 'url("img/over_snakehead.png")';
    document.getElementById("gameover").style.visibility = "visible";
    document.getElementById("eredmeny").innerHTML = `A megszerzett pontok: ${point}`;
    console.log("Game Over");
    switchPanel(2, 1);
}

function nextMenu() {
    buttonNumber++;
    if (buttonNumber == 4) {
        buttonNumber = 0;
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selectedBT");
    }
    buttons[buttonNumber].classList.add("selectedBT");
    difficulti = DIFFICULTi[buttonNumber];
}

function previousMenu() {
    buttonNumber--;
    if (buttonNumber == -1) {
        buttonNumber = 3;
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selectedBT");
    }
    buttons[buttonNumber].classList.add("selectedBT");
    difficulti = DIFFICULTi[buttonNumber];
}