import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Constantes
  readonly CONNECTA = 4
  readonly FILAS = 6
  readonly COLUMNAS = 7

  //Variables
  columnSetHTML = new Array();
  turno = "";
  casillasJugadas: number[][] = new Array();
  casillasJugadasAmarillo: number[][] = new Array();
  casillasJugadasRojo: number[][] = new Array();
  jugadasAmarillo = 0
  jugadasRojo = 0

  //Partidas ganadas del amarillo y rojo
  partidasGanadasAmarillo = 0
  partidasGanadasRojo = 0

  ngOnInit(): void {
    this.columnSetHTML = new Array();
    this.turno = "Amarillo";
    this.casillasJugadas = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasAmarillo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasRojo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.jugadasAmarillo = 0;
    this.jugadasRojo = 0;
    
    //Añade los EventListener a los círculos
    for (let i = 0; i < this.FILAS; i++) {
      this.columnSetHTML.push(document.querySelectorAll(".fila-" + i))
    }
    
    for (let columnas of this.columnSetHTML) { 
      for (let circle of columnas) {
        circle.style.backgroundColor = "aqua"
        circle.addEventListener("click", (event: Event) => { this.funJugar(event) })
      }
    }
    
    console.log(this.columnSetHTML)
  }

  reiniciar() {
    this.turno = "Amarillo";
    this.casillasJugadas = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasAmarillo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasRojo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.jugadasAmarillo = 0;
    this.jugadasRojo = 0;
    for (let columnas of this.columnSetHTML) {
      for (let circle of columnas) {
        circle.style.backgroundColor = "aqua"
      }
    }
  }

  cambiarTurno(): void {
    this.turno = this.turno == "Amarillo" ? "Rojo" : "Amarillo";
  }

  contarFichasColumna(casillasJugadas: Array<Array<number>>, columna: number): number {
    let contador = 0;
    casillasJugadas.forEach(fila => {
      if (fila[columna] != 0) {
        contador++;
      }
    });
    return contador;
  }

  funJugar(event: Event) {

    let eventTarget = event.target as HTMLTableElement;
    // Para cualquier Array [fila][columna]
    let column = parseInt(eventTarget.className.charAt(15))
    let row = 5 - (this.contarFichasColumna(this.casillasJugadas, column))
    console.log(row)
    
    //Si ya está llena la columna
    if (row < 0) {

      alert("Jugada inválida, prueba otro movimiento")

    } else {
      if (this.turno == "Amarillo") {
        this.casillasJugadas[row][column] = 1
        this.casillasJugadasAmarillo[row][column] = 1
        this.columnSetHTML[row][column].style.backgroundColor = "yellow"
        this.jugadasAmarillo++
      } else {
        this.casillasJugadas[row][column] = 2
        this.casillasJugadasRojo[row][column] = 1
        this.columnSetHTML[row][column].style.backgroundColor = "red";
        this.jugadasRojo++
      }

      console.log(this.casillasJugadas)
      this.cambiarTurno()
      //this.revisarTablero(this.jugadasAmarillo + this.jugadasRojo);
    }

  }

  // revisarTablero(jugadas: number) {

  // }

  // moveUp(fila:number, columna:number) {
  //   //Tendría que moverse hacia arriba una posicion en el tablero y devolver un 1 si es amarillo o 2 si es rojo

  // }
  // moveDown() {

  // }
  // moveRight() {

  // }
  // moveLeft() {
    
  // }

  winner(ganador: string) {
    console.log("Ganador: Jugador " + ganador)
    if (ganador == "Amarillo") {
      this.partidasGanadasAmarillo++
    } else {
      this.partidasGanadasRojo++
    }
    this.reiniciar()


  }

}