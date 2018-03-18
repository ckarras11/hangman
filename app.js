import { words } from './words';

let index;
let word;
let arr;
let strike;
let correct;

function initializeGame() {
    $('#result').text('');
    $('#answer').text('');
    $('#word').html('');
    $('.letter-btn').removeClass('selected');
    $('#restart').addClass('js-hide-display')

    index = Math.floor(Math.random() * words.length);
    word = words[index];
    arr = word.toLowerCase().split('');
    strike = 0;
    correct = 0;
    console.log(word);

    arr.forEach((letter, index) => {
        $('#word').append(`<li class="letter" id=${index}>_</li>`)
    });

    clearCanvas();

    // Draw gallows
    draw(70, 130, 150, 130);
    draw(110, 10, 110, 130);
    draw(110, 10, 170, 10);
    draw(170, 10, 170, 20);
}

function game() {

    initializeGame();

    //Body
    const head = () => {
        let canvas = document.getElementById('hang')
        let c = canvas.getContext('2d')
        c.beginPath();
        c.arc(170, 30, 10, 0, Math.PI * 2, true)
        c.stroke()
    }
    const torso = () => draw(170, 40, 170, 90)
    const rArm = () => draw(170, 65, 190, 40)
    const lArm = () => draw(170, 65, 150, 40)
    const rLeg = () => draw(170, 90, 190, 110)
    const lLeg = () => draw(170, 90, 150, 110)

    const body = [head, torso, rArm, lArm, rLeg, lLeg]


    $('#letters').on('click', 'li', (e) => {
        let guess = e.currentTarget.id
        if ($(`#${guess}`).hasClass('selected')) {
            console.log('picked already')
        } else {
            $(`#${guess}`).addClass('selected');
            if (arr.includes(guess)) {
                arr.forEach((letter, index) => {
                    if (letter === guess) {
                        $(`li#${index}`).text(guess)
                        correct++
                    }
                })
            } else {
                body[strike]();
                strike++;
            }
        }
        if (correct === arr.length) {
            $('#result').text('You Win!')
            $('#restart').removeClass('js-hide-display')
        }
        if (strike === 6) {
            $('#result').text('You Lose =(')
            $('#answer').text(`The correct answer was ${word}`)
            $('#restart').removeClass('js-hide-display')
        }
    })
    handleRestart();
}

function draw(mx, my, lx, ly) {
    let canvas = document.getElementById('hang')
    let c = canvas.getContext('2d')
    c.beginPath();
    c.moveTo(mx, my);
    c.lineTo(lx, ly);
    c.stroke();
}

function clearCanvas() {
    let canvas = document.getElementById('hang')
    let c = canvas.getContext('2d')
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function handleRestart() {
    $('#restart').on('click', () => {
        initializeGame();
    })
}

function endMsg(msg) {

}
game()
