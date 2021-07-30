const gamePanelConatiner = document.querySelector('.gamepanel-container');
class gamePanelClass{
  constructor(no,WINNING_COMBINATIONS){
    this.WINNING_COMBINATIONS = WINNING_COMBINATIONS;
    this.no = no;
    this.blocks ;
    this.gamePanel ;
    this.result ;
    this.extraOption ;
    this.gamePanelConatiner = document.querySelector('.gamepanel-container');
    this.extraOption = document.querySelectorAll('.gamepanel-extra-options button');
    this.extraOption[0].addEventListener('click',()=>{
      this.restartall();
    });
    this.extraOption[1].addEventListener('click',()=>{
      this.undo();
    });
    this.extraOption[2].addEventListener('click',()=>{
      this.backToMenu();
    });
    this.restart = document.querySelector('.result button');
    this.restart.addEventListener('click',()=>{
      this.restartall();
    });
    this.movesDone = [];
    this.restartCalled = false;
    this.Turn;
    this.start();
  }
  backToMenu(){
    location.reload();
  }
  createBlocks(){
    const divApp = document.createElement('div');
    divApp.classList.add('gamepanel');
    divApp.classList.add('noOfColumns'+this.no); 
   for(let i=0;i<this.no*this.no;i++){
     const div = this.createBlock();
     divApp.appendChild(div);
    };
    return divApp;
  }
  createBlock(){
   const div = document.createElement('div');
   div.classList.add('block');
   return div;
  }
  start(){
    this.gamePanelConatiner.classList.remove('hide');
    this.gamePanelConatiner.appendChild(this.createBlocks());
    console.log('start is called');
    this.movesDone = [];
    this.blocks = document.getElementsByClassName('block');
    this.gamePanel = document.querySelector('.gamepanel');
    this.result = document.querySelector('.result div');
    this.Turn=false;
    this.extraOption[0].parentElement.classList.remove('hide');
    this.gamePanel.classList.remove('x');
    this.gamePanel.classList.add('o');
    [...this.blocks].forEach(block =>{
      this.reCreate(block)      
    })
    // bigners method
    // for(var i=0 ;i<blocks.length ;i++){
    //     blocks[i].classList.remove('x');
    //     blocks[i].classList.remove('o');
    //     blocks[i].removeEventListener('click',clicked);
    //     blocks[i].addEventListener('click', clicked,{once : true});
    // }
    this.result.parentElement.classList.add('hide');
}
reCreate(block){
  block.classList.remove('x');
  block.classList.remove('o');
  block.removeEventListener('click',(el)=>{
    this.clicked(el);
  });
  block.addEventListener('click',(el)=>{
    this.clicked(el);
  }
  ,{once : true}); 
}
restartall(){
  this.gamePanel.remove();
  this.start();
}
undo(){
  if(this.movesDone){
    const e = this.movesDone.pop();
    this.reCreate(e);
    const classOfTurn =this.Turn ? 'x': 'o';// add the class to gamepanel
    this.gamePanel.classList.add('x');
    this.gamePanel.classList.add('o');
    this.gamePanel.classList.remove(classOfTurn);
    this.changeTurn();
  }  
}
changeTurn() {
  this.Turn = !this.Turn;
}
clicked(e) {
  console.log("this is "+this + " "+ e);
  this.movesDone.push(e.target);
  console.log('clicked');
  // fill the block
    const classOfTurn =this.Turn ? 'x': 'o';
    e.target.classList.add(classOfTurn);
    console.log(e.target +" turn of "+classOfTurn);
    // check the winning condition
    if(this.checkWin(classOfTurn)){
      this.result.innerText= `${this.Turn ? 'X': 'O'} Wins!`; 
      this.result.parentElement.classList.remove('hide');

    }
    // check for draw
    else if(this.draw()){
        this.result.innerText= 'Draw'; 
      this.result.parentElement.classList.remove('hide');
    }
    // change the turm
    this.changeTurn();
    // add the class to gamepanel
    this.gamePanel.classList.add('x');
    this.gamePanel.classList.add('o');
    this.gamePanel.classList.remove(classOfTurn);
}
checkWin(currentClass) {
  return this.WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return this.blocks[index].classList.contains(currentClass)
    })
  })
}
draw(){
  return [...this.blocks].every(block => {
      return block.classList.contains('x') || block.classList.contains('o')}
  )
} 
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
const WINNING_COMBINATIONS_of_four = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10,11],
  [12, 13, 14,15],
  [0, 4, 8 , 12],
  [1, 5, 9 ,13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12]
]
const WINNING_COMBINATIONS_of_five = [
  [0, 1, 2, 3 ,4],
  [5, 6, 7, 8 ,9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10 ,15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19,24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20]
]
function threeGame() {
    playButton.parentElement.parentElement.parentElement.classList.add('hide');
    const three = new gamePanelClass(3,WINNING_COMBINATIONS);
}
const playButton = document.querySelector('.three button');
playButton.addEventListener('click',threeGame);

function fourGame() {
  playButton.parentElement.parentElement.parentElement.classList.add('hide');
  const four = new gamePanelClass(4,WINNING_COMBINATIONS_of_four);
}
const playButton2 = document.querySelector('.four button');
playButton2.addEventListener('click',fourGame);

function fiveGame() {
  playButton.parentElement.parentElement.parentElement.classList.add('hide');
  const five = new gamePanelClass(5,WINNING_COMBINATIONS_of_five);
}
const playButton3 = document.querySelector('.five button');
playButton3.addEventListener('click',fiveGame);




// [...blocks] to convert into array of blocks

// my method
// function draw(){
//     const filterblock=[...blocks].filter(block => block.classList.contains('x') || block.classList.contains('o'))
//     return filterblock.length ===[...blocks].length; 
// }