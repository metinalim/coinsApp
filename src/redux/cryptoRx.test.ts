// test for cryptoRx
import { observableCryptoList, observableCryptoDetails } from './cryptoRx';
import { listCryptos, getCrypto } from '../services/api';
import { firstValueFrom } from 'rxjs';

jest.mock('../services/api');

describe('cryptoRx', () => {
  describe('observableCryptoList', () => {
    it('should emit a new value every 3 seconds', async () => {
      const cryptoList = [{ symbol: 'BTC' }];
      const cryptoList2 = [{ symbol: 'ETH' }];
      const cryptoList3 = [{ symbol: 'FIL' }];

      const listCryptosMock = listCryptos as jest.Mock;
      listCryptosMock.mockResolvedValue(cryptoList);

      const observable = observableCryptoList;
      const firstResult = await firstValueFrom(observable);

      listCryptosMock.mockResolvedValue(cryptoList2);
      const secondResult = await firstValueFrom(observable);

      listCryptosMock.mockResolvedValue(cryptoList3);
      const thirdResult = await firstValueFrom(observable);

      expect(firstResult).toEqual(cryptoList);
      expect(secondResult).toEqual(cryptoList2);
      expect(thirdResult).toEqual(cryptoList3);

    }, 12000);
  });
  describe('observableCryptoDetails', () => {
    it('should emit a new value every 3 seconds', async () => {
      const cryptoDetails = [{ symbol: 'BTC' }];
      const cryptoDetails2 = [{ symbol: 'ETH' }];
      const cryptoDetails3 = [{ symbol: 'FIL' }];

      const getCryptoMock = getCrypto as jest.Mock;
      getCryptoMock.mockResolvedValue(cryptoDetails);

      const observable = observableCryptoDetails('BTC');
      const firstResult = await firstValueFrom(observable);

      getCryptoMock.mockResolvedValue(cryptoDetails2);
      const secondResult = await firstValueFrom(observable);

      getCryptoMock.mockResolvedValue(cryptoDetails3);
      const thirdResult = await firstValueFrom(observable);

      expect(firstResult).toEqual(cryptoDetails);
      expect(secondResult).toEqual(cryptoDetails2);
      expect(thirdResult).toEqual(cryptoDetails3);

    }, 12000);
  });
});