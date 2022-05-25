var words = ["carne", "html", "css", "javascript", "juegos", "pixel"];
const wordContainer = document.getElementById("wordContainer");
const startButton = document.getElementById("startButton");
const usedLettersElement = document.getElementById("usedLetters");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")
ctx.canvas.width = 0;
ctx.canvas.height = 0;
// las partes del curepo del dibujo y sus cordenadas
const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

function capturar(){
    //console.log("capturado");
    wordcapture = document.getElementById("palabra").value;
    console.log(wordcapture);
    //console.log(nuevaPalabra)
    agregar();
};

function agregar(){
    words.push(wordcapture);
    console.log(words)
}




//function guarda(p){
    /*Guardar Nueva Palabra y Empezar a Jugar*/
   // words[words.length] = p
    /*Activar key event y iniciar juego*/
    //ctrl = true
    //jugar()
//};
//variables
let selectedword;
let usedLetters;
let mistakes;
let hits;
//
const addLetter = letter => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}
//agregar las partes del cuerpo mientras se vayan equivocando
const addBodypart = bodyParts => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(...bodyParts);
}
//para las palabras todas se equivoquen
const wrongLetter = () => {
    addBodypart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
}
//para cuando termine el juego muestre el boton
const endGame = () => {
    document.removeEventListener("keydown", letterEvent);
    startButton.style.display = "block";
}
//
const correctLetter = letter => {
    const { children } = wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle("hidden");
            hits++;

        };
    };
    if(hits === selectedword.length) endGame();
};
//validar si la letra es correcta o incorrecta 
const letterInput = letter => {
    if(selectedword.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
}
//las letra que se van aceptar al presionar 
const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)){
        letterInput(newLetter);
    };
};
//para ocultar las palabras y mostrar las palabras cuando presionen
const drawWord = () => {
    selectedword.forEach(letter => {
        const letterElement = document.createElement("span");
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add("letter");
        letterElement.classList.add("hidden");
        wordContainer.appendChild(letterElement);
    });
};
//para lanzar palabra random
const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedword = word.split("");
};
//dibujador del cuerpo del en version pixel (retro jaja)
const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#230371";
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};
//el boton start oculta el boton al presionarlo y muestra el canvas 
const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = "";
    usedLettersElement.innerHTML = "";
    startButton.style.display = "none";
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener("keydown", letterEvent);
};

function ocultar (){
    palabra.style.display = "none";
    boton.style.display = "none";
    titulo.style.display = "none";
    mensaje.style.display = "none";
}
startButton.addEventListener("click", ocultar);
startButton.addEventListener("click", startGame);

