// файл script.js

// Ожидаем полной загрузки страницы перед выполнением скрипта
window.onload = function () {
	// Переменные для хранения данных:
	let a = '' // Первый операнд (число до операции)
	let b = '' // Второй операнд (число после операции)
	let expressionResult = '' // Результат вычисления
	let selectedOperation = null // Выбранная операция (+, -, x, /)

	// элемент экрана калькулятора
	outputElement = document.getElementById('result') // окно вывода результата
	// Получаем все кнопки с цифрами (по атрибуту id)
	digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]') // список объектов кнопок циферблата (id которых начинается с btn_digit_)

	// Функция обработки нажатия цифровых кнопок
	function onDigitButtonClicked(digit) {
		// Если операция еще не выбрана (работаем с первым числом)
		if (!selectedOperation) {
			// Проверка на точку: разрешаем только одну точку в числе
			if (digit != '.' || (digit == '.' && !a.includes(digit))) {
				a += digit // Добавляем цифру точку к первому числу
			}
			outputElement.innerHTML = a // Обновляем экран
		}
		// Если операция выбрана (работаем со вторым числом)
		else {
			// Аналогичная проверка для второго числа
			if (digit != '.' || (digit == '.' && !b.includes(digit))) {
				b += digit // Добавляем цифру/точку к второму числу
				outputElement.innerHTML = b // Обновляем экран
			}
		}
	}

	// Назначаем обработчики для всех цифровых кнопок
	digitButtons.forEach(button => {
		button.onclick = function () {
			const digitValue = button.innerHTML // Получаем цифру с кнопки
			onDigitButtonClicked(digitValue) // Передаем в обработчик
		}
	})

	// Обработчики для кнопок операций:
	// Умножение:
	document.getElementById('btn_op_mult').onclick = function () {
		if (a === '') return // Нельзя выбрать операцию без первого числа
		selectedOperation = 'x' // Сохраняем выбранную операцию
	}
	// Сложение
	document.getElementById('btn_op_plus').onclick = function () {
		if (a === '') return // Нельзя выбрать операцию без первого числа
		selectedOperation = '+' // Сохраняем выбранную операцию
	}
	// Вычитание
	document.getElementById('btn_op_minus').onclick = function () {
		if (a === '') return // Нельзя выбрать операцию без первого числа
		selectedOperation = '-' // Сохраняем выбранную операцию
	}
	// Деление
	document.getElementById('btn_op_div').onclick = function () {
		if (a === '') return // Нельзя выбрать операцию без первого числа
		selectedOperation = '/' // Сохраняем выбранную операцию
	}

	// кнопка очищения
	document.getElementById('btn_op_clear').onclick = function () {
		a = '' // Сброс первого числа
		b = '' // Сброс второго числа
		selectedOperation = '' // Сброс операции
		expressionResult = '' // Сброс результата
		outputElement.innerHTML = 0 // Отображаем "0" на экране
	}

	// кнопка расчёта результата
	document.getElementById('btn_op_equal').onclick = function () {
		// Проверка: если не введены оба числа (a и b) или не выбрана операция → выход
		if (a === '' || b === '' || !selectedOperation) return

		// Выполняем операцию в зависимости от selectedOperation
		switch (selectedOperation) {
			case 'x':
				expressionResult = +a * +b
				break
			case '+':
				expressionResult = +a + +b
				break
			case '-':
				expressionResult = +a - +b
				break
			case '/':
				expressionResult = +a / +b
				break
		}

		a = expressionResult.toString() // Сохраняем результат
		b = '' // Сбрасываем второе число
		selectedOperation = null // Сбрасываем операцию
		outputElement.innerHTML = a // Выводим результат
	}

	// Кнопка Backspace
	document.getElementById('btn_op_backspace').onclick = function () {
		if (selectedOperation) {
			b = b.slice(0, -1) // Удаляем последний символ из второго числа
			outputElement.innerHTML = b || '0' // Если строка пустая, показываем "0"
		} else {
			a = a.slice(0, -1) // Удаляем последний символ из первого числа
			outputElement.innerHTML = a || '0' // Если строка пустая, показываем "0"
		}
	}

	// Кнопка процента
	document.getElementById('btn_op_percent').onclick = function () {
		if (a === '') return // Если число не введено, ничего не делаем

		if (selectedOperation) {
			// Если операция выбрана (+, -, x, /), вычисляем процент от ПЕРВОГО числа (a)
			// Пример: 200 + 10% → 200 + (10% от 200) = 220
			const percentValue = (parseFloat(a) * parseFloat(b)) / 100
			b = percentValue.toString() // Заменяем второе число на вычисленный процент
			outputElement.innerHTML = b // Показываем результат
		} else {
			// Если операция не выбрана, вычисляем процент от текущего числа
			// Пример: 50 → 50% = 0.5
			a = (parseFloat(a) / 100).toString()
			outputElement.innerHTML = a // Показываем результат
		}
	}

	// Обработчик кнопки "НОД"
	document.getElementById('btn_op_gcd').onclick = function () {
		if (a === '' || b === '') return // Проверка на наличие данных

		// Вычисляем НОД с помощью алгоритма Евклида
		const gcdValue = gcd(+a, +b)
		outputElement.innerHTML = gcdValue // Выводим результат

		// Меняем цвет кнопки "="
		const equalBtn = document.getElementById('btn_op_equal')
		const baseColor = 0xbbab89 // Базовый цвет в DEC (12298761)

		// Ограничиваем gcdVal до 0xFFFFFF - baseColor (чтобы избежать переполнения)
		const maxAllowed = 0xffffff - baseColor
		const safeGcdVal = Math.min(gcdValue, maxAllowed)

		// Вычисляем новый цвет и форматируем в HEX
		const newColorDecimal = baseColor + safeGcdVal
		const newColorHex =
			'#' + newColorDecimal.toString(16).padStart(6, '0').toUpperCase()

		// Применяем цвет
		equalBtn.style.backgroundColor = newColorHex

		// Возвращаем исходный цвет через 6 секунды
		setTimeout(() => {
			equalBtn.style.background = '#bbab89' // Возврат к изначальному цвету
		}, 6000)

		// Сброс переменных
		a = gcdValue.toString()
		b = ''
		selectedOperation = null
	}

	// Функция вычисления НОД
	function gcd(x, y) {
		// Проверка, если оба числа равны нулю
		if (x === 0 && y === 0) {
			// Математически НОД(0, 0) не определен, возвращаем 0 как условное значение
			return 0
		}
		// Базовый случай: если y равен 0, возвращаем абсолютное значение x
		if (y === 0) {
			return Math.abs(x) // НОД всегда неотрицателен
		}
		// Рекурсивный шаг: вызываем функцию с новыми аргументами (y, x % y)
		return gcd(y, x % y)
	}
}
