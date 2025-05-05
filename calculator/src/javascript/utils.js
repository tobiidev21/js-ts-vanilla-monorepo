// Selectors
export const $ = (el) => document.querySelector(el)
export const $$ = (el) => document.querySelectorAll(el)

// Conseguir tokens
export const getTokens = (expression) => {
  return expression.match(/(\d+|\+|-|\*|\/)/g) // Dividimos la cadena en tokens (números, operadores, etc)
}

// Función Aritmética
export const calculate = (tokens) => {
  const result = [...tokens]
  console.log(result)

  // Evaluamos la multiplicación y división primero, para respetar la separación en términos
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '*' || result[i] === '/') { // Sólo da true cuando al menos uno es verdadero
      const left = parseFloat(result[i - 1]) // Obtenemos el token izquierdo el cuál siempre será un número
      const right = parseFloat(result[i + 1]) // Obtenemos el token derecho el cuál siempre será un número
      const operation = result[i] === '*' ? left * right : left / right

      // Reemplazamos la operación en el array
      result.splice(i - 1, i + 1, operation.toString())
      i-- // Volvemos un paso (al número resultado) para seguir evaluando correctamente
    }
  }

  // Evaluamos las sumas y restas
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '+' || result[i] === '-') { // Sólo da true cuando al menos uno es verdadero
      const left = parseFloat(result[i - 1]) // Obtenemos el token izquierdo el cuál siempre será un número
      const right = parseFloat(result[i + 1]) // Obtenemos el token derecho el cuál siempre será un número
      const operation = result[i] === '+' ? left + right : left - right

      // Reemplazamos la operación en el array
      result.splice(i - 1, i + 1, operation.toString())
      i-- // Volvemos un paso (al número resultado) para seguir evaluando correctamente
    }
  }

  return result[0]
}
