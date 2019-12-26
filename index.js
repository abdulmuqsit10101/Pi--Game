// variables
var roll_dice_btn = document.getElementById('roll_dice_btn');
var new_game = document.getElementById('new_game');
var hold_btn = document.getElementById('hold_btn');
var dice_elm = document.querySelector('.dice');
var score = [0, 0];
var roundScore = 0;
var activeplayer = 0;
var recent_dice;
var winning_target = 100;

document.getElementById('score_0').textContent = '0';
document.getElementById('score_1').textContent = '0';
document.getElementById('current_0').textContent = '0';
document.getElementById('current_1').textContent = '0';

// Events

roll_dice_btn.addEventListener('click', function () {

    var dice = Math.floor(Math.random() * 6) + 1;


    if (dice === 6 && recent_dice === 6) {
        reset();
    }

    recent_dice = dice;

    // show dice
    dice_elm.id = 'dice_' + dice;

    //show increment in current points
    if (dice !== 1) {
        //Add score
        roundScore += dice;
        dice_elm.style.display = 'block';
        document.querySelector('#current_' + activeplayer).textContent = roundScore;
    } else {
        //Next player
        reset();
    }

    console.log(dice);
});

// Hold Button

hold_btn.addEventListener('click', function () {
    score[activeplayer] += roundScore;
    document.querySelector('#score_' + activeplayer).textContent = score[activeplayer];

    if (score[activeplayer] >= winning_target) {
        document.querySelector('#score_' + activeplayer).textContent = 'Winner!'
        document.getElementById('player_wrapper_' + activeplayer).classList.toggle('winner');
        document.getElementById('player_wrapper_' + activeplayer).classList.toggle('active');

        hold_btn.disabled = true;
        hold_btn.style.cursor = 'not-allowed';
        roll_dice_btn.disabled = true;
        roll_dice_btn.style.cursor = 'not-allowed';


    } else {
        reset();
    }



});

new_game.addEventListener('click', function () {
    location.reload();
});

function reset() {
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
    roundScore = 0;

    document.getElementById('current_0').textContent = '0';
    document.getElementById('current_1').textContent = '0';

    document.getElementById('player_wrapper_0').classList.toggle('active');
    document.getElementById('player_wrapper_1').classList.toggle('active');

    dice_elm.style.display = 'none';
}



function setterWinner() {
    const input  = document.getElementById('winning_point_input');
    if( input.value != '' ){
        winning_target = input.value;
        input.value = '';
        alert('Yeah new winning target has set!')
    }
    else{
        alert('Input Should not be empty!')
    }
}