export default function obj(){
    return {
        player: player,
        canva: canva,
        score: score,
        gameOver: gameOver,
    }
}

const player = document.querySelector('.player');

const canva = document.querySelector('.canva');

const score = document.querySelector('.score');

export const jogarNovamente = document.querySelector('.gameOver button');

const gameOver = document.querySelector('.gameOver');