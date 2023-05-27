let questions = [
	{
		question: "What language does work in browsers?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 3,
	},
	{
		question: "What is CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 1,
	},
	{
		question: "What is HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborghinis",
		],
		correct: 0,
	},
	{
		question: "du lav txayes?",
		answers: ["ha", "che", "shrjapatics harcru", "achot tvox kez chka"],
		correct: 2,
	},
];

let rightAsk = 0;
let questionIndex = 0;
let reply = [];

let questionCont = document.querySelector('.quiz-header');
let answersList = document.querySelector('.quiz-list');
let spendBtn = document.querySelector('.submit');

function clearPage() {
	questionCont.innerHTML = '';
	answersList.innerHTML = '';
}

function showQuestion() {
	questionCont.innerHTML = `<h2 class="title">${questions[questionIndex].question}</h2>`;

	questions[questionIndex].answers.forEach((answer, i) => {
		answersList.innerHTML += `
			<li>
				<label>
					<input value="${i}" type="radio" class="answer" name="answer">
					<span class='answer-cont'>${answer}</span>
				</label>
			</li>
		`;
	});
}

function rightAnswer() {
	let checkRadio = answersList.querySelector('input[type="radio"]:checked');
	if (checkRadio) {
		if (+checkRadio.value === questions[questionIndex].correct) {
			rightAsk++;
		}

		if (questionIndex === questions.length - 1) {
			saveAnswers();
			clearPage();
			conclusion();
			return;
		}

		saveAnswers();
		questionIndex++;
		clearPage();
		showQuestion();
	}
}

function conclusion() {
	let div = document.createElement('div');
	div.className = 'answers-list';

	questionCont.innerHTML = `You answered ${rightAsk} out of ${questions.length} correctly.`;
	reply.forEach((el, i) => {
		div.innerHTML += `
			<div class="answers-cont">
				<span class='reply-answer'>${i + 1}.${el.question}</span>
				<span class="user-answer">${el.userAnswer}</span><br>
				<span class="true-answer">${el.trueAnswer}</span>
			</div>
		`;

		const userAnswerSpan = div.querySelectorAll('.user-answer');
		if (el.userAnswer == el.trueAnswer) {
			userAnswerSpan[i].classList.add('true-answer');
		} else {
			userAnswerSpan[i].classList.add('wrong-answer');
		}
	});

	document.querySelector('.quiz').appendChild(div);
	console.log(reply);
}

function saveAnswers() {
	let checkRadio = answersList.querySelector('input[type="radio"]:checked');

	let cont = {
		question: questions[questionIndex].question,
		userAnswer: document.querySelectorAll('.answer-cont')[+checkRadio.value].innerHTML,
		trueAnswer: questions[questionIndex].answers[questions[questionIndex].correct],
	};
	reply.push(cont);
}

showQuestion();
spendBtn.addEventListener('click', rightAnswer);
