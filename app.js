const gameField = document.getElementById("game-field");//игровое поле 
const enemy = document.getElementById("enemy");//цель(на которую нужно тыкнуть)
let score = document.getElementById("score");//счет
let levels = document.getElementById("levels");//блок выбора уровней
let levelsPresent = document.getElementsByClassName("precent");
let interval_id;
let timeout_id;
let count;
let precent;//процент прохждения

levelsPresent[0].innerHTML = localStorage.getItem(0, precent);
for(let i=1; i<6; i++){//вывод из локального хранилища процент прохождения игры
    if(localStorage.getItem(i, precent)){
    levelsPresent[i].innerHTML = localStorage.getItem(i, precent) + "%";
    }
}

function resetPresent(){
    levelsPresent[0].innerHTML = 0;
    localStorage.clear();
    for(let i=1; i<6; i++){//вывод из локального хранилища процент прохождения игры
        levelsPresent[i].innerHTML = 0 + "%";
    }
}

function startPosition(){//ф-я возврата на стартовую позицию
    enemy.style.left  = 0+"px";
    enemy.style.top  = 0+"px";
    score.innerHTML = 0;
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
    
};

function gameStart(enemySize, time, level){//ф-я начала игры
    levels.style.display = "none";
    count = 0;//счет 
    enemy.style.width  = enemySize+"px";
    enemy.style.height  = enemySize+"px";
    if (level!= 0){ // если выбран уровень с 1-5 ставим таймер, иначе свободный режим игры б
    timeout_id = setTimeout(gameEnd, 10000)
    }
    interval_id = setInterval(function(){
     enemy.style.display = "block"//отобразить блок
     enemy.style.left = (Math.floor(Math.random( ) * (gameField.clientWidth - enemySize)))+ "px"; //рандом положения объекта по горизонтале
     enemy.style.top = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";//рандом положения объекта по вертикале

     }, time);

     function gameEnd(lose){//окончание игры
        startPosition(); 
        clearInterval(interval_id);
        if(lose){ //если игра проиграна (то есть допущен промах)
            clearTimeout(timeout_id);//очищаем таймер окончания игры
            alert(lose);//выводим соответсвующую надпись
            if(level == 0){
                localStorage.setItem(level, count);//запись в локальное хранилище рекорда по очкам
                levelsPresent[level].innerHTML = localStorage.getItem(level, count);// вывод на экран рекорд по очками
            }
        }
        else{//игра закончена по таймеру
            precent = Math.round((count/Math.floor((10000-time)/time))*100);//расчет процента попадания
            alert("Попадания: " + precent + "%."+ result(precent));
            localStorage.setItem(level, precent);//запись в локальное хранилище процента прохождения игры
            levelsPresent[level].innerHTML = localStorage.getItem(level, precent) + "%";//вывод на экран процента прохождения
        }
        levels.style.display ="block";
        gameField.removeEventListener("click", hit)
    };

     function hit(event){ //ф-я попадания по элементу
        if(event.target == enemy){
            enemy.style.display = "none" //скрыть элемент, если по нему попали
            count = count + 1;
            score.innerHTML = count;
        }
        else{
            gameEnd("Вы промахнулись! Попробуйте еще раз.");
        }
    }
    gameField.addEventListener("click", hit);//попадание по элементу
};


