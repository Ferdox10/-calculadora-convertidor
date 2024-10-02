let displayValue = '0';
let previousValue = ''; // Guardar el estado anterior para undo
let history = [];

// API Key
const apiKey = '42002ed6d1f437d95a5243fa20b940a0';

document.addEventListener("DOMContentLoaded", () => {
    loadCurrencyOptions();
});

// Cambia entre la calculadora básica y científica
function toggleMode() {
    const basicMode = document.querySelector('.basic-mode');
    const scientificMode = document.querySelector('.scientific-mode');
    const button = document.querySelector('button.btn-primary');

    if (basicMode.style.display === 'none') {
        basicMode.style.display = 'block';
        scientificMode.style.display = 'none';
        button.innerText = 'Modo Científico 🧑‍🔬';
    } else {
        basicMode.style.display = 'none';
        scientificMode.style.display = 'block';
        button.innerText = 'Modo Básico 🔧';
    }
}

// Captura la entrada manual y evalúa
function evaluateInput(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

// Actualiza la pantalla
function updateDisplay(value) {
    const display = document.getElementById('display');
    display.innerText = value;
}

// Agrega valor al display
function appendToDisplay(value) {
    if (displayValue === '0' && !isNaN(value)) {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay(displayValue);
}

// Calcula el resultado
function calculate() {
    try {
        // Guardar en historial
        history.push(displayValue);
        const result = eval(displayValue);
        updateDisplay(result);
        displayValue = result.toString(); // Convertir a string para la siguiente operación
    } catch (error) {
        alert('Error en la operación');
    }
}

// Limpia la pantalla
function clearDisplay() {
    displayValue = '0';
    updateDisplay(displayValue);
}

// Deshacer la última operación
function undo() {
    if (history.length > 0) {
        displayValue = history.pop();
        updateDisplay(displayValue);
    } else {
        clearDisplay();
    }
}

// Borra el último carácter
function deleteLast() {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay(displayValue);
}

// Carga las opciones de divisas
function loadCurrencyOptions() {
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then(response => response.json())
        .then(data => {
            const fromCurrency = document.getElementById('fromCurrency');
            const toCurrency = document.getElementById('toCurrency');

            // Llenar el select con las opciones
            for (const currency in data.rates) {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.innerText = currency;
                fromCurrency.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.innerText = currency;
                toCurrency.appendChild(optionTo);
            }
        })
        .catch(error => console.error('Error al cargar las monedas:', error));
}

// Convierte divisas
function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const result = (amount * rate).toFixed(2);
            document.getElementById('conversionResult').innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        })
        .catch(error => console.error('Error al convertir moneda:', error));
}

// Borra el historial
function clearHistory() {
    history = [];
    document.getElementById('historyList').innerHTML = '';
}

// Muestra el historial
function showHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Limpiar el historial actual
    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = item;
        historyList.appendChild(li);
    });
}

// Detecta la fórmula de una imagen
function detectFormula() {
    const input = document.getElementById('capture');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;

            // Mostrar imagen en la galería
            const gallery = document.getElementById('photoGallery');
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.className = 'col-4 mb-2';
            gallery.appendChild(imgElement);

            // Aquí podrías implementar la lógica para detectar fórmulas
            // pero para simplicidad no se incluye en este momento
        };
        reader.readAsDataURL(file);
    }
}
