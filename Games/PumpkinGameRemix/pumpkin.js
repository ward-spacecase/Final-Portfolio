// JavaScript Document



var pumpkinpatch = "";
var numpumpkins;
var gametitle = "Pumpkin Game";
numpumpkins = 0;

document.getElementById("title").innerHTML = gametitle;

function init() {
	for(var i = 0; i < 50; i++) {
		setTimeout( function () {
		addPumpkin(event); }, 100*i);
	}
}
function addPumpkin(event) {
	var randomPumpkin = Math.floor((Math.random() * 4) + 1);
	var xAdjust;
	xAdjust = 300;
	var yAdjust = 8;
	var x = Math.random() * 800;
    var y = Math.random() * 600;
	pumpkinpatch += "<div class='pumpkin" + randomPumpkin + "' style='left: " + x + "px; top:" + y + "px;' onClick='removePumpkin(this)'></div>";
	document.getElementById("container").innerHTML = pumpkinpatch;
	numpumpkins++;
	document.getElementById("numbertitle").innerHTML = numpumpkins;
}
function removePumpkin(element) {
	element.style.display = 'none';
	numpumpkins--;
	document.getElementById("numbertitle").innerHTML = numpumpkins;
}


var start = new Date;

setInterval(function() {
	$('.timer').text((new Date - start) / 1000 + " Seconds");
}, 1000);




// ignore the code down here, it is Jquery.
