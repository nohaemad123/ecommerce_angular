import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  private countdownSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  countdown$: Observable<number> = this.countdownSubject.asObservable();

  startCountdown(minutes: number): void {
    const seconds = minutes * 60;

    let remainingTime = seconds;
    const intervalId = setInterval(() => {
      this.countdownSubject.next(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(intervalId);
      } else {
        remainingTime--;
      }
    }, 1000);
  }
}
