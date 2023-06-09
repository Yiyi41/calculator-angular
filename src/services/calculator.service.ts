import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  public result: number = 0;

  public contentToPrint: string = '';

  public printContent(event: any) {
    this.contentToPrint = event.target.innexText;
    return this.contentToPrint;
  }

  public sum() {}

  public substraction() {}

  public multiplication() {}

  public division() {}
}
