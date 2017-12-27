'use strict'
function sortlist(input){
	input.sort(function(a,b) {
		if (a < b){ return -1;}
		if (a > b){ return 1;}
		return 0;// Remove this line and change to your own algorithm
	});
	return input;
}

module.exports = sortlist
