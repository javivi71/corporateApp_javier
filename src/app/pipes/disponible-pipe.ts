import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disponible',
  standalone: true
})
export class DisponiblePipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
    */

  transform(value: boolean): string {
    return value ? 'Sí' : 'No';
  }

}
