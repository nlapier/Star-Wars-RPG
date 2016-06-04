/*
1.
*/ 




$(document).ready(function dagobah (){

	// Character object constructor
	function Character(firstName, lastName, health, attack, counter){
		this.firstName = firstName;
		this.lastName = lastName
		this.health = health;
		this.attack = attack;
		this.counter = counter;
		this.source = "Assets/images/" + this.firstName + ".jpg";
		this.selected = false;
		this.attackMod = function(){
			this.attack += attack;
		}
		this.healthMod = function(enemyAttack){
			this.health -= enemyAttack
		}
	}

	//Creates an alert box
	function alertBox(message){
		$("#infoDiv").append(
			"<div class = 'alert alert-warning alert-info' role='alert' id=alertBox>" +
			"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
			"<span aria-hidden='true'>&times;</span></button><p>" +
				message +
			"</p></div>"
		)
		disappear("#alertBox");
	}

	//Makes alert box/image disappear after 5 seconds
	function disappear(id){
		window.setTimeout(function(){
	    	$(id).fadeTo(500, 0).slideUp(500, function(){
	        	$(this).remove();
	    	});
		},5000)
	}

	//Returns random integer between 0 and max-1.
	function getRandomInt(max) {
	    return Math.floor(Math.random() * max)
	}

	//Creates a div for each character (char), and places it in a target div (div).  
	//"char" argument must be the name of a Character object
	function makeChar(div, char){
		$(div).append(
			"<div class='col-xs-4 col-md-2'>" +
				"<div class='thumbnail' id='" + char.firstName + "'>" + 
					"<a href='#'>" +
						"<h3 class='text-center'>" + char.firstName + char.lastName + "</h3>" +
						"<img src='" + char.source + "' alt='" + char.firstName + char.lastName + "' class='img-thumbnail'>" +
						"<p class='text-center'>" + char.health + "</p>" +
					"</a>" +
	    		"</div>" +
			"</div>"
		)
	}

	//Selects a random opponent and moves him/her to the main plaing area.
	function villain(){
		var charIndex = getRandomInt(charArray.length);
		var vil = "#" + charArray[charIndex].firstName;
		$(vil).appendTo("#enemyDiv");
		combatArray.push(charArray.splice(charIndex, 1)[0]);
		console.log("villainVar: " + villainVar);
	}

	//Moves the user-selected character, and an opponent (via the villain function), to the main playing area.
	function hero(){
		$(".thumbnail").on("click", function(){
			$(this).appendTo("#playerDiv");
			//combatArray = charArray.splice(, 1);
			console.log("heroVar: " + heroVar);
			villain();
		})
	}

	//Character objects
	var han = new Character("Han", " Solo", 100, 5, 10);
	var rey = new Character("Rey", "", 100, 5, 10);
	var boba = new Character("Boba", " Fett", 100, 7, 8);

	//An array to hold all available characters
	var charArray = [han, rey, boba];

	//Another array to hold the current combatants, and variables to more easily refer to them
	var combatArray = [];
	var heroVar = combatArray[0];
	var villainVar = combatArray[1];
	
		
	//Begin--------------------------------------------------------------------

	//Populates the charactersRow div with character divs.
	var i = 0;
	while(i < charArray.length){
		makeChar("#charactersRow", charArray[i]);
		i++;
	}

	// for (var i = 0; i < charArray.length; i++) {
	// 	makeChar("#charactersRow",charArray[i])
	// }

	alertBox("Select a character");

	hero();

	console.log("charArray: " + charArray);

	$("#fightButton").on("click", function(){

	})


	
})





