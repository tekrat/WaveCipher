/*! WaveCipher v1.1.0 | Ervin Kosch | ervin.kosch@gmail.com | 
  Apache License 2.0 | https://github.com/tekrat/WaveCipher/blob/master/LICENSE */

var WaveCipher = {
	
	"validCharacters":"0123456789ABCDEF"
	, "redHerringCharacters":" .!"
	, "keyLength":4
	, "keyCount":4
	, "fakeKeyCount":100
	, "generate":function(){
		
		var out = {};
		out["validCharacters"] = WaveCipher.validCharacters;
		out["keyLength"] = WaveCipher.keyLength;
		out["keyCount"] = WaveCipher.keyCount;
		out["redHerringCharacters"] = WaveCipher.redHerringCharacters;
		out["fakeKeyCount"] = WaveCipher.fakeKeyCount;		
		out["keySet"] = [];
		
		var gen = [];
		for(var i = 0; i < 256; i++){
			
			var ks = [];
			
			for(var j = 0; j < out["keyCount"]; j++){
			
				var l = WaveCipher.generatePassword();
				if(gen.indexOf(l) == -1){
					ks.push(l);
					gen.push(l);
				}
			
			}
			
			out["keySet"].push(ks);
			
		}

		// Fake sets
		var fs = [];
		
		for(var j = 0; j < out["fakeKeyCount"]; j++){
		
			var l = WaveCipher.generatePassword();
			if(gen.indexOf(l) == -1){
				fs.push(l);
				gen.push(l);
			}
		
		}
		
		out["keySet"].push(fs);
		
		return JSON.stringify(out);
		
	}
	, "encode":function(k, s){
		var cip = JSON.parse(k);
		var o = "";
		
		for(var i = 0; i < s.length; i++){
			
			// Red herring header
			var rnd = Math.floor(Math.random() * 7 );
			if(rnd == 0){
				var f = Math.floor(Math.random() * cip.keySet[256].length);
				o += cip.keySet[256][f];
			}
			
			var row = cip.keySet[s.charCodeAt(i)];
			var rnd = Math.floor(Math.random() * row.length);
			o += row[rnd];
			
			// Red herring footer
			var rnd = Math.floor(Math.random() * 7 );
			if(rnd == 0){
				var f = Math.floor(Math.random() * cip.keySet[256].length);
				o += cip.keySet[256][f];
			}
		}
		
		var nO = "";
		for(var i = 0; i < o.length; i++){
			
			nO += o[i];
			
			// Red herring footer
			var rnd = Math.floor(Math.random() * 7 );
			if(rnd == 0){
				var f = Math.floor(Math.random() * cip.redHerringCharacters.length);
				nO += cip.redHerringCharacters[f];
			}
						
		}
		
		return nO;
	}
	, "decode":function(k, s){
		
		var cip = JSON.parse(k);
		for(var i = 0; i < cip.redHerringCharacters.length; i++){
			s = s.split(cip.redHerringCharacters[i]).join("");
		}
		var o = "";
		
		for(var i = 0; i < s.length / cip.keyLength; i++){
			var id = s.substr(i * cip.keyLength, cip.keyLength);
			for(var k = 0; k < 256; k++){
				if(cip.keySet[k].indexOf(id) > -1){
					o += String.fromCharCode(k);
				}
			}		
		}
		
		return o;
		
	}
	, "generatePassword":function() {
		
		var	retVal = "";
		for (var i = 0, n = WaveCipher.validCharacters.length; i < WaveCipher.keyLength; ++i) {
			retVal += WaveCipher.validCharacters.charAt(Math.floor(Math.random() * n));
		}
		return retVal;
		
	}
}
