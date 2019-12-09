//https://github.com/emptyport/fasta-js/blob/master/index.js
function parseFasta(input_string, delimiter, definition) {
	var sequences = [];
	var lines = input_string.split('\n');
	var currentEntry = {};
	var sequence = '';
	var header_names = [];
	
	if(delimiter === '') {
      header_names = ['id'];
    } else {
      header_names = definition.split(delimiter);
    }

	for (var i = 0; i < lines.length; i++) {
		if (lines[i].startsWith('>')) {
			currentEntry['sequence'] = sequence;
			sequences.push(currentEntry);
			currentEntry = createEntry(lines[i], delimiter, definition, header_names);
			sequence = '';
		} else {
			sequence += lines[i];
		}
	}
	currentEntry['sequence'] = sequence;
	sequences.push(currentEntry);
	sequences.shift();

	return sequences;
}

function createEntry(line, delimiter, definition, header_names) {
	var entry = {};
	var values = [];
	if (delimiter === '') {
		values = [line];
	} else {
		values = line.slice(1).split(delimiter);
	}
	for (var i = 0; i < values.length; i++) {
		entry[header_names[i]] = values[i];
	}
	return entry;
}