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


function hit(event){ //ф-я попадания по элементу
    if(event.target == enemy){
        enemy.style.display = "none"
        count = count + 1;
        score.innerHTML = count;
        console.log("счет" + count)
    }
};


function gameStart(enemySize, time){//ф-я начала игры
    levels.style.display = "none";
    count = 0;//счет 
    enemy.style.width  = enemySize+"px";
    enemy.style.height  = enemySize+"px";
    setTimeout(gameEnd, 10000)
    interval_id = setInterval(function(){
     enemy.style.display = "block"
     enemy.style.left = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";
     enemy.style.top = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";
     }, time);
    gameField.addEventListener("click", hit);

    function gameEnd(){//окончание игры
        startPosition(); 
        clearInterval(interval_id);
        alert("Игра закончилась со счетом: " + count + ". Точность: " + Math.round((count/Math.floor((10000-time)/time))*100) + "%.");
        Math.fround
        levels.style.display ="block";
        gameField.removeEventListener("click", hit)
    };

}


