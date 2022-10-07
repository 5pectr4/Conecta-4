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
  readonly JUGADORAMARILLO = "Amarillo"
  readonly JUGADORROJO = "Rojo"

  //Variables
  columnSetHTML = new Array();
  turno = "";
  casillasJugadas: number[][] = new Array();
  casillasJugadasAmarillo: number[][] = new Array();
  casillasJugadasRojo: number[][] = new Array();
  jugadasAmarillo = new Array();
  jugadasRojo = new Array();
  numJugadasAmarillo = 0;
  numJugadasRojo = 0;

  //Partidas ganadas del amarillo y rojo
  partidasGanadasAmarillo = 0
  partidasGanadasRojo = 0

  ngOnInit(): void {
    this.columnSetHTML = new Array();
    this.turno = "Amarillo";
    this.casillasJugadas = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasAmarillo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasRojo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.jugadasAmarillo = new Array();
    this.jugadasRojo = new Array();
    this.numJugadasAmarillo = 0;
    this.numJugadasRojo = 0;

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

  }

  reiniciar() {
    this.turno = "Amarillo";
    this.casillasJugadas = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasAmarillo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.casillasJugadasRojo = new Array(this.FILAS).fill(0).map(() => new Array(this.COLUMNAS).fill(0));
    this.jugadasAmarillo = new Array();
    this.jugadasRojo = new Array();
    this.numJugadasAmarillo = 0;
    this.numJugadasRojo = 0;
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
    let row = this.FILAS - (this.contarFichasColumna(this.casillasJugadas, column)) - 1

    //Si ya está llena la columna
    if (row < 0) {

      alert("Jugada inválida, prueba otro movimiento")

    } else {
      if (this.turno == "Amarillo") {
        this.casillasJugadas[row][column] = 1
        this.casillasJugadasAmarillo[row][column] = 1
        this.columnSetHTML[row][column].style.backgroundColor = "yellow"
        this.numJugadasAmarillo++
        this.jugadasAmarillo.push(new Array(row, column))
      } else {
        this.casillasJugadas[row][column] = 2
        this.casillasJugadasRojo[row][column] = 1
        this.columnSetHTML[row][column].style.backgroundColor = "red";
        this.numJugadasRojo++
        this.jugadasRojo.push(new Array(row, column))
      }

      this.cambiarTurno()
      this.revisarTablero(this.numJugadasAmarillo + this.numJugadasRojo);
    }

  }

  revisarTablero(numJugadas: number) {
    //Se ubicaria en la casilla actual 
    this.checkVertical();
    this.checkHorizontal();
    this.checkDiagonals();
  }

  //******Cambiar esto a una clase aparte*******
  traspilar(array: number[][]): number[][] {
    let array2: number[][] = new Array(this.COLUMNAS).fill(0).map(() => new Array(this.FILAS).fill(0))
    for (let i = 0; i < array2.length; i++) {
      for (let j = 0; j < array2[0].length; j++) {
        array2[i][j] = array[j][i];
      }
    }
    return array2
  }
  sum(array: number[], unodos: number) {
    return array.filter(num => {
      return num == unodos ? true : false
    }).length
  }
  specialEvery(array: number[], num: number): boolean {
    let difZero = true;
    for (const element of array) {
      difZero = difZero && (element == num)
    }
    return difZero
  }

  checkVertical() {
    let array = this.traspilar(this.casillasJugadas)

    for (const fila of array) {
      if (this.sum(fila, 1) == 4) {
        console.log("Hay al menos 4 Verticales amarillas")
        if (this.specialEvery(fila.slice(0, 4), 1) || this.specialEvery(fila.slice(1, 5), 1) || this.specialEvery(fila.slice(2, 6), 1)) {
          console.log("Ganador: " + this.JUGADORAMARILLO)
        }
      }
      if (this.sum(fila, 2) == 4) {
        console.log("Hay al menos 4 Verticales rojas")
        if (this.specialEvery(fila.slice(0, 4), 2) || this.specialEvery(fila.slice(1, 5), 2) || this.specialEvery(fila.slice(2, 6), 2)) {
          console.log("Ganador: " + this.JUGADORROJO)
        }
      }
    }
  }


  checkHorizontal() {
    for (const fila of this.casillasJugadas) {
      if (this.sum(fila, 1) == 4) {
        console.log("Hay al menos 4 Horizontales amarillas")
        if (this.specialEvery(fila.slice(0, 4), 1) || this.specialEvery(fila.slice(1, 5), 1) || this.specialEvery(fila.slice(2, 6), 1) || this.specialEvery(fila.slice(3, 7), 1)) {
          console.log("Ganador: " + this.JUGADORAMARILLO)
        }
      }
      if (this.sum(fila, 2) == 4) {
        console.log("Hay al menos 4 Horizontales rojas")
        if (this.specialEvery(fila.slice(0, 4), 2) || this.specialEvery(fila.slice(1, 5), 2) || this.specialEvery(fila.slice(2, 6), 2) || this.specialEvery(fila.slice(3, 7), 2)) {
          console.log("Ganador: " + this.JUGADORROJO)
        }
      }
    }
  }

  // getDiagonals(array: number[][]): number[][] {
  //   let tmp: number[][] = [[2, 0], [3, 1], [4, 2], [5, 3]]
  //   let tmp2: number[][] = [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]
  //   let tmp3: number[][] = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]] //**************
  //   let tmp4: number[][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  //   let tmp5: number[][] = [[0, 2], [1, 3], [2, 4], [3, 5], [4, 5]]
  //   let tmp6: number[][] = [[0, 3], [1, 4], [2, 5], [3, 6]]

  //   let diag = new Array()


  //   for (let i = 0; i < this.FILAS; i++) {
  //     if (i <= 5) {
  //       diag.push()
  //     }
  //     diag.push([[i, i], [i, i + 1]])
  //   }


  //   return diag
  // }

  checkDiagonals() {
    // console.log(this.getDiagonals(this.casillasJugadas)[0])

    // for (const diagonol of array) {
    //   if (this.sum(fila, 1) == 4) {
    //     console.log("Hay al menos 4 Verticales amarillas")
    //     if (this.specialEvery(fila.slice(0, 4), 1) || this.specialEvery(fila.slice(1, 5), 1) || this.specialEvery(fila.slice(2, 6), 1)) {
    //       console.log("Ganador: " + this.JUGADORAMARILLO)
    //     }
    //   }
    //   if (this.sum(fila, 2) == 4) {
    //     console.log("Hay al menos 4 Verticales rojas")
    //     if (this.specialEvery(fila.slice(0, 4), 2) || this.specialEvery(fila.slice(1, 5), 2) || this.specialEvery(fila.slice(2, 6), 2)) {
    //       console.log("Ganador: " + this.JUGADORROJO)
    //     }
    //   }
    // }

    let tmp: number[][] = [
      [2, 0], [3, 1], [4, 2], [5, 3], //********TERCERA********/
      [1, 0], [2, 1], [3, 2], [4, 3], //********SEGUNDA********/
      [2, 1], [3, 2], [4, 3], [5, 4], //********SEGUNDA********/
      [0, 0], [1, 1], [2, 2], [3, 3], //******PRINCIPAL********/
      [1, 1], [2, 2], [3, 3], [4, 4], //******PRINCIPAL********/
      [2, 2], [3, 3], [4, 4], [5, 5], //******PRINCIPAL********/
      [0, 1], [1, 2], [2, 3], [3, 4], //******PRINCIPAL2********/
      [1, 2], [2, 3], [3, 4], [4, 5], //******PRINCIPAL2********/
      [2, 3], [3, 4], [4, 5], [5, 6], //******PRINCIPAL2********/
      [0, 2], [1, 3], [2, 4], [3, 5], //********SEGUNDA********/
      [1, 3], [2, 4], [3, 5], [4, 5], //********SEGUNDA********/
      [0, 3], [1, 4], [2, 5], [3, 6]  //********TERCERA********/
    ]


    let diag: any = new Array(12).map(() => new Array())

    for (const fila of diag) {
      for (let j = 0; j < 4; j++) {
        fila.push(this.casillasJugadas[tmp[j][0]][tmp[j][1]]);
        // if (this.sum(fila, 1) == 4) {
        //   console.log("Hay al menos 4 Verticales amarillas")
        //   if (this.specialEvery(fila.slice(0, 4), 1) || this.specialEvery(fila.slice(1, 5), 1) || this.specialEvery(fila.slice(2, 6), 1)) {
        //     console.log("Ganador: " + this.JUGADORAMARILLO)
        //   }
        // }
        // if (this.sum(fila, 2) == 4) {
        //   console.log("Hay al menos 4 Verticales rojas")
        //   if (this.specialEvery(fila.slice(0, 4), 2) || this.specialEvery(fila.slice(1, 5), 2) || this.specialEvery(fila.slice(2, 6), 2)) {
        //     console.log("Ganador: " + this.JUGADORROJO)
        //   }
        // }
      }
    }
    console.log(diag)

  }


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