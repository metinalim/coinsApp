import { renderHook } from '@testing-library/react-hooks';
import { useCryptoList, useGetCrypto } from './customHooks';
import { observableCryptoList, observableCryptoDetails } from '../redux/cryptoRx';
import { setCryptoList, setCryptoCandles } from '../redux/cryptoSlice';
import { firstValueFrom } from 'rxjs';
import { useAppDispatch } from '../redux/hooks';
import { useIsFocused } from '@react-navigation/native';

jest.mock('../redux/cryptoSlice');
jest.mock('../redux/hooks');
jest.mock('@react-navigation/native');

// mock get crypto list
jest.mock('../services/api', () => ({
  listCryptos: () => Promise.resolve([{ symbol: 'BTC' }]),
  getCrypto: () => Promise.resolve([{ time: 1 }]),
}));

describe('customHooks', () => {
  describe('useCryptoList', () => {
    it('should call setCryptoList when observableCryptoList emits a new value', async () => {
      const dispatch = jest.fn();
      const setCryptoListMock = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (setCryptoList as unknown as jest.Mock).mockReturnValue(setCryptoListMock);
      (useIsFocused as jest.Mock).mockReturnValue(true);

      renderHook(() => useCryptoList());

      const newData = [{ symbol: 'BTC' }];
      const firstResult = await firstValueFrom(observableCryptoList);
      expect(setCryptoList).toHaveBeenCalledWith(newData);
      expect(firstResult).toEqual(newData);
    });

    it.skip('should unsubscribe from observableCryptoList when the tab is not focused', async () => {
      const dispatch = jest.fn();
      const setCryptoListMock = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (setCryptoList as unknown as jest.Mock).mockReturnValue(setCryptoListMock);
      (useIsFocused as jest.Mock).mockReturnValue(false);

      const { unmount } = renderHook(() => useCryptoList());

      unmount();

      // observableCryptoList should not be subscribed to
      expect(setCryptoList).not.toHaveBeenCalled();
    });
  });

  describe('useGetCrypto', () => {
    it('should call setCryptoCandles when observableCryptoDetails emits a new value', async () => {
      const dispatch = jest.fn();
      const setCryptoCandlesMock = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (setCryptoCandles as unknown as jest.Mock).mockReturnValue(setCryptoCandlesMock);
      (useIsFocused as jest.Mock).mockReturnValue(true);

      const symbol = 'BTC';
      renderHook(() => useGetCrypto(symbol));

      const newData = [{ time: 1 }];
      const firstResult = await firstValueFrom(observableCryptoDetails(symbol));

      expect(setCryptoCandles).toHaveBeenCalledWith(newData);
      expect(firstResult).toEqual(newData);

    });

    it.skip('should unsubscribe from observableCryptoDetails when the tab is not focused', () => {
      const dispatch = jest.fn();
      const setCryptoCandlesMock = jest.fn();
      (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
      (setCryptoCandles as unknown as jest.Mock).mockReturnValue(setCryptoCandlesMock);
      (useIsFocused as jest.Mock).mockReturnValue(false);

      const symbol = 'BTC';
      const { unmount } = renderHook(() => useGetCrypto(symbol));
    });

  });

});