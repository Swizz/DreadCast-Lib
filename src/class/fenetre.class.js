/*--------------Fenetre.class.js-----------------*/
classes["fenetre"] = function (titre, contenu) { var objet = { 

	titre : titre,
	contenu : contenu,
	afficher : function() {
		var reg = new RegExp("^db_aitl_\\d+$", "i");
		var aitlui = getElementsByRegExpId(reg);
	    	aitlui = aitlui[0];

		var fenetres = aitlui.getElementsByClassName("principal");
		var fenetrePrincipale = fenetres[0];
		fenetres = fenetres[0].childNodes;
 
		for (var i = 0, c = fenetres.length; i < c; i++) {
			if (fenetres[i].nodeType === 1) { 
				fenetres[i].style.display = "none";
			}	
		}

		var fenetreActuelle = fenetrePrincipale.getElementsByClassName(titre.replace(/\s/g, "_"))
			fenetreActuelle = fenetreActuelle[0]
			fenetreActuelle.style.display = "block";
	},
	recupererDepuisURL : function(url, callback) {
		var me = this;
		var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.send(null);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) { 
					me.contenu = xhr.responseText;
					callback();
				}
			};
		
		return fenetre;
	}

}; return objet; };

var fenetre = classes["fenetre"];

