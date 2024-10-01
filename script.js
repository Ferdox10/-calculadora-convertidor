let displayValue = '0';
let previousValue = ''; // Guardar el estado anterior para undo
let history = [];

// API Key
const apiKey = '42002ed6d1f437e37bfc9f59';
const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/COP'; // Cambia 'COP' por la moneda que prefieras

// Cambiar entre modo básico y científico
function toggleMode() {
    const basicMode = document.querySelector('.basic-mode');
    const scientificMode = document.querySelector('.scientific-mode');
    if (basicMode.style.display === 'none') {
        basicMode.style.display = 'grid';
        scientificMode.style.display = 'none';
    } else {
        basicMode.style.display = 'none';
        scientificMode.style.display = 'grid';
    }
}

// Cargar monedas en los selectores
async function loadCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencyOptions = Object.keys(data.conversion_rates);
    
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencyOptions.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrency.appendChild(optionTo);
    });
}

// Conversión de moneda
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const response = await fetch(apiUrl);
    const data = await response.json();
    const fromRate = data.conversion_rates[fromCurrency];
    const toRate = data.conversion_rates[toCurrency];
    const convertedAmount = (amount * (toRate / fromRate)).toFixed(2);
    
    document.getElementById('conversionResult').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

// Evaluar la entrada del usuario
function evaluateInput(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

// Agregar valor a la pantalla
function appendToDisplay(value) {
    if (displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

// Calcular resultado
function calculate() {
    try {
        const result = eval(displayValue);
        history.push(displayValue + ' = ' + result);
        previousValue = displayValue; // Guardar estado anterior para undo
        displayValue = result.toString();
        updateHistory();
    } catch (error) {
        displayValue = 'Error';
    }
    updateDisplay();
}

// Limpiar pantalla
function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

// Deshacer la última operación
function undo() {
    if (previousValue) {
        displayValue = previousValue;
        updateDisplay();
    }
}

// Borrar el último carácter
function deleteLast() {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay();
}

// Actualizar pantalla
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

// Actualizar historial
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Limpiar historial
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

// Añadir foto
function addPhoto() {
    const input = document.getElementById('capture');
    const photoGallery = document.getElementById('photoGallery');
    const file = input.files[0];
    
    if (file) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        photoGallery.appendChild(img);
    }
}

// Cargar las monedas al iniciar
window.onload = function() {
    loadCurrencies();
};
