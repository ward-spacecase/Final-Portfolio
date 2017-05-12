
function Number () {
    this.number = Math.round(Math.random() * (999-100) + 100);
    this.getNumber = function () {return this.number};

}

var menuHTML = $('.game').html();
var number;


function newGame () {
    $('.game').slideToggle(function() {

    $('.game').html('<h3>Guess the Code</h3><h1>***</h1>' +
        '<input id="guess-in" type="number"><br><button onclick="guess()" ' +
        'id="guess">GUESS</button><div id="guessed"></div>');
    $('.game').slideToggle();
    });

     number = new Number();
}

function guess() {
    var guess = $('#guess-in').val();

    console.log(guess + ' compared to ' + number.getNumber());

    if(guess.length == 3) {
        $('#guess-in').val(null);

        if(guess == number.getNumber()) {           //win
            $('.game').html('<h1>YOU CRACKED THE CODE!!!!</h1>' +
                '<iframe width="560" height="315" src="hack.mp4"></iframe>');
        } else if(guess > number.getNumber()) {     //lower than guess
            $('#guessed').append('<span style="color: yellow"><i class="fa fa-arrow-down" aria-hidden="true"></i>' +
                guess +'</span>');
        } else {                                    //higher than guess
            $('#guessed').append('<span style="color: darkred"><i class="fa fa-arrow-up" aria-hidden="true"></i>' +
                guess + '</span>');
        }
    } else {
        alert('please input a 3 digit number!');
    }
}