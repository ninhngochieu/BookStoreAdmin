import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPrice' })
export class FormatPricePipe implements PipeTransform {
  transform(value): string {
    if (!value) { return; }
    value = value.toString().replace(/[\,]+/g, '');
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return value;
  }
}

@Pipe({ name: 'avatar' })
export class AvatarPipe implements PipeTransform {
  transform(value: string, type: string): string {
    if (value && value !== '') { return value; }
    return type === 'user'
      ? 'assets/images/avatar.png'
      : 'assets/images/placeholder-img.png';
  }
}
