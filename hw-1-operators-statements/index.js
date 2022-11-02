/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// function should return two numbers
const sum = (a, b) => {
  return a + b;
};

/**
 * @param {number} num
 * @return {boolean}
 */
// function should return if number is even
const isNumberEven = (num) => {
  if (num % 2 === 0) {
	return true;
	} else {
		return false;
	}
};

/**
 * @param {number} num1
 * @param {number} num2
 * @return {string}
 */
// Write logic to compare two numbers and return which number is greater or they are equal
const findLargestNumber = (num1, num2) => {
  if (num1 > num2) {
	return `${num1} is the largest number`;
  } else if (num1 < num2) {
	return `${num2} is the largest number`;
  } else if (num1 = num2) {
	return `${num1} is equal to ${num2}`;
  }
};

/**
 * @param {number} side1
 * @param {number} side2
 * @param {number} side3
 * @return {string}
 */
// function should return type of triangle
const findTriangleType = (side1, side2, side3) => {
  if (side1 !== side2 && side1 !== side3) {
	return "Scalene triangle";
  } else if (side1 === side2 && side1 === side3) {
	return "Equilateral triangle";
  } else if (side1 === side2 || side1 === side3 || side2 === side3) {
	return "Isosceles triangle";
  }

};

/**
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
//function should return amount of days in month
const findDaysInMonth = (month, year) => {
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
	return 'The Month has 31 days';
  } else if (month <= 0 || month > 12) {
	return `Invalid Month of value ${month}`;
  } else if (month === 2 && year % 4 === 0) {
	return 'The Month has 29 days';
  } else if (month === 2 && year % 4 !== 0) {
	return 'The Month has 28 days';
  } else {
	return 'The Month has 30 days';
  }
}

/**
 * @param {number} num1
 * @param {number} num2
 * @param {string} operation
 * @return {number | string}
 */
const calculateResult = (num1, num2, operation) => {
  switch(operation) {
	case 'add':
		return num1 + num2;
  	case 'subtract':
		return num1 - num2;
	case 'multiply':
		return num1*num2;
	case 'divide':
		return num1/num2;
  	case 'modulus':
		return Math.floor(num1/num2);
	case 'someunknownoperation':
		return `${operation} is an invalid operation`;
  }
}

/**
 * @return {string}
 */
// Create multiply table multiplying all digits from 2 t0 9 on 1 - 10 and write result in string
const getMultiplicationTable = () => {
	let table = '';
	for (i = 2; i <= 9; i++) {
		let str1 = `==== ${i} ====` + ' \n';

		table += str1;
		for (j = 1; j <= 10; j++) {
			let res = i * j;
			let str2 = `${i} * ${j} = ${res}` + ' \n';
			table += str2;
		}
		
	}
	return table;
};

module.exports = {
  isNumberEven,
  findLargestNumber,
  findTriangleType,
  findDaysInMonth,
  sum,
  calculateResult,
  getMultiplicationTable,
};
