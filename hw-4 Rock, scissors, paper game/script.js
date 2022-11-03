let 	playerName,
		playerChoice,
		computerChoice,
		userScore = 0,
		computerScore = 0;


function askName() {
	playerName = prompt('Please, enter your name');
	if (!playerName) playerName = 'User';
	return playerName;
}

function playerStep() {
	playerChoice = prompt('Rock, Scissors, Paper... Please make your move').toLowerCase();
	if (playerChoice === null) {
		return alert('You aborted this game. To start new game just refresh the page.');
	} else {
		while (playerChoice !== 'rock' && playerChoice !== 'scissors' && playerChoice !== 'paper') {
			playerChoice = prompt('Rock, Scissors, Paper... Please make your move').toLowerCase();
		}
		return playerChoice;
	}
}

function computerStep() {
	const arrayChoice = ['rock', 'scissors', 'paper'];
	computerChoice = arrayChoice[Math.floor(Math.random() * 3)];
	alert (`Computer move is: ${computerChoice}`);
	return computerChoice;
}

function playAgain() {
	const playAgain = confirm('Do you want to start new game?');
	if (!playAgain) {
		return;
	} else {
		userScore = 0;
		computerScore = 0;
		choiceCompare();
	}
}

function choiceCompare() {

	if (userScore === 3) {
		alert(`Congratulations. You won this game. Count - You: ${userScore} : Computer ${computerScore}`);
		return playAgain();
	} else if (computerScore === 3) {
		alert(`Sorry. You lost this game. Count - You: ${userScore} : Computer ${computerScore}`);
		return playAgain();
	}

	playerStep();
	computerStep();	

	if (playerChoice === computerChoice) {
		alert('Draw');
		choiceCompare();
	} else if (playerChoice === 'rock') {
		if (computerChoice === 'scissors') {
			userScore = userScore + 1;
			alert (`You won this round: Current count is ${playerName}: ${userScore}: Computer ${computerScore}`);
			choiceCompare();
		} else {
			computerScore = computerScore + 1;
			alert (`Computer won this round: Current count is ${playerName}: ${userScore}: Computer ${computerScore}`);
			choiceCompare();
		}
	} else if (playerChoice === 'scissors') {
		if (computerChoice === 'paper') {
			alert (`You won this round: Current count is ${playerName}: <userscore>: Computer <computerScore>`);
			choiceCompare();
		} else {
			alert (`Computer won this round: Current count is ${playerName}: <userscore>: Computer <computerScore>`);
			choiceCompare();
		}
	} else if (playerChoice === 'paper') {
		if (computerChoice === 'rock') {
			alert (`You won this round: Current count is ${playerName}: <userscore>: Computer <computerScore>`);
			choiceCompare();
		} else {
			alert (`Computer won this round: Current count is ${playerName}: <userscore>: Computer <computerScore>`);
			choiceCompare();
		}
	}
}

askName();
choiceCompare();

