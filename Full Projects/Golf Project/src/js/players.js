
var Player = function(playerNumber) {
    
  this.playerNumber = playerNumber;
    this.name = 'player';

};

Player.prototype.editName = function () {
    $('#player-name' + this.playerNumber).hide();
    $('#input-' + this.playerNumber).show().val(this.name).focus().select().prev().show();
    $('#input-'+ this.playerNumber).attr('onfocusout', 'onFocusOut(' + this.playerNumber + ')');
};

Player.prototype.editNameOut = function () {
  var newName = $('#input-'+ this.playerNumber).val();
    this.name = newName;
    $('#input-'+this.playerNumber).hide().next().html(this.name).show().prev().prev().hide();
};

Player.prototype.removePlayer = function () {
    delete playerCount['player' + this.playerNumber];
    $('#player' + this.playerNumber).remove();
    $('#add-player').appendTo('.modalBody').show();
};

Player.prototype.addPlayer = function (results) {


    $('.modal-body').append('<div class="player" id="player'+ this.playerNumber + '"></div>');

    $('#player' + this.playerNumber ).append('<i class="fa fa-check-square" aria-hidden="true"></i><input type="text" id="input-' + this.playerNumber +
        '"><span id="player-name' + this.playerNumber + '">Player' + this.playerNumber +
        '</span> <select name="courses" id="tee-type-select' +
        this.playerNumber + '"></select><i onclick="removePlayer(' + this.playerNumber + ')' +
            '" class="fa fa-times" aria-hidden="true" style="margin-left: 10px;"></i>');



    $('#player-name' + this.playerNumber).attr(     'onclick', 'editPlayer('+ this.playerNumber + ')'     );
    $('#input-'+this.playerNumber).hide().prev().hide();


    this.name = $('#player-name' + this.playerNumber).html();

    for(var i = 0; i < results.course.holes[0].tee_boxes.length; i++) {
        if(results.course.holes[0].tee_boxes[i].tee_type != 'auto change location')
            $('#tee-type-select' + this.playerNumber).append('<option value="' + i + '">'+ results.course.holes[0].tee_boxes[i].tee_type + '</option>');
    }
};


function removePlayer(playerNum) {
    playerCount['player' + playerNum].removePlayer();
}

function editPlayer(playerNum) {
    playerCount['player' + playerNum].editName();
}
function onFocusOut(playerNum) {
    playerCount['player' + playerNum].editNameOut();
}