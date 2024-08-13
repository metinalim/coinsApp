// test for api.ts
import { listCryptos, getCrypto } from './api';
import { Candle } from '../redux/cryptoSlice';
import axios from 'axios';

jest.mock('axios');

// mock function minimizeCandlesData
jest.mock('../helpers/commonHelpers', () => ({
  minimizeCandlesData: (candles: Candle[]) => candles,
}));

describe('api', () => {
  describe('listCryptos', () => {
    it('should return crypto list', async () => {
      const cryptoList = [{ symbol: 'BTC' }];
      (axios.get as jest.Mock).mockResolvedValue({ data: { success: true, data: cryptoList } });

      const result = await listCryptos();

      expect(result).toEqual(cryptoList);
    });

    it('should return empty array on error', async () => {
      (axios.get as jest.Mock).mockRejectedValue('error');

      const result = await listCryptos();

      expect(result).toEqual([]);
    });
  });
  describe('getCrypto', () => {
    it('should return crypto details', async () => {
      const cryptoDetails: Candle[] = [
        { symbol: 'BTC', close: 1000, high: 2000, low: 500, open: 1500, timestamp: 123456789 },
        { symbol: 'BTC', close: 1000, high: 2000, low: 500, open: 1500, timestamp: 123556789 },
      ];
      (axios.get as jest.Mock).mockResolvedValue({ data: { success: true, data: cryptoDetails } });

      const result = await getCrypto('BTC');

      expect(result).toEqual(cryptoDetails);
    });
    it('should return empty array on error', async () => {
      (axios.get as jest.Mock).mockRejectedValue('error');

      const result = await getCrypto('BTC');

      expect(result).toEqual([]);
    });
    it('should minimize candles data if length is greater than minimizeLimit', async () => {
      const cryptoDetails: Candle[] = [
        { symbol: 'BTC', close: 1000, high: 2000, low: 500, open: 1500, timestamp: 123456789 },
        { symbol: 'BTC', close: 1000, high: 2000, low: 500, open: 1500, timestamp: 123556789 },
      ];
      (axios.get as jest.Mock).mockResolvedValue({ data: { success: true, data: cryptoDetails } });

      const result = await getCrypto('BTC', 1);

      expect(result).toEqual(cryptoDetails);
    });
  });
});