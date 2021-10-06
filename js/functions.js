import obj from "./obj.js"

let player = obj().player;
let canva = obj().canva;
let scoreHUD = obj().score;
let gOver = obj().gameOver;
let isMoving = false;
let vel = 15;
let baseScore = 10;
let score = 0;
let enemies = 0;
let nextLevel = 10;
let position = 0;

let listaDeEventos = [];
let gameplay = true;
let bgInterval;
let bgPosition = 0;

export const log = (i) =>{
    console.log(i);
}

export const onKeyDown = (event) => {
    if(!isMoving && gameplay){
        switch(event.keyCode){
            case 32:
                isMoving = true;
                jump();
                break
            default:
                log("nada");
                break
        }
    }
    
}

const functions = {
    log: log,
    onKeyDown: onKeyDown
}

export default functions;

function jump(){
    let up = setInterval(() => {
        if(position >= 150){
            clearInterval(up);
            let down =setInterval(() => {
                if(position <= 0){
                    isMoving = false;
                    clearInterval(down);
                }else{
                    position -= 5;
                    player.style.bottom = `${position}px`;
                }
                listaDeEventos.push(down);               
            }, 10);
        }else{
            position += 5;
            player.style.bottom = `${position}px`;
        }
    }, 10);
    listaDeEventos.push(up);

}

function jumpTest(){
    player.style.transform = "translateY(-120px)";
    let down = setTimeout(() => {
        player.style.transform = "translateY(0)";
    }, 350);
    let up = setTimeout(() => {
        isMoving = false;
    }, 350);
}

const randomEnemy = () =>{
    switch(Math.floor((Math.random() * 3) + 1)){
        case 1:
            return "cactus1"
            break
        case 2:
            return "cactus2"
            break
        case 3:
            return "cactus3"
            break
        default:
            break
    }

}

function setEnemies(){
    if(gameplay){
        const enemy = document.createElement('div');
        let enemyPosition = 1000;

        enemy.classList.add("enemy");
        enemy.classList.add(randomEnemy());
        enemy.style.left = `${enemyPosition}px`;
        canva.appendChild(enemy);

        let enemyMov = setInterval(() => {
            if(enemyPosition < -60){
                clearInterval(enemyMov);
                canva.removeChild(enemy);
                enemies++;
                scoreMov(); 
                if(enemies%nextLevel == 0){
                    nextLevel += 5;
                    baseScore++;
                    if(vel>5){
                        vel--;
                    }
                }
            }else if(enemyPosition > 75
                    && enemyPosition < 115
                    && position <60){
                        gameOver();
                        return;
            }else{
                enemyPosition -= 5 ;
                enemy.style.left =`${enemyPosition}px`;
            }
        }, vel);        
        listaDeEventos.push(enemyMov);
        setTimeout(setEnemies, vel*100 );
    } 
}

function scoreMov(){
    score+=baseScore;
    scoreHUD.innerHTML = `score: ${score}`;
}

function bgMoving(){
    bgInterval = setInterval(() => {
        if(bgPosition != 520){
            bgPosition -= 5;
        }else{
            bgPosition = 0;
        }
        canva.style.backgroundPosition = `${bgPosition}px`;

    }, vel);
}

function gameOver(){
    gameplay = false;
    for(let i=0; i<listaDeEventos.length; i++){
        clearInterval(listaDeEventos[i]);

    }
    clearInterval(bgInterval);
    listaDeEventos = [];
    gOver.style.visibility = "visible";
}

export function reStart(){
    let enemyList = document.getElementsByClassName("enemy");
    do{
        canva.removeChild(enemyList[0]);
    }while(enemyList.length>0);
    isMoving = false;
    gameplay = true;
    vel = 15;
    baseScore = 1;
    score = 0;
    enemies = 0;
    nextLevel = 10;
    position = 0;
    scoreHUD.innerHTML = 'score: 0';
    player.style.bottom = '0';
    
    gOver.style.visibility = "hidden";
    setEnemies();
    bgMoving();
}
    
setEnemies();
bgMoving();





