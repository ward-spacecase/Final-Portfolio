$(window).load(function() {

    geoFindMe();

        $( '#myModal' ).modal('show');
        $('.modal-body').html('<i class="fa fa-spinner fa-pulse fa-4x"></i>');

});

var coursesGlobal;
var globalCourse;
var locationGlobal;
function geoFindMe() {
    var output = $('.modal-body');

    if (!navigator.geolocation){
        output.html("<p>Geolocation is not supported by your browser</p>");
        return;
    }

    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
            try {
                golfHttp(latitude, longitude);
            } catch(error) {

            }
                output.html();
//open weather map .org api
    }

    function error() {
        output.html("Unable to retrieve your location. You have failed me. Please allow location services and refresh the page.");
        $('.modal-content').css('background-color', 'red');

    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function golfHttp(lat, long) {


    var location = new google.maps.LatLng(lat,long);
    locationGlobal = location;

    var formData = {latitude: lat, longitude: long, radius: 100};

    $.post("https://golf-courses-api.herokuapp.com/courses/", formData, function (data) {

        data = JSON.parse(data);


            $('.modal-body').html('<select name="courses" id="courses-select"></select>');
            coursesGlobal = data;

        for(var courses = 0; courses < data.courses.length; courses++) {
            $('#courses-select').append('<option value="' + courses + '">'+ data.courses[courses].name + '</option>');
        }


            $('#choose').removeClass('disabled btn-default', 1000, 'swing');
            $('#choose').addClass('btn-success');

        $('#choose').click(function () {nextSlide(data.courses[$('#courses-select option:selected').val()],
            location)});

    });

}
function nextSlide(course,locationForSearch) {

    globalCourse = course;
    $( '.modal-body' ).html('<h1>' + course.name +
        '</h1><hr class="style18"><h2>' + course.city + ', ' + course.state_or_province +
        '</h2><h3>' + course.addr_1 + '</h3>');
    $('.modal-body').append('<div class="placeholder" style="height: 500px"></div>');

    weatherAPI();

    var request = {
        location: locationForSearch,
        radius: '50000',
        name: course.name,
        rankby: 'distance'
    };

    var service = new google.maps.places.PlacesService($('.hold').get(0));
    service.nearbySearch(request, callback);

    var photoURL;
    var place;

    function callback(results, status) {
        $('.placeholder').remove();
        if (status == google.maps.places.PlacesServiceStatus.OK) {


            place = results[0];
                if(place.photos.length > 0) {
                    photoURL = place.photos[0].getUrl({'maxWidth': 400});
                    $('.modal-body').append('<img src="' + photoURL + '" width="90%">');
                } else {
                    console.log('sorry, No photos here');
                }
        } else {
            console.log('Couldnt call places api');
        }

    }
    $('.modal-title').html('Is this the course you want?');
    $('.modal-footer').html('<button class="btn btn-danger" onclick="goBack()">Go Back</button><button id="yes" class="btn btn-success" onclick="yesClick()">Yes</button>');

}

function goBack() {

    $('.modal-title').html('Choose Course: ');
    $('.modal-footer').html('<button id="choose" type="button" class="btn btn-success">Next</button>');
    $('#choose').click(function () {nextSlide(coursesGlobal.courses[$('#courses-select option:selected').val()],
        locationGlobal)});
    $('.modal-body').html('<select name="courses" id="courses-select"></select>');
    for(var courses = 0; courses < coursesGlobal.courses.length; courses++) {
        $('#courses-select').append('<option value="' + courses + '">'+ coursesGlobal.courses[courses].name + '</option>');
    }
}
function startCourse() {
    for(var i = 1; i <= Object.keys(playerCount).length; i++) {
        if(playerCount['player' +i] != null && playerCount['player' +i] != undefined)
            playerCount['player' + i].tee_type = $('#tee-type-select'+i+' option:selected').text();
    }
    var limit = 1;
    for(var key in playerCount) {
        playerCount[key].tee_type = $('#tee-type-select'+limit+' option:selected').text();
        limit++;
    }
    playerCount.playerCount = Object.keys(playerCount).length;
    console.log(playerCount);
    $('body').data("players", playerCount);

    window.open('showCourse.html');
}
function yesClick() {
    $('.modal-title').html('Add Players ');
    $( '.modal-body' ).html('<h1>' + globalCourse.name +
        '</h1><hr class="style18">');
    $.ajax({
        url: 'https://golf-courses-api.herokuapp.com/courses/' + globalCourse.id,
        type: 'GET',
        success: function (results) {

            results = JSON.parse(results);
            globalCourse = results;
            $('#yes')[0].innerText = 'Done';
            $('#yes').attr('onclick', 'startCourse()');
            $("body").data( "course", results);     //send response to new page


            if(Object.keys(playerCount).length == 0 || playerCount == null) {
                newPlayer();
                $('.modal-body').append('<div id="add-player" class="player" onclick="newPlayer()">Add Player <i class="fa fa-plus-circle"></i></div>');
            } else {
                for(var i = 1; i <= Object.keys(playerCount).length; i++){
                    playerCount['player'+ i].addPlayer(globalCourse);
                }
                if(Object.keys(playerCount).length > 3) {
                    $('#add-player').hide();
                } else {
                    $('#add-player').appendTo('.modal-body');
                }
            }


        }
    });
}
var playerCount = {};
function newPlayer() {
    var playerId = 1;
    while(playerCount['player'+playerId] != null || playerCount['player'+playerId] != undefined) {
        playerId++;
    }
     var player = new Player(playerId);
    player.addPlayer(globalCourse);

    if(Object.keys(playerCount).length > 3) {
        $('#add-player').hide();
    } else {
        $('#add-player').appendTo('.modal-body');
    }
    playerCount['player' + player.playerNumber] = player;

}

function weatherAPI() {
    $.ajax({
        crossDomain: true,
       type: 'GET',
        url: 'https://api.wunderground.com/api/5a97c242b3faac59/forecast/q/' + locationGlobal.lat() + ',' + locationGlobal.lng() + '.json',
        success: function (data) {

            $( '.modal-body h1' ).append('<img src="' + data.forecast.simpleforecast.forecastday[0].icon_url + '">');
        }
    });
}


