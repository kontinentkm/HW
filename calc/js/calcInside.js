function digitIncludes(key) {
	if (b ==='' && sign === '') {
		if (a.toString().includes('.') && key === '.') {
			key = '';
		}
		// не дает печатать ноль несколько раз, если только не после точки
		if (+calcScreenBottom.textContent === 0 && !a.toString().includes('.')) {
			a = '';
		}
		// если ничего не нажато и нажать точку, то оставляет ноль перед точкой
		if (+calcScreenBottom.textContent === 0 && key === '.') {
			a = '0';
		}
		a += key;
		calcScreenBottom.textContent = a;
	  }
	  else if (a!=='' && b!=='' && finish) {
		b = key;
		finish = false;
		calcScreenBottom.textContent = b;
	  }
	  else {
		if (b.toString().includes('.') && key === '.') {
		key = '';
		}
		if (+calcScreenBottom.textContent === 0 && !b.toString().includes('.')) {
			b = '';
		}
		// тут еще доп проверка на постановку точки сращу после знака
		if ((+calcScreenBottom.textContent === 0 || action.includes(calcScreenBottom.textContent)) && key === '.') {
			b = '0';
		}
		  b += key;
		  calcScreenBottom.textContent = b;
	  }
}

function actionIncludes(key) {
	sign = key;
	calcScreenBottom.textContent = sign;
}

function pressAc() {
	a = '';
	b = '';
	sign = '';
	finish = false;
	calcScreenBottom.textContent = 0;
}

function pressPlusMinus(key) {
	if (Math.abs(calcScreenBottom.textContent) === Math.abs(b)) {
		b = b * (-1);
		calcScreenBottom.textContent = b;
	} else {
		a = a * (-1);
		calcScreenBottom.textContent = a;
	}
}

function pressPercent(key) {
	if (calcScreenBottom.textContent.toString() === b.toString()) {
		b = b / 100;
		calcScreenBottom.textContent = b;
	} else {
		a = a / 100;
		calcScreenBottom.textContent = a;
	}
}

function pressBackspace(key) {
	if (calcScreenBottom.textContent.toString() === b.toString() || b === 0) {
		if (b !== '' && b !== 0) {
			b = b.toString().slice(0, -1);
		} 
		if (b.length === 0) {
			b = 0;
		}
		calcScreenBottom.textContent = b;
	}
	else {
		if (a !== '' && a !== 0) {
			a = a.toString().slice(0, -1);
		} 
		if (a.length === 0) {
			a = 0;
		}
		calcScreenBottom.textContent = a;
	}
}

function pressEquals(key) {
	if (b ==='') b = a;
	switch (sign) {
		case "+":
			// 10ки убирают ситуацию с операциями через двоичную систему, но похоже не всегда
			a = ((+a)*10 + (+b)*10)/10;
			break;
		case "-":
			a = (a*10 - b*10)/10;
			break;
		case "*":
			a = (a *10) * (b * 10) / 100;
			break;
		case "/":
			a = (a * 10) / (b * 10) / 100;
		if (a === Infinity || NaN) {
			calcScreenBottom.textContent = 'Error';
			a = '';
			b = '';
			sign = '';
			return;
		}
		break;
	}
	finish = true;
	calcScreenBottom.textContent = a;
	console.log(a, b, sign)
}