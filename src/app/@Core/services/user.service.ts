import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from 'src/app/Data/models/user/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   /**
   * BehaviorSubject to store the current user or `null` if no user is authenticated.
   */
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  /**
   * Observable to listen for changes in the user authentication status.
   * Subscribers can receive updates whenever the user data changes.
   * @param currentUserData
  */
  user$ = this.user.asObservable();

  constructor() { }

   /**
   * Update the current user in the BehaviorSubject.
   * @param User The new user data. Use `null` to signify no authenticated user.
   */
   updateUser(User: User): void {
    this.user.next(User);
  }
}
