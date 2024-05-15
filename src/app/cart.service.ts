import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbapComponent } from './abap/abap.component';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDataSubject = new BehaviorSubject<{[key: string]: any}>({});
  cartData$ = this.cartDataSubject.asObservable();

  private Quote = new BehaviorSubject<{[key: string]: any}>({});
  QuoteData$ = this.Quote.asObservable();

  
  private nextKey = 0;

  constructor() {}

  addToCart(item: any) {
    const currentCartData = this.cartDataSubject.getValue();
    const updatedCartData = { ...currentCartData, [this.nextKey++]: item };
    this.cartDataSubject.next(updatedCartData);
    AbapComponent.count++;
  }
 
  removeFromCart(key: string) {
    const currentCartData = this.cartDataSubject.getValue();
    const { [key]: removedItem, ...updatedCartData } = currentCartData;
    this.cartDataSubject.next(updatedCartData);
    AbapComponent.count--;
  }
 
  setQuoteNumber(quoteNumber: string) {
    const currentCartData = this.Quote.getValue();
    // Check if cartData already has an array for quoteNumbers
    const quoteNumbersArray = currentCartData.hasOwnProperty('quoteNumbers') ? currentCartData['quoteNumbers'] : [];
    // Add the new quoteNumber to the array
    const updatedQuoteNumbersArray = [...quoteNumbersArray, quoteNumber];
    // Update cartData with the updated array
    const updatedCartData = { ...currentCartData, quoteNumbers: updatedQuoteNumbersArray };
    // Emit the updated cart data
    this.cartDataSubject.next(updatedCartData);
    
  }

  getQuoteNumbers(): string[] {
    const currentCartData = this.Quote.getValue();
    // Check if cartData has an array for quoteNumbers
    if (currentCartData.hasOwnProperty('quoteNumbers')) {
      return currentCartData['quoteNumbers'];
    } else {
      return [];
    }
  }

  deleteQuoteNumbers() {
    const currentCartData = this.Quote.getValue();
    // Check if cartData has an array for quoteNumbers
    if (currentCartData.hasOwnProperty('quoteNumbers')) {
      // Create a copy of the cart data without the quoteNumbers array
      const { quoteNumbers, ...updatedCartData } = currentCartData;
      // Emit the updated cart data
      this.cartDataSubject.next(updatedCartData);
    }
  }

  getNextKey() {
    return this.nextKey;
  }
}