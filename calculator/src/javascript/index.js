// Imports
import { $, $$, calculate, getTokens } from './utils.js'

// Lógica
const operationDisplay = $('.display .operation')
const resultDisplay = $('.display .result')
const buttons = $$('.input-button')

// Función que procesa la entrada (clic o teclado)
const manejarInput = (input) => {
  const validKeys = '0123456789+-*.=BackspaceEnter'
  let value = typeof input === 'string' ? input : input.target.innerText

  // Si viene del teclado y no está en las teclas permitidas, se ignora
  if (input.type === 'keydown' && !validKeys.includes(input.key)) return

  // Ajustamos el valor según el origen del evento
  if (input.type === 'keydown') {
    value = input.key === 'Enter' ? '=' : input.key === 'Backspace' ? 'C' : input.key
  }

  // Lógica básica de la calculadora
  if (!isNaN(value) || value === '.') {
    // Es un número o punto decimal
    operationDisplay.textContent += value
  } else if ('+-*/'.includes(value)) {
    // Es un operador
    operationDisplay.textContent += ` ${value} `
  } else if (value === '=') {
    // Calcular el resultado
    try {
      const tokens = getTokens(operationDisplay.textContent.replace('=', ''))
      const result = calculate(tokens)
      resultDisplay.textContent = result
    } catch (e) {
      resultDisplay.textContent = `Error! ${e}`
    }
  } else if (value === 'AC') {
    // Borrar todo
    operationDisplay.textContent = ''
    resultDisplay.textContent = ''
  }
}

// Event listeners para clics en los botones
buttons.forEach((button) => {
  button.addEventListener('click', manejarInput)
})

// Event listener para las teclas del teclado
document.addEventListener('keydown', manejarInput)
