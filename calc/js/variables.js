const calculator = document.querySelector('.calc');
// const calcScreenTopNumber = calculator.querySelector('.calc-screen .screen-top .screen-top-number');
// const calcScreenTopOperation = calculator.querySelector('.calc-screen .screen-top .screen-top-operation');
// const calcScreenSecondNumber = calculator.querySelector('.calc-screen .screen-top .screen-top-secondNumber');
// const calcScreenEqual = calculator.querySelector('.calc-screen .screen-top .screen-top-equal');
const calcScreenBottom = calculator.querySelector('.calc-screen .screen-bottom');
const buttons = document.querySelector('.buttons');
let a = '0';
let b = '';
let sign = '';
let finish  = false;
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
const action = ['-', '+', '*', '/'];


