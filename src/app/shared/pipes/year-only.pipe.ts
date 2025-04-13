import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearOnly',
})
export class YearOnlyPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    return date.getFullYear().toString();
  }
}
