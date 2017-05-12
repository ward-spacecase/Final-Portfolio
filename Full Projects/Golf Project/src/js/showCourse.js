var course = window.opener.$('body').data("course");
console.log(course);
var players = window.opener.$('body').data('players');
console.log(players);

$(window).load(function() {


    makeTable();

});

function makeTable() {

    tableBody1 = $('#table1-body');
    tableBody2 = $('#table2-body');

    tableBody1.prev().append('<tr class="row-a-par light"><th>Par</th></tr>');
    var parTotA = 0;
    for(var i = 0; i < 9; i++) {
        $('.row-a-par').append('<th>'+ course.course.holes[i].tee_boxes[0].par + '</th>');
        parTotA += course.course.holes[i].tee_boxes[0].par;
    }
    $('.row-a-par').append('<th>' + parTotA + '</th>');



    var parTotB = 0;
    if(course.course.holes.length > 9) {

        tableBody2.prev().append('<tr class="row-b-par light"><th>Par</th></tr>');
        for(var i = 9; i < 18; i++) {
            $('.row-b-par').append('<th>'+ course.course.holes[i].tee_boxes[0].par + '</th>');
            parTotB += course.course.holes[i].tee_boxes[0].par;
        }
        $('.row-b-par').append('<th>' + parTotB + '</th>');
        $('.row-b-par').append('<th>' + (parTotB+parTotA) + '</th>');

    } else {
        tableBody2.hide();
    }


    for(var key in players) {
        if(!String(key).includes('playerCount')) {
            tableBody1.append('<tr class="'+ key + '-row-a player"><th>'+ players[key].name + '</th></tr>');
            tableBody2.append('<tr class="'+ key + '-row-b player"><th>'+ players[key].name + '</th></tr>');

            tableBody1.append('<tr class="'+ key + '-yards-a yardage"><th>'+ players[key].tee_type + '</th></tr>');
            tableBody2.append('<tr class="'+ key + '-yards-b yardage"><th>'+ players[key].tee_type + '</th></tr>');
            $('.yardage').css({'background-color':'#f6eee3', 'max-height': '10px', 'font-size': '12px', 'color': '#aaaaaa'});
            players[key]['hole_scores'] = [];
            var tee_box_num = 0;
            for(var tb = 0; tb < course.course.holes[0].tee_boxes; tb++) {
                if(players[key].tee_type == course.course.holes[i].tee_boxes[tb].tee_type) {
                    tee_box_num = tb;
                }
            }
            for(var i = 0; i < 9; i++) {
                players[key].hole_scores[i] = 0;
                players[key].hole_scores[i+9] = 0;
                $('.' +key+'-row-a').append('<td><input id="' +
                   key + '-hole-' + i + '" type="number" min="1" max="9" maxlength="1" onfocusout="javascript: if(this.value.length == 1) showNewScores(this.id,this.value);" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); else if(this.value==0) this.value=null;"></td>');

                $('.'+key+'-yards-a').append('<td>' + course.course.holes[i].tee_boxes[tee_box_num].yards + '</td>');

                if(course.course.holes.length > 9) {
                    $('.' + key + '-row-b').append('<td><input id="' +
                        key + '-hole-' + (i + 9) + '" type="number" min="1" max="9" maxlength="1" onfocusout="javascript: if(this.value.length == 1) showNewScores(this.id,this.value);"  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength); else if(this.value==0) this.value=null;"></td>');

                    $('.' + key + '-yards-b').append('<td>' + course.course.holes[i + 9].tee_boxes[tee_box_num].yards + '</td>');
                } else {
                    tableBody2.prev().hide();
                }

            }

            $('.'+key+'-yards-a').append('<td></td>');
            $('.'+key+'-yards-b').append('<td></td><td></td>');

            players[key].tots = {};
            players[key].tots.in = 0;
            players[key].tots.out = 0;
            players[key].tots.total = players[key].tots.out + players[key].tots.in;

            $('.' +key+'-row-a').append('<td class="out-' + key + '">' + players[key].tots.out + '</td>');
            $('.' +key+'-row-b').append('<td class="in-' + key + '">' + players[key].tots.in + '</td>');
            $('.' +key+'-row-b').append('<td class="total-' + key + '">' + players[key].tots.total + '</td>');
        }

    }


}

function showNewScores(inputId, inputValue) {

    $('#'+inputId).hide().parent().append('<span>'+ inputValue +'</span>');
    var splitId = inputId.split('-');

    var player = splitId[0];
    var score = parseInt(splitId[2]);
    players[player].hole_scores[score] = parseInt(inputValue);

    for(key in players) {

        if(!String(key).includes('playerCount')) {
            players[key].tots.in = 0;
            players[key].tots.out = 0;
            for(var i = 0; i < 9; i++) {
                players[key].tots.out += players[key].hole_scores[i];
                players[key].tots.in += players[key].hole_scores[i+9];
            }

            players[key].tots.total = players[key].tots.out + players[key].tots.in;
                $('.in-' + key).html(players[key].tots.in);
                $('.out-' + key).html(players[key].tots.out);
                $('.total-' + key).html(players[key].tots.total);



        }
    }
}

