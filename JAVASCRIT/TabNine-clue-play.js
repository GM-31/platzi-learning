/**
 * Diseñaremos un juego de adivinanzas sencillo en el que el usuario 
 * tenga que adivinar una palabra secreta basada en pistas progresivas y 
 * y estará desarrollado en JavaScript, toda la interacción de entradas y 
 * salidas serán por consola
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definimos la palabra secreta y las pistas
const secretWord = "javascript"; 

// Pistas: JavaScript es un lenguaje de programación orientado a objetos, 
const hints = ["Es un lenguaje de programación", "Es un objeto-basado", "Es un lenguaje de alto nivel"];

// Variables globales
let attempts = 0; // Contador de intentos
let guessedLetters = new Set(); // Conjunto de letras adivinadas

// Función para mostrar las letras correctas y las incorrectas
function displayGuessedLetters() {
  let display = '';
  for (let letter of secretWord) {
    if (guessedLetters.has(letter)) {
      display += letter + ' ';
    } else {
      display += '_ ';
    }
  }
  console.log(display);
  console.log(`Letras adivinadas: ${Array.from(guessedLetters).join(', ')}`);
  console.log(`Pista: ${hints[attempts]}`);
}

// Función para obtener la letra ingresada por el usuario  
function getGuess() {
  return new Promise((resolve) => {
    rl.question("Ingrese una letra: ", (answer) => {
      resolve(answer);
    });
  });
}

// Función para verificar si la letra ingresada es correcta
function isLetterCorrect(guess) {
  return secretWord.includes(guess);
}

// Función para verificar si el juego terminó
function isGameOver() {
  return attempts >= hints.length;
}

// Función principal del juego
async function playGame() {
  console.log("¡Bienvenido al juego de adivinanzas!");
  console.log(`La palabra tiene ${secretWord.length} letras.`);
  displayGuessedLetters();

  while (!isGameOver()) {
    const guess = await getGuess();

    if (isLetterCorrect(guess)) {
      console.log("¡Letra correcta!");
      guessedLetters.add(guess);
    } else {
      console.log("Letra incorrecta.");
      attempts++;
    }

    displayGuessedLetters();

    if (secretWord.split('').every(letter => guessedLetters.has(letter))) {
      console.log(`¡Has ganado! La palabra secreta era "${secretWord}".`);
      rl.close();
      return;
    }
  }

  if (attempts >= hints.length) {
    console.log(`¡Has perdido! La palabra secreta era "${secretWord}".`);
  }

  rl.close();
}

// Iniciamos el juego
playGame();