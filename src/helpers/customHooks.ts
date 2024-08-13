import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setCryptoList, setCryptoCandles } from '../redux/cryptoSlice';
import { observableCryptoList, observableCryptoDetails } from '../redux/cryptoRx';
import { useIsFocused } from '@react-navigation/native';
import { Subscription } from 'rxjs';


export const useCryptoList = () => {

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    const subscription: Subscription = observableCryptoList.subscribe({
      next: newData => dispatch(setCryptoList(newData)),
      error: err => console.error(err),
    });
    // cleanup when the tab is not focused or component is unmounted
    !isFocused && subscription.unsubscribe();
    return () => subscription.unsubscribe();
  }, [isFocused]);
}

export const useGetCrypto = (symbol: string) => {

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    const subscription: Subscription = observableCryptoDetails(symbol).subscribe({
      next: newData => dispatch(setCryptoCandles(newData)),
      error: err => console.error(err),
    });
    !isFocused && subscription.unsubscribe()
    return () => subscription.unsubscribe();
  }, [isFocused]);
}