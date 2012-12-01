/*--------------Activable.class.js-----------------*/
var activable = function (name) { var objet = {

	estOuvert: function() { 
			var reg = new RegExp("^db_"+name+"_\\d+$", "i");
			return (getElementsByRegExpId(reg).length != 0) ? true : false;
		},

	ouverture: function(callback) { 
			/*setInterval(test, 1000);
			
			function test() {
				if (item(name).estOuvert){
					ok();
				}
				else if (!uno){
					uno=true;
				}
			}*/
		}










}; 

objet.estOuvert.toString = function() { return objet.estOuvert(); };

return objet;};
