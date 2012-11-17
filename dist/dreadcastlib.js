/*! DreadCastLib - v0 - 2012-11-17
* http://www.dreadcast.me/
* Copyright (c) 2012 Nobody; Licensed WTF Public License */

/*--------------Init.js-----------------*/

/*---------------------------------------*/
function heritage(object1, object2) { 
        var output = object1;

        for (var key in object2) { 
		output[key] = object2[key];
	}

        return output;

}

/*--------------Activable.class.js-----------------*/
var activable = function () { var objet = {

	estOuvert: "false"













}; return heritage(activable, objet); };

/*--------------Item.class.js-----------------*/
var item = function (name) { var objet = { 

    type: name







}; return heritage(window[name], objet);};

/*--------------Aitl.class.js-----------------*/
var aitl = function () { var objet = { 

	type: name









}; return heritage(activable, objet);};
