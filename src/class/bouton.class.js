/*--------------Bouton.class.js-----------------*/
classes["bouton"] = function (titre, action) { var objet = { 

	titre : titre,
	action : action,
	executer : function() { action()}



}; return objet; };

var bouton = classes["bouton"];

