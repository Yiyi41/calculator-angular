import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'calcalutor-angular';
  public tab = [
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    '1',
    '0',
    '.',
    '%',
    '+',
    '-',
    '*',
    '/',
    'C',
    '=',
  ];

  public _printContent: string = '';
  public result: number = 0;

  public get printContent(): string {
    return this._printContent;
  }

  public set printContent(value: string) {
    this._printContent = value;
  }

  regex = /^([%+\-*=/C])$/;
  firstNumber = '';
  currentOperator = '';
  startNewNumber = true;

  constructor() {}

  public print(clickedItem: string) {
    if (clickedItem.search(this.regex) === -1) {
      // condition pour détecter si c'est le 2eme chiffire après avoir tapé un opérateur
      if (this.startNewNumber === true) {
        this._printContent = ''; // c'est un nouveau nombre on efface l'ecran avant d'afficher
        this.startNewNumber = false;
      }

      // on tape le .
      if (clickedItem === '.') {
        if (this._printContent.length === 0) {
          this._printContent = '0.';
        }

        if (this._printContent.indexOf('.') === -1) {
          this._printContent += clickedItem;
        }
      } else {
        this._printContent += clickedItem; // chiffre qui n'est pas un point
      }

      // on tape le 0
    } else if (clickedItem.search(this.regex) === 0) {
      // si on tape un operateur
      this.startNewNumber = true; // le prochain chiffre commencera un nouveau nombre
      if (clickedItem === '=') {
        // ontape un =
        //si currentoperator est +
        if (this.currentOperator === '+') {
          this.add(Number(this.firstNumber), Number(this._printContent));
        } else if (this.currentOperator === '-') {
          this.substract(Number(this.firstNumber), Number(this._printContent));
        } else if (this.currentOperator === '*') {
          this.multiply(Number(this.firstNumber), Number(this._printContent));
        } else if (this.currentOperator === '/') {
          this.divide(Number(this.firstNumber), Number(this._printContent));
        } else if (this.currentOperator === '%') {
          this.percentage(Number(this.firstNumber));
        }

        this._printContent = this.result.toString();
        this.currentOperator = '';
      } else if (clickedItem === 'C') {
        this.reset();
      } else {
        // on tape un autre operateur que =
        this.firstNumber = this._printContent;
        this.currentOperator = clickedItem;
      }
    }
  }

  public add(value1: number, value2: number) {
    return (this.result = value1 + value2);
  }

  public substract(value1: number, value2: number) {
    return (this.result = value1 - value2);
  }

  public divide(value1: number, value2: number) {
    console.log(value1, value2);
    return (this.result = value1 / value2);
  }

  public multiply(value1: number, value2: number) {
    return (this.result = value1 * value2);
  }

  public percentage(value1: number) {
    return (this.result = value1 / 100);
  }

  public reset(): void {
    this._printContent = '';
    this.result = 0;
    this.firstNumber = '';
    this.currentOperator = '';
  }
}
