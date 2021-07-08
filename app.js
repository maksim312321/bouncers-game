const gameField = document.getElementById("game-field");//игровое поле 
const enemy = document.getElementById("enemy")//цель(на которую нужно тыкнуть)


let enemySize = 200
enemy.style.width  = enemySize+"px";
enemy.style.height  = enemySize+"px";
setInterval(function(){
     enemy.style.left = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";
     enemy.style.top = (Math.floor(Math.random( ) * (gameField.clientHeight - enemySize)))+ "px";
     }, 300);




gameField.addEventListener("click", (event)=>{
    if(event.target == enemy){
        console.log("попал!");

    }
    else{
        console.log("не попал!");

    };
})