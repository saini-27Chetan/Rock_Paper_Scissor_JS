const options = ['rock', 'paper', 'scissor'];

const choices = document.querySelectorAll('.choiceImg');

let userScore = 0;
let computerScore = 0;
const maxScore = 5; // Winning Score
let userChoice;
let computerChoice;

const generateComputerChoice = () => {
    return (options[Math.floor(Math.random() * choices.length)]);
}

const matchCondition = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    else {
        var userWin = true;
        if (userChoice === 'rock') {
            // computer left with paper and scissor
            userWin = computerChoice === 'paper' ? false : true;
        }
        else if (userChoice === 'paper') {
            // computer left with rock and scissor
            userWin = computerChoice === 'scissor' ? false : true;
        }
        else {
            // computer left with paper and rock
            userWin = computerChoice === 'rock' ? false : true;
        }
    }
    return userWin === true ? 'user' : 'computer';
}

let userScoreDisplay = document.getElementById('user-score');
let computerScoreDisplay = document.getElementById('computer-score');
let message = document.getElementById('message');
let defaultMessage = 'Pick your move';

const playGame = (userChoice) => {
    computerChoice = generateComputerChoice();
    // Check in console to check the choices
    console.log(`User: - ${userChoice}`);
    console.log(`Comp: - ${computerChoice}`);

    let win = matchCondition(userChoice, computerChoice);

    if (win !== 'draw') {
        win === 'user' ? userScore++ : computerScore++;
    }else{
        message.innerText='Move Draw';
        setTimeout(()=>{message.innerText=defaultMessage}, 500);
    }

    userScoreDisplay.innerText = userScore;
    computerScoreDisplay.innerText = computerScore;
    console.log(`${userScore} and ${computerScore}`);

    if (userScore === maxScore || computerScore === maxScore) {
        if(userScore===maxScore){
            message.innerText = `You are the Winner!! Resetting the Game`;
            message.style.backgroundColor='green';
        }
        else{
            message.innerText = `Computer is the Winner!! Resetting the Game`;
            message.style.backgroundColor='red';
        }

        setTimeout(resetGame,1500);
    }
};


const generateUserChoice = (choice) => {
    userChoice = choice.getAttribute('id');
    playGame(userChoice);
};

choices.forEach((choice) => {
    choice.addEventListener('click', () => {generateUserChoice(choice)});
});

let resetGame = () => {
    location.reload();
}

let reset = document.getElementById('reset');
reset.addEventListener('click', resetGame)