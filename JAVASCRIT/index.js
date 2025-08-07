// Función para realizar las operaciones matemáticas básicas
function mathOperations(a, b) {
    // Verificar si los argumentos son números
    if (typeof a !== 'number' || typeof b !== 'number') {
      return 'Error: Ambos argumentos deben ser números';
    }
  
    // Realizar las operaciones
    const sum = a + b;
    const subtraction = a - b;
    const multiplication = a * b;
    const division = b !== 0 ? a / b : 'Error: División por cero';
  
    // Crear un objeto con los resultados
    const results = {
      suma: sum,
      resta: subtraction,
      multiplicacion: multiplication,
      division: division
    };
  
    // Convertir el objeto a una cadena JSON formateada
    return JSON.stringify(results, null, 2);
  }
  
  // Ejemplo de uso
  const num1 = 10;
  const num2 = 5;
  console.log(mathOperations(num1, num2));