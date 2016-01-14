
//array to store card images

var cards = [ "2_of_clubs.png", "2_of_hearts.png", "2_of_diamonds.png", "2_of_spades.png", "3_of_clubs.png", "3_of_hearts.png", "3_of_diamonds.png", "3_of_spades.png", "4_of_clubs.png", "4_of_hearts.png", "4_of_diamonds.png", "4_of_spades.png", "5_of_clubs.png", "5_of_hearts.png", "5_of_diamonds.png", "5_of_spades.png", "6_of_clubs.png", "6_of_hearts.png", "6_of_diamonds.png", "6_of_spades.png", "7_of_clubs.png", "7_of_hearts.png", "7_of_diamonds.png", "7_of_spades.png", "8_of_clubs.png", "8_of_hearts.png", "8_of_diamonds.png", "8_of_spades.png", "9_of_clubs.png", "9_of_hearts.png", "9_of_diamonds.png", "9_of_spades.png", "10_of_clubs.png", "10_of_hearts.png", "10_of_diamonds.png", "10_of_spades.png", "jack_of_clubs.png", "jack_of_hearts.png", "jack_of_diamonds.png", "jack_of_spades.png", "queen_of_clubs.png", "queen_of_hearts.png", "queen_of_diamonds.png", "queen_of_spades.png", "king_of_clubs.png", "king_of_hearts.png", "king_of_diamonds.png", "king_of_spades.png", "ace_of_clubs.png", "ace_of_hearts.png", "ace_of_diamonds.png", "ace_of_spades.png"
]


//global variables

var rand1;
var rand2;
var card1;
var card2;
var user_card;
var rand_user;
var cash = 100;
var betVal;
var maxBet;
var num1;
var num2;
var numUser;
var newVal;


//function to choose and display 2 random cards

function outputCards(){  
	rand1 = Math.floor((Math.random() * 52));
	rand2 = Math.floor((Math.random() * 52));
	$('#cardUser').attr("src", "#");	
	if(rand1 == rand2){
		rand2 = Math.floor((Math.random() * 52));	
	} else {
		card1 = cards[rand1];
		card2 = cards[rand2];
		$('#cardOne').attr("src", "imgs/" + card1);
		$('#cardOne').css('display', 'block');
		$('#cardTwo').attr("src", "imgs/" + card2);
		$('#cardTwo').css('display', 'block');
	}
}


//function to choose and display a user card

function userCard(){
	rand_user = Math.floor((Math.random() * 52));
	if(rand_user == rand1 || rand_user == rand2){
		rand_user = Math.floor((Math.random() * 52));
	} else {
		user_card = cards[rand_user];
		$('#cardUser').attr("src", "imgs/" + user_card);
		$('#cardUser').css('display', 'block');
	}
}


//function to handle betting functionality

function bet(){
	betVal = $('#input').val();
	betVal = parseInt(betVal);

	maxBet = cash / 2;
	if(betVal > maxBet){
		alert("You need to enter a number no greater than " + maxBet + " try again.");
		
	} else {
		calculate();		// calling function which displays the user card and calculates it's relation to the other cards
		winLose();     	// calling function which adds or subtracts your $
	} 
}


// function that changes face cards to a # val

function outcome(number){
	
	if(number == "j"){
		return 11;
	} else if (number == "q") {
		return 12;
	} else if (number == "k") {
		return 13;
	} else if (number == "a") {
		return 14;
	} else if(number == 1){
		return 10;
	} else {
		return number;
	}

	if (number == "j") {
		return 11;
	} else if (number == "q") {
		return 12;
	} else if (number == "k") {
		return 13;
	} else if (number == "a") {
		return 14;
	} else if(number == 1){
		return 10;
	} else{
		return number;
	}

	 if (number == "j") {
		return 11;
	}   else if (number == "q") {
		return 12;
	}   else if (number == "k") {
		return 13;
	}   else if (number == "a") {
		return 14;
	}   else if(number == 1){
		return 10;
	} else {
		return number;
	}
}


// function that displays user card 

function calculate(){
	userCard();
	num1 = outcome(card1.slice(0,1));
	num2 = outcome(card2.slice(0,1));
	numUser = outcome(user_card.slice(0,1));
}



// function that determines win or loss and adds/ subtracts $

function winLose(){
	
	if(numUser > num1 && numUser < num2){
		cash = eval("cash + betVal");
		$('#money').text(cash);
	} else if(numUser < num1 && numUser > num2){
		cash = eval("cash + betVal");
		$('#money').text(cash);
	} else if (numUser == num1 || numUser == num2){
		cash = eval("cash - (betVal * 2)");
		$('#money').text(cash);
	} else if(numUser > num1 && numUser > num2){
		cash = eval("cash - betVal");
		$('#money').text(cash);
	} else if(numUser < num1 && numUser < num2){
		cash = eval("cash - betVal");
		$('#money').text(cash);
	} else {
		return;
	}
}


// function which calcualtes if you run out of $

function gameOver(){
	if(cash <= 0){
		alert("Oh no! You ran out of $!")
		$('img').css('display', 'none');
		cash = 100;
	}
}


// function which hides card img if there isn't one set yet

function display(){
	var imgVal1 = $('img').attr('src');
	if(imgVal1 == '#'){
		$('img').css('display', 'none');
	} else {
		$('img').css('display', 'block');
	}
}

$(document).ready(function(){

	display();
	$('#money').text(cash);

	$('#rules_button').click(function(){
		$('#rules').css('display', 'block');
	});

	$('#less').click(function(){
		$('#rules').css('display', 'none');
	});

	$('#deal').click(function(){
		outputCards();
		return;
	});	
		$('form').submit(function(event){
			event.preventDefault();
			
			bet();
			gameOver();
			
			return;
		});
});
