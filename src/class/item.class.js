/*--------------Item.class.js-----------------*/
classes["item"] = function (name) { var objet = { 

    type : name
    
    
    
    
    

}; return heritage(classes[name](name), objet);};

var item = classes["item"];
