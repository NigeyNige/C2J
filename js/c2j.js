document.getElementById('file').onchange = function(){

    var file = this.files[0];

    var reader = new FileReader();
	
    reader.onload = function(progressEvent) {
		
		console.log(this.result);
		
		var lines = this.result.split('\n');
		
		for(var line = 0; line < lines.length; line++) {
			
			var tabs = lines[line].split('\t');
			
			for(var tab = 0; tab < tabs.length; tab++) {
				console.log(tabs[tab]);
			}
		}
	};
	
	reader.readAsText(file);
};