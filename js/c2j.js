function parseTSV(data) {
	
	var x = data.split('\n');
	
	for (var i = 0; i < x.length; i++) {
		y = x[i].split('\t');
		x[i] = y;
	}
	
}