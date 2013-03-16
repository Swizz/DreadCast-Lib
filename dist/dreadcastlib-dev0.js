/*! DreadCastLib - v0 - 2013-03-16
* http://www.dreadcast.me/
* Copyright (c) 2013 Quentin Gerodel (aka Swizz540 | Gideon); Licensed GNU Lesser Public License 
 This program is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser Public License as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.

 This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser Public License for more details.

 You should have received a copy of the GNU Lesser Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

* Contributors : nobody, noone */

/*--------------Init.js-----------------*/
var VRAI = true; 
var FAUX = false;

var classes = {};
var dernierRang = 0;

/*-------------Faire un heritage-------------------*/
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


/*--------------Activable.class.js-----------------*/

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

/*--------------Item.class.js-----------------*/
classes["item"] = function (name) { var objet = { 

    type : name
    
    
    
    
    

}; return heritage(classes[name](name), objet);};

var item = classes["item"];

/*--------------Bouton.class.js-----------------*/
classes["bouton"] = function (titre, action) { var objet = { 

	titre : titre,
	action : action,
	executer : function() { action()}



}; return objet; };

var bouton = classes["bouton"];


/*--------------Deck.class.js-----------------*/
classes["deck"] = function (name) { var objet = { 

	type1 : "deck retro",
	type2 : "deck orion"



}; return heritage(classes["activable"](name), objet);};

//TODO : faire la distinction entre Orion, Retro et autre.

/*--------------ConvertisseurPTI.class.js-----------------*/
classes["convertisseur pti"] = function (name) { var objet = { 

	//nothing here



}; return heritage(classes["activable"](name), objet);};


/*--------------TerminalPortable.class.js-----------------*/
classes["terminal portable"] = function (name) { var objet = { 

	//nothing here



}; return heritage(classes["activable"](name), objet);};


/*--------------None.class.js-----------------*/
classes["none"] = function (name) { var objet = { 

	//nothing here



}; return objet; };


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

