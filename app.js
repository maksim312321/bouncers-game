const gameField = document.getElementById("game-field");//игровое поле 
const enemy = document.getElementById("enemy");//цель(на которую нужно тыкнуть)
let score = document.getElementById("score");//счет
let levels = document.getElementById("levels");//блок выбора уровней
let levelsPresent = document.getElementsByClassName("precent");
let interval_id;
let count;
let precent;//процент прохждения

for(let i=0; i<5; i++){//вывод из локального хранилища процент прохождения игры
    if(localStorage.getItem(i, precent)){
    levelsPresent[i].innerHTML = localStorage.getItem(i, precent) + "%";
    }
}

function resetPresent(){
    localStorage.clear();
    for(let i=0; i<5; i++){//вывод из локального хранилища процент прохождения игры
        levelsPresent[i].innerHTML = 0 + "%";
    }
}

function startPosition(){//ф-я возврата на стартовую позицию
    enemy.style.left  = 0+"px";
    enemy.style.top  = 0+"px";
    score.innerHTML = 0;
};


function hit(event){ //ф-я попадания по элементу
    if(event.target == enemy){
        enemy.style.display = "none" //скрыть элемент, если по нему попали
        count = count + 1;
        score.innerHTML = count;
        console.log("счет" + count)
    }
};

function result(precent){ //Текстовый вывод результата
    if(precent>=80){
        return(" Круто!")
    }
    else if(precent>=60){
        return(" Неплохо!")
    }
    else if(precent>=40){
        return(" Нормально!")
    }
    else{
        return(" Пробуй еще, у тебя получится!")
    }
    
}

console.log(levelsPresent);
function gameStart(enemySize, time, level){//ф-я начала игры
    levels.style.display = "none";
    count = 0;//счет 
    enemy.style.width  = enemySize+"px";
    enemy.style.height  = enemySize+"px";
    setTimeout(gameEnd, 10000)
    interval_id = setInterval(function(){
     enemy.style.display = "block"//отобразить блок
     enemy.style.left = (Math.floor(Math.random( ) * (gameField.clientWidth - enemySize)))+ "px"; //рандом положения объекта по горизонтале
     enemy.style.top = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";//рандом положения объекта по вертикале

     }, time);
    gameField.addEventListener("click", hit);

    function gameEnd(){//окончание игры
        startPosition(); 
        clearInterval(interval_id);
        precent = Math.round((count/Math.floor((10000-time)/time))*100);
        alert("Точность: " + precent + "%."+ result(precent));
        localStorage.setItem(level-1, precent);
        levelsPresent[level-1].innerHTML = localStorage.getItem(level-1, precent) + "%";
        levels.style.display ="block";
        gameField.removeEventListener("click", hit)
    };
};


