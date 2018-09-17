// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

  // close icon in modal
 let closeicon = document.querySelector(".close");

 let result = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15';

 // declare modal
 let modal = document.getElementById("popup1");
 const restart = document.querySelector("#restart");
 
// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, 
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// Loyd task
function lloyd(array) {
    let countLoyd = 0;
    for (i = 0; i < array.length; i++) {
        if (array[i] != '') {
            for (n = i + 1; n < array.length + 1; n++) {
                if (array[i] > array[n]) {
                    countLoyd++
                }
            }
        }
    }
    for (i = 0; i < array.length; i++) {
        (array[i] === '') ? i:'';
        let k = i;
        ( (0 <= k <= 3) || (8 <= k <= 11 )) ? countLoyd++ : '';
    }    
    
    console.log(countLoyd);
    return countLoyd;
}
// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();

for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', moveEl);
}

// @description function to start a new play 
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // check Loyd task
    let arr = [];
    for (i = 0; i < cards.length; i++) {        
        arr.push(cards[i].innerText)
    }
    let str = arr.join(',');
    
    let check = lloyd(arr);
    
    (check % 2 === 1) ? startGame() : '';

    // making playfield
    for (let i = 0; i < cards.length; i++){
        cards[i].onmouseenter = function(e) {
            e.target.classList.add('animated');
            e.target.classList.add('pulse');
        }
        cards[i].onmouseleave = function(e) {
            e.target.classList.remove('animated');
            e.target.classList.remove('pulse');
        }
        

        deck.appendChild(cards[i]);
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
}    
  
//moving handle
function moveEl(e) {
    
    let target = e.target;
    
    if (((target.nextElementSibling != null) && (e.target != cards[3]) && (e.target != cards[7]) && (e.target != cards[11])) && (target.nextElementSibling.innerText === '') ) {
        console.log('next');
        console.log (e.target == cards[12])
        let temp = target.innerText;
        target.nextElementSibling.innerText = temp;
        target.innerText = '';
    } else if (((target.previousElementSibling != null) && (e.target != cards[12]) && (e.target != cards[8]) && (e.target != cards[4])) && (target.previousElementSibling.innerText === '')) {
        console.log('prev');
        let temp = target.innerText;
        target.previousElementSibling.innerText = temp;
        target.innerText = '';
    } 

    try{
        if ((target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling != null) && (target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText === '')) {
        let temp = target.innerText;
        target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = temp;
        target.innerText = '';
        }
    } catch(e) {
        console.log(e);
    } finally {
        if ((target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling != null) && (target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText === '')) {
        let temp = target.innerText;
        target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText = temp;
        target.innerText = '';
        }
    }
    moves++;
    counter.innerHTML = moves;
    compare();
}

function compare() {
    let arr = [];
    for (i = 0; i < cards.length - 1; i++) {
        
        arr.push(cards[i].innerText)
    }
    let str = arr.join(',');
    if (str == result) {
        console.log('HURRA');
        congratulations();
    }
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
        // show congratulations modal
        modal.classList.add("show");
        closeicon.addEventListener("click", function(e){
            modal.classList.remove("show");
        });
}

function playAgain() {
    startGame();
    modal.classList.remove("show");
}
