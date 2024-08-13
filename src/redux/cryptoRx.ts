import { listCryptos, getCrypto } from '../services/api';
import { Observable, Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Crypto, Candle } from './cryptoSlice';

export const observableCryptoListOld = new Observable<Crypto[]>(subscriber => {
  listCryptos()
    .then(data => subscriber.next(data))
    .catch(err => subscriber.error(err));
});

export const observableCryptoList = new Observable<Crypto[]>(subscriber => {
  const intervalSubscription: Subscription = interval(3000)
    .pipe(
      switchMap(() => listCryptos())
    )
    .subscribe({
      next: data => subscriber.next(data),
      error: err => subscriber.error(err),
    });

  // called on unsubscription
  return () => {
    intervalSubscription.unsubscribe();
  };
});

export const observableCryptoDetails = (symbol: string) =>
  new Observable<Candle[]>(subscriber => {
    const intervalSubscription: Subscription = interval(3000)
      .pipe(
        switchMap(() => getCrypto(symbol))
      )
      .subscribe({
        next: data => subscriber.next(data),
        error: err => subscriber.error(err),
      });

    // called on unsubscription
    return () => {
      intervalSubscription.unsubscribe();
    };
  }); 
