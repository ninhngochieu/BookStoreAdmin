import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../environments/environment';

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
    if (value && value !== '') { return environment.IMG_ROOT + value; }
    if (type === 'user') {
      return 'assets/images/avatar.png';
    } else {
      return 'assets/images/placeholder-img.png';
    }
  }
}

@Pipe({ name: 'url' })
export class UrlPipe implements PipeTransform {
  transform(value: string): string {
    if (value && value !== '') { return environment.IMG_ROOT + value; }
  }
}

