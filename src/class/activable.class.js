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
					Execute[name+"-"] = true;
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
