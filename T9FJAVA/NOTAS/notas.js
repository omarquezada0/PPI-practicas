let intentos=0;
intentos=intentos+1;

let pendientes = ["tarea", "examen"];
pendientes = [];

const invitados = ["Ana", "Luis"];
invitados.pop();
invitados.push("Carla");
invitados.shift();
invitados.unshift("Neto");
invitados[1];
invitados[1]="Javier";


let prueba="No borrar"
if (true){
    let prueba = "hola";

}
console.log(prueba);

let dato = "hola";
console.log("Dato es"+typeof dato);
dato = 5;
console.log("Dato cambia a"+typeof dato);

console.log("Probando edad:");
let edad = 5;
let tieneCredencial;

console.log()

if(!tieneCredencial){
    console.log("Sin Credencial");

}

intentos =0;
while(intentos < 3){
    console.log('Intento $(intentos)');
    intentos = intentos +1;
}


let colores = ["rojo", "verde", "azul"];
for (let color of colores){
    console.log(color.toUpperCase());
}

for(let i =0; i < 20; i++){
    if(i === 15) break;
    if(i % 2 === 0) continue;
    console.log(i);
    
}


function sumar(a, b){
    return a + b;
    
}

const sumar2 = (a, b) => {
    return a + b;
};

const sumar3 = (a, b) => a + b;

sumar(2, 3);
sumar2(2, 3);

function dividir(a, b){
    if(b !== 0){
        return a / b;

    }else {
        return null;
    }
}

function dividir2(a, b){
    if (b === 0){
        return null;
    }
    return a / b;
}

console.clear();

let frutas = ["Manzana", "Pera", "Uva"];

frutas.length;
frutas[0];
frutas[frutas.length - 1];

frutas.push("Mango");
frutas;

