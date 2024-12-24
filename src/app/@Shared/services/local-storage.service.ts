import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Sets the current data in the local storage.
   */
  setItem(key:string,value:string) {
    localStorage.setItem(key,value);
  }

  /**
   * Gets the current data from the local storage.
   *
   * @returns {Item} by key
   */
  getItem(key:string):any {
    return localStorage.getItem(key);
  }

  /**
   * remove the data from the local storage by key.
   *
   * @returns {Item} by key
   */
  removeByKey(key:string) {
    return localStorage.removeItem(key);
  }

  /**
   * Clears the local storage.
   */
  clearStorage() {
    localStorage.clear();
  }

}
