const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

// Ajuste de tamaño de texto en el display
function adjustDisplayFontSize() {
    if (display.innerText.length > 15) {
        display.style.fontSize = "1.5rem"; // Tamaño más pequeño si hay muchos caracteres
    } else {
        display.style.fontSize = "2rem"; // Tamaño normal
    }
}

function appendToDisplay(value) {
    if (display.innerText === "0") {
        display.innerText = "";
    }
    display.innerText += value;
    adjustDisplayFontSize(); // Ajustar el tamaño de texto
}

function clearDisplay() {
    display.innerText = "0";
    display.style.fontSize = "2rem"; // Resetear tamaño
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1) || "0";
    adjustDisplayFontSize(); // Ajustar el tamaño de texto
}

function undo() {
    clearDisplay();
    if (historyList.childElementCount > 0) {
        const lastEntry = historyList.lastElementChild.innerText;
        display.innerText = lastEntry;
        historyList.removeChild(historyList.lastElementChild);
    }
}

function calculate() {
    try {
        const result = eval(display.innerText);
        display.innerText = result;
        addToHistory(display.innerText);
    } catch (error) {
        display.innerText = "Error";
    }
}

function addToHistory(entry) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = entry;
    historyList.appendChild(li);
}

function clearHistory() {
    historyList.innerHTML = "";
}

function evaluateInput(event) {
    if (event.key === "Enter") {
        calculate();
    }
}

// Conversor de moneda
const currencyData = {
    "USD": 1,
    "EUR": 0.85,
    "JPY": 110,
    "GBP": 0.75
};

function populateCurrencySelect() {
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    for (const currency in currencyData) {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);
        
        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    }
}

function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    if (amount) {
        const result = (amount / currencyData[fromCurrency]) * currencyData[toCurrency];
        document.getElementById("conversionResult").innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } else {
        document.getElementById("conversionResult").innerText = "Por favor, ingrese un monto.";
    }
}

populateCurrencySelect();

// Sección de captura de productos y fórmulas
function detectFormula() {
    const input = document.getElementById("capture");
    const file = input.files[0];
    if (file) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.classList.add("img-thumbnail", "col-4", "my-2");
        document.getElementById("photoGallery").appendChild(img);
    }
}

function processFormula() {
    const formula = display.innerText; // Aquí puedes incluir el manejo para resolver la fórmula
    alert(`Resolviendo la fórmula: ${formula}`);
}

// Función para cambiar entre modos
function toggleMode() {
    // Implementa la lógica para cambiar entre el modo normal y el modo científico
}
