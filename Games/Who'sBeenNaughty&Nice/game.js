

var peopleToSort = [];
var currentPerson;
score = 0;

function promptNewPerson () {
   currentPerson = peopleToSort[Math.floor(Math.random()*peopleToSort.length)];
    currentPerson.sendName();
}


function Person (name, message, naughty) {
    this.name = name;
    this.message = message;
    this.naughty = naughty;

    this.sendName = function () {
        $('.output-p').html(this.name + ' ' + this.message);

    };
}



function init() {
    peopleToSort.push(new Person('Annie', ' played pranks on all her teachers at school.', true));
    peopleToSort.push(new Person('Bobbie', ' served his country in the military.', false));
    peopleToSort.push(new Person('John', ' attacked Golden Gate Bridge...3 times.', true));
    peopleToSort.push(new Person('Dylan', ' hung out with the elderly folks at the elderly home every day.', false));
    peopleToSort.push(new Person('Joe the Elf', ' groomed all of Santas reindeer every weekend.', false));
    peopleToSort.push(new Person('Thor', ' saved the universe multiple times.', false));
    peopleToSort.push(new Person('Your Mom', ' fed you dinner.', false));
    peopleToSort.push(new Person('Helga', ' judged people by their looks.', true));
    peopleToSort.push(new Person('Xiao', ' sold medicine for 5x the price.', true));
    peopleToSort.push(new Person('Pacman', ' ate friendly ghosts.', true));

    promptNewPerson();
}

function naughty() {
    if(currentPerson.naughty) {
        $('.output-p').html('Good job, ' + currentPerson.name + ' was naughty!');
        score++;
        $('#score').html(score);
    } else {
        $('.output-p').html('Not quite...' + currentPerson.name + ' deserves a present!');
    }
    setTimeout(function(){promptNewPerson();}, 3000);
}

function nice() {
    if(currentPerson.naughty) {
        $('.output-p').html('Nope, ' + currentPerson.name + ' gets coal!');

    } else {
        $('.output-p').html('Awesome! ' + currentPerson.name + ' gets an amazing present!');
        score++;
        $('#score').html(score);

    }
    setTimeout(function(){promptNewPerson();}, 3000);
}
