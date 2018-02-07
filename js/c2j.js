var events = [];

document.getElementById('file').onchange = function(){

    var file = this.files[0];

    var reader = new FileReader();
	
    reader.onload = function(progressEvent) {
		
		var lines = this.result.split('\n');
		
        //Start from 1 because 0 is the title row
		for(var line = 1; line < lines.length; line++) {
			
			var tabs = lines[line].split('\t');
            
            var event = {};
			
            //11 values
            
            if (tabs.length != 11) {
                console.log("This row doesn't have 11 values. It has " + tabs.length + ". Data invalid.");
                return;
            }
            
            event.name = tabs[0];
            event.title = tabs[1];
            event.content = tabs[2];
            
            var optionsArray = [];
            
            var option1 = {};
            option1.choice = tabs[3];
            
            var odds1 = parseFloat(tabs[4]);
            
            if (odds1 >= 1)   //If the winchance is given as 1 (>= instead of == just in case there's floating point weirdness), then it's not a diceroll event
                option1.diceRoll = false;
            else {
                option1.diceRoll = true;
                option1.winChance = odds1;
            }
            
            if (option1.diceRoll) {
                option1.win = {response: tabs[5]};
                option1.fail = {response: tabs[6]};
            } else {
                option1.response = tabs[5];
            }
            
            optionsArray.push(option1);
            
            var option2 = {};
            option2.choice = tabs[7];
            
            var odds2 = parseFloat(tabs[8]);
            
            if (odds2 >= 1)
                option2.diceRoll = false;
            else {
                option2.diceRoll = true;
                option2.winChance = odds2;
            }
            
            if (option2.diceRoll) {
                option2.win = {response: tabs[9]};
                option2.fail = {response: tabs[10]};
            } else {
                option2.response = tabs[9];
            }
            
            optionsArray.push(option2);
            
            event.options = optionsArray;
            
            //console.log(event);
            events.push(event);
		}
            
        JSONtext = JSON.stringify(events, null, 4);
        console.log(JSONtext);
	};
	
	reader.readAsText(file);
};

(function () {
var textFile = null,
    makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        // returns a URL you can use as a href
        return textFile;
    };
    
    var create = document.getElementById('create');

    create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(JSONtext);
        link.style.display = 'block';
    }, false);
    
})();