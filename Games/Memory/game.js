/**
 * Created by andrew_Ward on 9/29/16.
 */

// JavaScript Document

var cardsflipped = 0;
var cardonetype = 0;
var cardtwotype = 0;
var flippedone;
var flippedtwo;
var score = 0;

console.log(Number("56 38"));
function turnCard(itemid, cardtext, connection){
    "use strict";
    var mycard = document.getElementById(itemid);
    mycard.style.background = "none";
    mycard.style.backgroundColor = "#FFFFFF";
    mycard.firstChild.innerHTML = cardtext;
    cardsflipped++;
    //alert("card is flipped" + cardsflipped);

    /*  setTimeout(function(){ stuff here }, miliSeconds);   */

    setTimeout(function(){
        if(cardsflipped <= 1){
            cardonetype = connection;
            flippedone = itemid;
        }
        if(cardsflipped >= 2){
            cardtwotype = connection;
            flippedtwo = itemid;
            if(cardonetype === cardtwotype){                    //match

                alert("it's a match!");
                document.getElementById(flippedone).style.display = "none";
                document.getElementById(flippedtwo).style.display = "none";
                cardsflipped = 0;
                score++;
                document.getElementById("myscore").innerHTML = score * 5;
            }
            else{                       //not match
                alert('not a match!');
                cardonetype = 0;
                cardtwotype = 0;
                document.getElementById(flippedone).firstChild.innerHTML = "";
                document.getElementById(flippedtwo).firstChild.innerHTML = "";
                document.getElementById(flippedone).style.background = "none";
                document.getElementById(flippedtwo).style.background = "none";
                document.getElementById(flippedone).style.backgroundImage = "url('images/card.png')";
                document.getElementById(flippedtwo).style.backgroundImage = "url('images/card.png')";
                cardsflipped = 0;
            }
    }
    }, 200);

}
