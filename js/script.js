
function makeResult(e) {
	let answers = [
		document.querySelector("[name = 'q1']:checked").value,
		document.querySelector("[name = 'q2']:checked").value,
		document.querySelector("[name = 'q3']:checked").value,
		getCheckboxValues('q4'),
		getCheckboxValues('q5'),
		getCheckboxValues('q6'),
		document.querySelector("[name = 'q7']:checked").value,
		document.querySelector("[name = 'q8']:checked").value,
		document.querySelector("[name = 'q9']:checked").value,
		document.querySelector("[name = 'q10']:checked").value,
		document.querySelector("[name = 'q11']:checked").value,
		getCheckboxValues('q12'),
	]

	const results = [
		isRotateStations(answers),
		isRevertClass(answers),
		isRotateLabs(answers),
		isAutonomousGroup(answers),
		isFlexibleModel(answers)
	];

	let count = 1;
	let resultText = '<p>Вам подходят следующие системы:</p>';
	const initSize = resultText.length;

	results.forEach(element => {
		if (element) {
			let line = `${count}. ${element}`;
			resultText = resultText + `<p>${line}</p>`;
			count++;
		}
	});

	if (resultText.length === initSize) {
		resultText = `
			<p>
				К сожалению, Вам не подходит ни одна из представленных моделей. Так как смешанное обучение 
				представляет собой сочетание очного и онлайн-компонентов, крайне важно обратить внимание на 
				материально-техническое обеспечение образовательного процесса. Так, например, для того, чтобы для 
				Вас стала доступна хотя бы одна из моделей, обязательным условием является один из следующих  факторов:
			</p>
			<ul>
				<li>наличие у обучающихся личных устройств с выходом в Интернет;</li>
				<li>наличие устройств для 1/3 группы (компьютеров, планшетов и др.);</li>
				<li>наличие помещения для зонирования;</li>
				<li>наличие компьютерного класса или зоны с компьютерами для каждого студента.</li>
			</ul>
			<p>
				Кроме того, реализация элемента электронного обучения требует в большинстве случаев от преподавателя 
				среднего или высокого уровня цифровой зрелости.
			</p>
			`;
	}

	let resultPopupText = document.querySelector('.popup__text');
	resultPopupText.innerHTML = `${resultText}`;
	e.open(`#result`);
}

function isFlexibleModel(answers) {
	let res =
		answers[0] === 'a' &&
		(answers[1] === 'c' || answers[1] === 'd') &&
		(answers[2] === 'b' || answers[2] === 'c') &&
		(answers[3].includes('b') || answers[3].includes('c')) &&
		answers[7] === 'a' &&
		answers[10] === 'a';
	return res ? 'Гибкая группа' : null;
}

function isAutonomousGroup(answers) {
	let res =
		answers[1] === 'a' &&
		answers[2] === 'b' &&
		(answers[5].includes('b') || answers[5].includes('c')) &&
		answers[8] === 'a' &&
		(answers[11].includes('b') || answers[11].includes('c'));
	return res ? 'Автономная группа' : null;
}

function isRotateLabs(answers) {
	let res =
		answers[1] === 'a' &&
		(answers[4].includes('a') || answers[4].includes('c') || answers[4].includes('d')) &&
		(answers[5].includes('b') || answers[5].includes('c')) &&
		answers[8] === 'a' &&
		(answers[11].includes('b') || answers[11].includes('c'));
	return res ? 'Ротация лабораторий' : null;
}

function isRevertClass(answers) {
	let res =
		answers[0] === 'a' &&
		(answers[1] === 'b' || answers[1] === 'c' || answers[1] === 'd') &&
		(answers[3].includes('b') || answers[3].includes('c')) &&
		(answers[4].includes('b') || answers[4].includes('c')) &&
		(answers[5].includes('b') || answers[5].includes('c')) &&
		(answers[11].includes('b') || answers[11].includes('c'));
	return res ? 'Перевернутый класс' : null;
}

function isRotateStations(answers) {
	let res = answers[1] === 'a' &&
		(answers[4].includes('a') || answers[4].includes('b') || answers[4].includes('c')) &&
		(answers[5].includes('b') || answers[5].includes('c')) &&
		answers[6] === 'a' &&
		answers[7] === 'a' &&
		answers[9] === 'a';
	return res ? 'Ротация станций' : null;
}

function getCheckboxValues(fieldName) {
	let res = [];
	let allCheckbox = document.querySelectorAll(`input[name = '${fieldName}']:checked`);
	allCheckbox.forEach(element => {
		res.push(element.value);
	});
	return res;
}