// test for cryptoSlice.ts
import cryptoReducer, { setCryptoList, setCryptoCandles, fetchCryptoDetail } from './cryptoSlice';
import { Candle } from './cryptoSlice';
import { listCryptos, getCrypto } from '../services/api';
import { RootState } from './store';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../services/api');

describe('cryptoSlice', () => {
  describe('cryptoReducer', () => {
    it('should set cryptoList', () => {
      const initialState = {
        candles: [] as Candle[],
        cryptoList: [] as any[],
        loading: false,
        error: null as string | null,
      };

      const cryptoList = [{ symbol: 'BTC' }];
      const action = setCryptoList(cryptoList);

      const state = cryptoReducer(initialState, action);

      expect(state.cryptoList).toEqual(cryptoList);
    });

    it('should set candles', () => {
      const initialState = {
        candles: [] as Candle[],
        cryptoList: [] as any[],
        loading: false,
        error: null as string | null,
      };

      const candles = [{ symbol: 'BTC' }];
      const action = setCryptoCandles(candles);

      const state = cryptoReducer(initialState, action);

      expect(state.candles).toEqual(candles);
    });
  });

  describe('fetchCryptoDetail', () => {
    it('should fetch crypto details', async () => {
      const store = configureStore({
        reducer: {
          crypto: cryptoReducer,
        },
      });

      const cryptoDetails = [{ symbol: 'BTC' }];
      (getCrypto as jest.Mock).mockResolvedValue(cryptoDetails);

      await store.dispatch(fetchCryptoDetail('BTC'));

      const state: RootState = store.getState();

      expect(state.crypto.candles).toEqual(cryptoDetails);
    });
  });
});