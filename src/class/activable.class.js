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
