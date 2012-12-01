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

