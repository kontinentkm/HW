const isWordInEveryArrayString = (array, word) => {
	if (array.length === 0) {
		return false;
	} else
	return array.every(element => element.includes(word));

};

console.log(isWordInEveryArrayString([], 'apple'));

