/*--------------Aitl.class.js-----------------*/
var boutonsListe = { Navigation : [], Action : []};

classes["aitl"] = function (name) { var objet = { 
	 rechercheBoutons : function() {
		var reg = new RegExp("^db_aitl_\\d+$", "i");
		var aitlui = getElementsByRegExpId(reg);
	    	aitlui = aitlui[0];

		var boutons = aitlui.getElementsByClassName("navigation");
		boutons = boutons[0].childNodes;
		for (var i = 0; i < boutons.length; i++) {     
	        	 if ((boutons[i].className == "menu1") || (boutons[i].className == "menu2") || (boutons[i].className == "menu3")) {
		
			boutonsListe["Navigation"].push(new bouton(boutons[i].innerText, boutons[i].onclick));
			}
		}


		boutons = aitlui.getElementsByClassName("actions");
		boutons = boutons[0].childNodes;
		for (var i = 0; i < boutons.length; i++) {
	        	 if ((boutons[i].className == "menu1") || (boutons[i].className == "menu2") || (boutons[i].className == "menu3")) {
			boutonsListe["Action"].push(new bouton(boutons[i].innerText, boutons[i].onclick));
				}
			}

		},

	couleur : "blanc",
	boutonsNavigation : boutonsListe["Navigation"],
	boutonsAction : boutonsListe["Action"],
	ajouterBouton : function(bouton, type) {
				boutonsListe[type].push(bouton);
			}


}; 

return heritage(classes["activable"](name), objet);};


item("aitl").ouverture(item("aitl").rechercheBoutons);

