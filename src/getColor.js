import parse from 'parse-color';

export default function getColor(query) {
	let out = 'Invalid color';
	let {color = ''} = query;
	let result;

	color = color.replace(/\s|%20/g,'');

	console.log(query);

	const isHex  = /(^#?[0-9A-Fa-f]{6}$)|(^#?[0-9A-Fa-f]{3}$)/i.test(color);
	const isFunc = /^((rgb|hs[lv]|cmyk|lab)a?)\s*/i.exec(color);

	if(isHex){
		color = color.replace(/[#]/i,'');
		result = parse(`#${color}`);
	}else if(isFunc){
		let truster = true;

		let func = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(color);

		let data = func[2].replace(/^\s+|\s+$/g, '').split(/\s*,\s*/);

		let parts = data.map(function (x, i){
				if (/%$/.test(x)) {
					return parseFloat(x) / 100;
				}
				return parseFloat(x);
			});


		if(parts.length !== 3)
			truster = false;

		switch(func[1]) {
			case 'hsl':
				truster = !/%$/.test(data[0]);
				truster = truster && /%$/.test(data[1]);
				truster = truster && /%$/.test(data[2]);

				truster = truster && parts[0] < 255 && parts[0] >= 0;
				truster = truster && parts[1] >= 0 && parts[1] <= 1;
				truster = truster && parts[2] >= 0 && parts[2] <= 1;
				break;
			default:
				parts.forEach(elem => {
					if(elem > 255)
						truster = false;
				});
		}

		if(truster)
			result = parse(color);
	}

	if(result && result.hex !== 'undefined') {
		out = result.hex;
	}

	return out;
}