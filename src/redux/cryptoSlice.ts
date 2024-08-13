import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { listCryptos, getCrypto } from '../services/api';
import store from './store';

export type Crypto = {
  symbol: string;
  close: number;
};

export type Candle = {
  symbol: string;
  timestamp: number;
  close: number;
  high: number;
  low: number;
  open: number;
  amount: number;
  id: number;
  count: number;
  vol: number;
};

// Thunks for async operations
export const fetchCryptos = createAsyncThunk('crypto/fetchCryptos', async () => {
  const response = await listCryptos();
  return response;
});

export const fetchCryptoDetail = createAsyncThunk('crypto/fetchCryptoDetail', async (symbol: string) => {
  const response = await getCrypto(symbol);
  return response;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    candles: [] as Candle[],
    cryptoList: [] as Crypto[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setCryptoCandles: (state, action) => {
      state.candles = action.payload;
    },
    setCryptoList: (state, action) => {
      state.cryptoList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCryptos.fulfilled, (state, action) => {
      state.loading = false;
      state.cryptoList = action.payload;
    });
    builder.addCase(fetchCryptos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'An error occurred.';
    });
    builder.addCase(fetchCryptoDetail.fulfilled, (state, action) => {
      state.candles = action.payload as Candle[];
    });
  },
});

export const { setCryptoCandles, setCryptoList } = cryptoSlice.actions;

export default cryptoSlice.reducer;
