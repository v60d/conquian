//Juego de conquian
// Clase para representar una carta
class Carta {
     constructor(valor, palo) {
         this.valor = valor;
         this.palo = palo;
     }
 
     toString() {
         return `${this.valor} de ${this.palo}`;
     }
 }
 
 // Clase para representar la baraja
 class Baraja {
     constructor() {
         this.cartas = [];
         const palos = ["Oros", "Copas", "Espadas", "Bastos"];
         for (let palo of palos) {
             for (let valor = 1; valor <= 10; valor++) {
                 this.cartas.push(new Carta(valor, palo));
             }
         }
     }
 
     barajar() {
         for (let i = this.cartas.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
             [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
         }
     }
 
     repartirCarta() {
         return this.cartas.pop();
     }
 }
 
 // Clase para representar un jugador
 class Jugador {
     constructor(nombre) {
         this.nombre = nombre;
         this.mano = [];
     }
 
     recibirCarta(carta) {
         this.mano.push(carta);
     }
 
     mostrarMano() {
         const manoJugador = document.getElementById("mano-jugador");
         manoJugador.innerHTML = "";
         this.mano.forEach((carta, index) => {
             const divCarta = document.createElement("div");
             divCarta.className = "carta";
             divCarta.textContent = carta.toString();
             divCarta.addEventListener("click", () => this.seleccionarCarta(index));
             manoJugador.appendChild(divCarta);
         });
     }
 
     seleccionarCarta(index) {
         console.log(`Carta seleccionada: ${this.mano[index].toString()}`);
         // Aquí puedes agregar lógica para descartar o formar combinaciones
     }
 }
 
 // Inicialización del juego
 const baraja = new Baraja();
 baraja.barajar();
 
 const jugador = new Jugador("Jugador 1");
 
 // Repartir 8 cartas al jugador
 for (let i = 0; i < 8; i++) {
     jugador.recibirCarta(baraja.repartirCarta());
 }
 
 // Mostrar la mano del jugador
 jugador.mostrarMano();
 
 // Evento para robar carta
 document.getElementById("btn-robar").addEventListener("click", () => {
     const carta = baraja.repartirCarta();
     if (carta) {
         jugador.recibirCarta(carta);
         jugador.mostrarMano();
     } else {
         alert("No hay más cartas en la baraja.");
     }
 });