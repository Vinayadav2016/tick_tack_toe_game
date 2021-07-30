const blocks = document.getElementsByClassName('block');
const gamePanel = document.getElementsByClassName('gamepanel')[0];
const result = document.querySelector('.result div');
const restart = document.querySelector('.result button');
const playButton = document.querySelector('.three button');
const extraOption = document.querySelectorAll('.gamepanel-extra-options button');
extraOption[0].addEventListener('click',restartall);
extraOption[1].addEventListener('click',undo);
playButton.addEventListener('click',threeGame);
function threeGame() {
    playButton.parentElement.parentElement.parentElement.classList.add('hide');
    start();
}
restart.addEventListener('click',restartall);
function restartall(){
    start();
}
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const movesDone = [];
function undo(){
  if(movesDone){
    const e = movesDone.pop();   
    reCreate(e);
    const classOfTurn =Turn ? 'x': 'o';// add the class to gamepanel
    gamePanel.classList.add('x');
    gamePanel.classList.add('o');
    gamePanel.classList.remove(classOfTurn);
    changeTurn();
  }  
}
let Turn;
function reCreate(block){
  block.classList.remove('x');
  block.classList.remove('o');
  block.removeEventListener('click',clicked);
  block.addEventListener('click', clicked,{once : true});
}
function start(){
    Turn=false;
    extraOption[0].parentElement.classList.remove('hide');
    gamePanel.classList.remove('hide');
    gamePanel.classList.remove('x');
    gamePanel.classList.add('o');
    [...blocks].forEach(block =>{
      reCreate(block)      
    })
    // bigners method
    // for(var i=0 ;i<blocks.length ;i++){
    //     blocks[i].classList.remove('x');
    //     blocks[i].classList.remove('o');
    //     blocks[i].removeEventListener('click',clicked);
    //     blocks[i].addEventListener('click', clicked,{once : true});
    // }
    result.parentElement.classList.add('hide');
}
function clicked(e) {
  movesDone.push(e.target);
  // fill the block
    const classOfTurn =Turn ? 'x': 'o';
    e.target.classList.add(classOfTurn);
    // check the winning condition
    if(checkWin(classOfTurn)){
      result.innerText= `${Turn ? 'X': 'O'} Wins!`; 
      result.parentElement.classList.remove('hide');
    };
    // check for draw
    if(draw()){
        result.innerText= 'Draw'; 
      result.parentElement.classList.remove('hide');
    }
    // change the turm
    changeTurn();
    // add the class to gamepanel
    gamePanel.classList.add('x');
    gamePanel.classList.add('o');
    gamePanel.classList.remove(classOfTurn);
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return blocks[index].classList.contains(currentClass)
      })
    })
}
function changeTurn() {
    Turn = !Turn;
}
// [...blocks] to convert into array of blocks
function draw(){
    return [...blocks].every(block => {
        return block.classList.contains('x') || block.classList.contains('o')}
    )
}
// my method
// function draw(){
//     const filterblock=[...blocks].filter(block => block.classList.contains('x') || block.classList.contains('o'))
//     return filterblock.length ===[...blocks].length; 
// }