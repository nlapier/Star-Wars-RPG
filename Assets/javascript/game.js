	// Character object constructor
	function Character(firstName, lastName, health, baseAttack, counterAttack){
		this.firstName = firstName;
		this.lastName = lastName
		this.health = health;
		this.baseAttack = baseAttack;
		this.counterAttack = counterAttack;
		this.name = firstName + " " + lastName
		this.source = "Assets/images/" + this.firstName + ".jpg";
		this.currentAttack = baseAttack;
		this.attackMod = function(){
			this.currentAttack += baseAttack;
		}
	};

	//Character objects.
	var han = new Character("Han", "Solo", 100, 5, 10);
	var rey = new Character("Rey", "", 100, 5, 10);
	var boba = new Character("Boba", "Fett", 100, 7, 8);

	//An array to hold all available characters.
	// var charArray = [han, rey, boba];

	//A meta-object to hold the character objects
	var charObj = {
		Han: han,
		Rey: rey,
		Boba: boba
	}

	//Variables to track the current user character and enemy character.
	var lightSide;
	var darkSide;
	var counter = Object.keys(charObj).length-1;



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
	};

	//Makes alert box/image disappear after 5 seconds
	function disappear(id){
		window.setTimeout(function(){
	    	$(id).fadeTo(500, 0).slideUp(500, function(){
	        	$(this).remove();
	    	});
		},5000)
	};

	//Creates a div for each character ("char"), and places it in a container div ("div").  
	//"char" argument must be a Character object

	function makeChar(targetDiv, wrapperDiv, char, emptyFirst){
		if (emptyFirst){$(targetDiv).empty()};
		$(targetDiv).append(
			wrapperDiv +
				"<div class='thumbnail' id='" + char.firstName + "'>" + 
					"<a href='#'>" +
						"<h3 class='text-center'>" + char.name + "</h3>" +
						"<img src='" + char.source + "' alt='" + char.name + "' class='img-thumbnail'>" +
						"<p class='text-center' id ='" + char + "health'>" + char.health + "</p>" +
					"</a>" +
	    		"</div>" +
			"</div>"
		)
	};

		//Moves the selected character DIV to the appropriate part of the screen, and reorganized the underlying character objects.
	function moveChar(){
		$(".thumbnail").on("click", function(){
			var parent = $(this).parent();
			var selectedChar = $(this).attr("id");
			//Moves the enemy character to the appropriate DIV, and adds the corresponding object to combatObj;
			if (lightSide && darkSide == undefined){
				$(this).appendTo("#darkSideDiv");
				darkSide = charObj[selectedChar];
				$(parent).remove();
			}
			//Moves the user's character to the appropriate DIV, and adds the corresponding object to combatObj;
			if (lightSide == undefined){
				$(this).appendTo("#lightSideDiv");
				lightSide = charObj[selectedChar];
				$(parent).remove();
				return alertBox("Select an enemy to fight.")
			}
			
		});
	}

	function fight (){
		$("#fightButton").on("click", function(){
			darkSide.health -= lightSide.currentAttack;
			lightSide.attackMod();
			lightSide.health -= darkSide.counterAttack;
			makeChar("#lightSideDiv", "<div>", lightSide, true)
			makeChar("#darkSideDiv", "<div>", darkSide, true)

			// $("#darkSideDiv").attr("<p>", darkSide.health);
			if (darkSide.health <= 0) {
				counter--;
				if (counter === 0) {
					return alertBox("The force is strong with you - you win!");
				}
	
				else {
					darkSide = undefined;
					$("#darkSideDiv").empty();
					return alertBox("You are victorious! Select another character to fight.");
				}
			}
	
			if(lightSide.health <=0){
				return alertBox("You are not a Jedi yet - GAME OVER.");
				//Change button to "play again"
			}
		});
	}

		// function makeChar(div, char){
	// 	$(div).append(
	// 		"<div class='col-xs-4 col-md-2'>" +
	// 			"<div class='thumbnail' id='" + char.firstName + "'>" + 
	// 				"<a href='#'>" +
	// 					"<h3 class='text-center'>" + char.name + "</h3>" +
	// 					"<img src='" + char.source + "' alt='" + char.name + "' class='img-thumbnail'>" +
	// 					"<p class='text-center' id ='" + char + "health'>" + char.health + "</p>" +
	// 				"</a>" +
	//     		"</div>" +
	// 		"</div>"
	// 	)
	// };

	// function getId(element, attribute){
	// 	return $(element).attr(attribute);
	// };

	// function makeChar(div, char){
	// 	$(div).append(
	// 		"<div class='thumbnail' id='" + char.firstName + "'>" + 
	// 			"<a href='#'>" +
	// 				"<h3 class='text-center'>" + char.firstName + char.lastName + "</h3>" +
	// 				"<img src='" + char.source + "' alt='" + char.firstName + char.lastName + "' class='img-thumbnail'>" +
	// 				"<p class='text-center'>" + char.health + "</p>" +
	// 			"</a>" +
 //    		"</div>"
	// 	)
	// }

	//Selects a random opponent and moves him/her to the main plaing area.
	// function villain(){
	// 	var charIndex = getRandomInt(charArray.length);
	// 	var vil = "#" + charArray[charIndex].firstName;
	// 	$(vil).appendTo("#enemyDiv");
	// 	//$(/*wrapping Div*/).remove();//Deletes the div holding the character's thumbnail.
	// 	combatArray.push(charArray.splice(charIndex, 1)[0]);
	// 	console.log("villainVar: " + villainVar);
	// };

	// //Moves the user-selected character, and an opponent (via the villain function), to the main playing area.
	// function hero(){
	// 	$(".thumbnail").on("click", function(){
	// 		$(this).appendTo("#playerDiv");
	// 		//$(/*wrapping Div*/).remove();//Deletes the div holding the character's thumbnail.
	// 		$("#fightButton").append("<button type='button' class='btn btn-danger btn-block'>Fight!</button>");
	// 		//combatArray = charArray.splice(, 1);
	// 		console.log("heroVar: " + heroVar);
	// 		villain();
	// 	})
	// 	return;
	// };

	// //Moves the selected character DIV to the appropriate part of the screen, and reorganized the underlying character objects.
	// function moveChar(){
	// 	$(".thumbnail").on("click", function(){
	// 		var parent = $(this).parent();
	// 		var selectedChar = $(this).attr("id");
	// 		//Idles the moveChar function if the user's character and opponent are already selected.
	// 		if (combatants < 2){
	// 			//Moves the enemy character to the appropriate DIV, and adds the corresponding object to combatObj;
	// 			if (combatants = 1){
	// 				$(this).appendTo("#darkSideDiv");
	// 				darkSide = charObj[selectedChar];
	// 			}
	// 			//Moves the user's character to the appropriate DIV, and adds the corresponding object to combatObj;
	// 			else if (combatants = 0){
	// 				$(this).appendTo("#lightSideDiv");
	// 				lightSide = charObj[selectedChar];
	// 			}
	// 			//In either scenario, this removes the character thumbail's enclosing div
	// 			$(parent).remove();
	// 		}	
	// 	});
	// }




	//Another array to hold the current combatants, and variables to more easily refer to them.
	

	// var combatArray = [];
	// var heroVar = combatArray[0];
	// var villainVar = combatArray[1];
	
		
//Begin--------------------------------------------------------------------

	//Populates the charactersRow div with character divs.
	// var i = 0;
	// while(i < charArray.length){
	// 	makeChar("#charactersRow", charArray[i]);
	// 	i++;
	// }

	for (var i in charObj){
		makeChar("#charactersRow", "<div class='col-xs-4 col-md-2'>", charObj[i]);
	};

	alertBox("Select a character");

	moveChar();

	$("#fightButton").append("<button type='button' class='btn btn-danger btn-block'>Fight!</button>");

	fight();
	








