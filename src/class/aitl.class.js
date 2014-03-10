/*--------------Aitl.class.js-----------------*/
var boutonsListe = { Navigation : [], Action : []};
var nouveauBoutonsListe = { Navigation : [], Action : []};
var fenetresListe = [];
var nouvellesFenetresListe = [];

classes["aitl"] = function (name) { var objet = { 
	 rechercheBoutons : function() {
		boutonsListe = { Navigation : [], Action : []};
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
	boutonsNavigation : boutonsListe["Navigation"],
	boutonsAction : boutonsListe["Action"],
	ajouterBouton : function(bouton, type) {
		nouveauBoutonsListe[type].push(bouton);
		return bouton;
	},
	afficherBoutons : function() {
		var reg = new RegExp("^db_aitl_\\d+$", "i");
		var aitlui = getElementsByRegExpId(reg);
	    	aitlui = aitlui[0];

		var boutons = aitlui.getElementsByClassName("navigation");
		boutons[0].style.overflowX = "hidden";
		boutons = boutons[0].childNodes;
		var dernierBouton = boutons[boutons.length-2];
		var decalageHaut = 59;
		
		for (var i = 0; i < nouveauBoutonsListe["Navigation"].length; i++) {
			var nouveauBouton = document.createElement('div');
				nouveauBouton.className = "menu2";
				nouveauBouton.style.top = decalageHaut + "px";
				
				decalageHaut += 22;
			var nouveauBoutonText = document.createTextNode(nouveauBoutonsListe["Navigation"][i].titre);
			 
			nouveauBouton.appendChild(nouveauBoutonText);
			nouveauBouton.addEventListener('click', nouveauBoutonsListe["Navigation"][i].action, false);
			
			dernierBouton.style.top = (decalageHaut) + "px";
			dernierBouton.parentNode.insertBefore(nouveauBouton, dernierBouton);
		}
	},
	rechercheFenetres : function() {
		fenetresListe = [];
		var reg = new RegExp("^db_aitl_\\d+$", "i");
		var aitlui = getElementsByRegExpId(reg);
	    	aitlui = aitlui[0];

		var fenetres = aitlui.getElementsByClassName("principal");
		fenetres = fenetres[0].childNodes;
		
		for (var i = 0; i < fenetres.length; i++) {     
			if (fenetres[i].nodeType === 1) {
				fenetresListe.push(new fenetre(fenetres[i].className, fenetres[i].innerHTML));
			}
		}
	},
	fenetres : fenetresListe,
	ajouterFenetre : function(fenetre) {
		nouvellesFenetresListe.push(fenetre);
		return fenetre;
	},
	afficherFenetres : function() {
		var reg = new RegExp("^db_aitl_\\d+$", "i");
		var aitlui = getElementsByRegExpId(reg);
	    	aitlui = aitlui[0];

		var fenetres = aitlui.getElementsByClassName("principal");
		fenetres = fenetres[0].childNodes;
		var derniereFenetre = fenetres[fenetres.length-2];
		
		for (var i = 0; i < nouvellesFenetresListe.length; i++) {     
			var nouvelleFenetre = document.createElement('div');
				nouvelleFenetre.className = nouvellesFenetresListe[i].titre.replace(/\s/g, "_");
				nouvelleFenetre.style.display = "none";

			var nouveauTitre = document.createElement('div');
				nouveauTitre.className = "titre";
				nouveauTitre.innerText = nouvellesFenetresListe[i].titre;

			var nouveauTexte = document.createElement('div');
				nouveauTexte.className = "texte";
				nouveauTexte.style.marginTop = "5px";
				nouveauTexte.style.height = "222px";
				nouveauTexte.innerHTML = nouvellesFenetresListe[i].contenu;
				
			nouvelleFenetre.appendChild(nouveauTitre);
			nouvelleFenetre.appendChild(nouveauTexte);
			
			derniereFenetre.parentNode.insertBefore(nouvelleFenetre, derniereFenetre);
		}
	}
}; 

return heritage(classes["activable"](name), objet);};

item("aitl").ouverture(item("aitl").afficherBoutons);
item("aitl").ouverture(item("aitl").rechercheBoutons);
item("aitl").ouverture(item("aitl").rechercheFenetres);
item("aitl").ouverture(item("aitl").afficherFenetres);
