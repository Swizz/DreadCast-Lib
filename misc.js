/*---------------------------------------*/
function heritage(object1, object2) { 
        var output = object1;

        for (var key in object2) { 
		output[key] = object2[key];
	}

        return output;

}
