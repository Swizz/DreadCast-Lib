/*--------------Aitl.class.js-----------------*/
var boutons = { };
boutons["Navigation"] = new Array();
boutons["Action"] = new Array();

// recherche des boutons déjà implementé
function rechercheBoutons() {
	var reg = new RegExp("^db_"+name+"_\\d+$", "i");
	var aitl = getElementsByRegExpId(reg);
	    aitl = aitl[0];

	var boutons = aitl.getElementsByClassName("navigation");
	boutons = boutons[0].childNodes;
	for (var i = 0; i < boutons.length; i++) {     
	         if (boutons[i].nodeType === 1) {
			boutons["Navigation"].push(boutons[i]);
		 }
	}


	boutons = aitl.getElementsByClassName("actions");
	boutons = boutons[0].childNodes;
	for (var i = 0; i < boutons.length; i++) {
	         if (boutons[i].nodeType === 1) {
		        boutons["Action"].push(boutons[i]);
		}
	}

}

item("aitl").ouverture(rechercheBoutons);

classes["aitl"] = function (name) { var objet = { 

	couleur : "blanc",
	boutonsNavigation : boutons["Navigation"],
	boutonsAction : boutons["Action"],
	ajouterBouton : function(bouton, type) {
				

			}



}; 

return heritage(classes["activable"](name), objet);};
