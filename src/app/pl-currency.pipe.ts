import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'myCurrency'
})
//TODO: zobaczyć czy da się to jeszcze naprawic. jak nie to w app.config.ts tez usunac plcurrency w providers  
export class plCurrency extends CurrencyPipe implements PipeTransform {
  transform(
    value: any,
    currencyCode: string = 'PLN', 
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '1.2-2', 
    locale: string = 'pl-PL' 
  ): string | null {
    const formattedValue = super.transform(value, currencyCode, display, digitsInfo, locale);
    return formattedValue ? `${formattedValue} zł` : null; 
  }
}
