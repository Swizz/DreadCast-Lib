/*! DreadCastLib - v0.0.1 - 2014-03-10
 * http://www.dreadcast.me/
 *
 * Copyright (c) 2014 Quentin Gerodel (aka Swizz540 | Gideon) <quentin.g[at]laposte[dot]net>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * Thanks to nobody, noone 
 */

var VRAI = true; 
var FAUX = false;

var classes = {};
var dernierRang = 0;

function heritage(object1, object2) { 
        var output = clonage(object1);

        for (var key in object2) { 
		output[key] = object2[key];
	}

        return output;

}

/*-------------Faire un clonage-------------------*/
function clonage(object1)
{
	if(typeof(object1) != 'object' || object1 == null)
	{
		return object1;
	}
	
	var newObject = object1.constructor();
	for(var i in object1)
	{
		newObject[i] = clonage(object1[i]);
	}
	
	return newObject;
}

/*------------Element ID via RegExp-----------------*/
function getElementsByRegExpId(p_regexp, p_element, p_tagName) {
	p_element = p_element === undefined ? document : p_element;
	p_tagName = p_tagName === undefined ? '*' : p_tagName;
	var v_return = [];
	var v_inc = 0;
	for(var v_i = 0, v_il = p_element.getElementsByTagName(p_tagName).length; v_i < v_il; v_i++) {
		if(p_element.getElementsByTagName(p_tagName).item(v_i).id && p_element.getElementsByTagName(p_tagName).item(v_i).id.match(p_regexp)) {
			v_return[v_inc] = p_element.getElementsByTagName(p_tagName).item(v_i);
			v_inc++;
		}
	}
	return v_return;
}


classes["item"] = function (name) { var objet = { 

    type : name
    
    
    
    
    

}; return heritage(classes[name](name), objet);};

var item = classes["item"];

var Execute = { null : null };

classes["activable"] = function (name) { var objet = {

	estOuvert: function() { 
			var reg = new RegExp("^db_"+name+"_\\d+$", "i");
			return (getElementsByRegExpId(reg).length != 0) ? true : false;
		},

	ouverture: function(callback) {
			var rang = dernierRang + 1;
			dernierRang = rang;
			Execute[name+"-"+rang] = false;
			Execute[name+"_"+rang] = function() {
				if (item(name).estOuvert() && !Execute[name+"-"+rang]){
					callback();
					Execute[name+"-"+rang] = true;
				}
				else if (!item(name).estOuvert() && Execute[name+"-"+rang]) {
					Execute[name+"-"+rang] = false;
				}
			}
			
			Execute[name+":"+rang] = setInterval(Execute[name+"_"+rang], 500);

			return rang;
		},
		
	fermeture: function(callback) { 
			var rang = dernierRang +1;
			dernierRang = rang;
			Execute[name+"-"+rang] = false;
			Execute[name+"_"+rang] = function() {
				if (item(name).estOuvert() && !Execute[name+"-"+rang]){
					Execute[name+"-"+rang] = true;
				}
				else if (!item(name).estOuvert() && Execute[name+"-"+rang]) {
					callback();
					Execute[name+"-"+rang] = false;
				}
			}
			
			Execute[name+":"+rang] = setInterval(Execute[name+"_"+rang], 500);
			return rang;
		},
	retirer: function(rang) {
			clearTimeout(Execute[name+":"+rang]);
		}


}; 

objet.estOuvert.toString = function() { return objet.estOuvert(); };

return objet;};

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

classes["bouton"] = function (titre, action) { var objet = { 

	titre : titre,
	action : action,
	executer : function() { action()}



}; return objet; };

var bouton = classes["bouton"];


classes["convertisseur pti"] = function (name) { var objet = { 

	//nothing here



}; return heritage(classes["activable"](name), objet);};


classes["deck"] = function (name) { var objet = { 

	type1 : "deck retro",
	type2 : "deck orion"



}; return heritage(classes["activable"](name), objet);};

//TODO : faire la distinction entre Orion, Retro et autre.

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


classes["none"] = function (name) { var objet = { 

	//nothing here



}; return objet; };


classes["terminal portable"] = function (name) { var objet = { 

	//nothing here



}; return heritage(classes["activable"](name), objet);};

