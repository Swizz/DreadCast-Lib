/*! DreadCastLib - v0 - 2013-03-16
* http://www.dreadcast.me/
* Copyright (c) 2013 Quentin Gerodel (aka Swizz540 | Gideon); Licensed  
 This program is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser Public License as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.

 This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser Public License for more details.

 You should have received a copy of the GNU Lesser Public License along with this program. If not, see <http://www.gnu.org/licenses/>.

* Contributors : nobody, noone */

/*--------------Init.js-----------------*/
var VRAI = true; 
var FAUX = false;

var classes = {};

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
			Execute[name+"-"] = false;
			Execute[name+"_"] = function() {
				if (item(name).estOuvert() && !Execute[name+"-"]){
					callback();
					Execute[name+"-"] = true;
				}
				else if (!item(name).estOuvert() && Execute[name+"-"]) {
					Execute[name+"-"] = false;
				}
			}
			
			setInterval(Execute[name+"_"], 500);
		},
		
	fermeture: function(callback) { 
			Execute["-"+name] = false;
			Execute["_"+name] = function() {
				if (item(name).estOuvert() && !Execute["-"+name]){
					Execute["-"+name] = true;
				}
				else if (!item(name).estOuvert() && Execute["-"+name]) {
					callback();
					Execute["-"+name] = false;
				}
			}
			
			setInterval(Execute["_"+name], 500);
		}


}; 

objet.estOuvert.toString = function() { return objet.estOuvert(); };

return objet;};

/*--------------Item.class.js-----------------*/
classes["item"] = function (name) { var objet = { 

    type : name
    
    
    
    
    

}; return heritage(classes[name](name), objet);};

var item = classes["item"];

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
classes["aitl"] = function (name) { var objet = { 

	couleur : "blanc"



}; return heritage(classes["activable"](name), objet);};
