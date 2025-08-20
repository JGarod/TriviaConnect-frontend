import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotyfService {

  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 3000,
      position: { x: 'left', y: 'bottom' },
      dismissible: false,
      ripple: true,
    });
  }

  success(message: string, background: string = '#22c55e', duration?: number) {
    this.notyf.success({
      message,
      background,
      duration: duration ?? 3000
    });
  }

  error(message: string, background: string = '#ef4444', duration?: number) {
    this.notyf.error({
      message,
      background,
      duration: duration ?? 3000
    });
  }
}
