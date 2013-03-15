/*--------------Deck.class.js-----------------*/
classes["deck"] = function (name) { var objet = { 

	type1 : "deck retro",
	type2 : "deck orion"



}; return heritage(classes["activable"](name), objet);};

//TODO : faire la distinction entre Orion, Retro et autre.
