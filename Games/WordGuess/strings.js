var guessingWord;
var guessingNum;
var word;
var score = 0;

var ButtonLetter = function (letter, id) {
    this.letter = letter;
    this.id = id;
    this.make = function () {
        $( '.scrambled' )[0].innerHTML += "<div class='letter' id='letter" + this.id + "' onclick='scrambledClick(this.id, this)'>" + this.letter + "</div>";
    };
};




function initialize() {

    $( '#score' )[0].innerText = score;
    guessingWord = '';
    guessingNum = 0;
    word = getWord();

    do {
        var shuffled = word.split('').sort(function () {
            return 0.5 - Math.random()
        }).join('');
    }while(shuffled == word);

    for(var i = 0; i < shuffled.length; i++) {
        var button = new ButtonLetter(shuffled.charAt(i), i);
        button.make();
    }
    $( '#guessButton' ).hide();

}




function scrambledClick (id, element) {
    if($('#' + id ).parents('.scrambled').length != 0 ) {
        console.log(guessingNum);
        $('#' + id).appendTo('.guessing');
        guessingWord = guessingWord + element.innerText;
        guessingNum++;
        if (guessingNum == word.length) {
            $('#guessButton').show();
        }
    }
}





function guess() {
    console.log(word + " " + guessingWord);
    if(guessingWord == word) {

        score += 10;
        initialize();
        $( '.guessing' ).children('*').hide();

        $( '#console' ).css('background-color', 'green');
        $( '#console' )[0].innerText = 'Correct!';

    } else {
        if(score != 0) {
            score -= 5;
        }

        $( '#score' )[0].innerText = score;
        guessingWord = '';
        guessingNum = 0;
        $( '.guessing' ).children('*').appendTo( '.scrambled' );
        $( '#guessButton' ).hide();
        $( '#console' ).css('background-color', 'red');
        $( '#console' )[0].innerText = 'Try Again!';
    }
$( '.guessing' )[0].innerHTML = '';

}

var getWord = function() {
    var wordArray = ['also', 'bird', 'boat', 'boom', 'acid', 'help', 'host', 'holy', 'gate', 'fort', 'game',
                    'neck','news', 'load', 'zone', 'yard', 'wave', 'vote', 'pure', 'real', 'pool', 'oral', 'salt'];
    return wordArray[Math.floor(Math.random() * wordArray.length)];
}
