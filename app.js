const gameField = document.getElementById("game-field");//игровое поле 
const enemy = document.getElementById("enemy");//цель(на которую нужно тыкнуть)
let score = document.getElementById("score");//цель(на которую нужно тыкнуть)
let levels = document.getElementById("levels");//цель(на которую нужно тыкнуть)
let interval_id;
let count;

function startPosition(){//ф-я возврата на стартовую позицию
    enemy.style.left  = 0+"px";
    enemy.style.top  = 0+"px";
    score.innerHTML = 0;
};

function gameEnd(){//окончание игры
    startPosition(); //
    clearInterval(interval_id);
    alert("Игра закончилась со счетом: " + count);
    levels.style.display ="block";
    count = 0;
    gameField.removeEventListener("click", hit)
};

function hit(event){
    if(event.target == enemy){
        enemy.style.display = "none"
        count = count + 1;
        score.innerHTML = count;
        console.log("счет" + count)
    }
    else{
    };
};


function gameStart(enemySize, time){//ф-я начала игры
    levels.style.display = "none";
    setTimeout(gameEnd,15000)
    count = 0;//счет 
    enemy.style.width  = enemySize+"px";
    enemy.style.height  = enemySize+"px";
    interval_id = setInterval(function(){
     enemy.style.display = "block"
     enemy.style.left = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";
     enemy.style.top = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";
     }, time);

    gameField.addEventListener("click", hit)
}


