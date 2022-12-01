buttons.addEventListener('click', keaboardOrScreen);

function calc(key) {

  	if (digit.includes(key)) {
		digitIncludes(key);
		return
  	}

	if (action.includes(key)) {
		actionIncludes(key);
		return;
	}

	if (key === 'ac') {
		pressAc();
		return
	}

	if (key === '+/-') {
		pressPlusMinus(key)
		return
	}

	if (key === '%') {
		pressPercent(key)
		return
	}

	if (key === 'Backspace') {
		pressBackspace(key);
		return
	}
  
	if (key === '=' || 'Enter') {
		pressEquals(key);
		return
	}
}