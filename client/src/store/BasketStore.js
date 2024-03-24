import { makeAutoObservable } from 'mobx';

export default class BasketStore {
  basketItems = [];

  constructor() {
    makeAutoObservable(this);
  }
  
  addToBasket(item) {
    this.basketItems.push(item);
  }

  clearBasket() {
    this.basketItems = [];
  }
}
