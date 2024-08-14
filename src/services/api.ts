import axios from 'axios';
import { Candle } from '../redux/cryptoSlice';
import { minimizeCandlesData } from '../helpers/commonHelpers';
import cryptos from './mockData/symbols.json';
import klines from './mockData/klines.json';

const access_key = '6163179b2f3AswGRx0OKM8699'
const API_BASE_URL = `http://localhost:7391/api/`;

// set useMock to true for local builds demonstration
const useMock = true;

export const listCryptos = async (useMockData = useMock) => {
  try {
    let response
    if (useMockData) {
      const randomList = [...cryptos.data]
      // randomize mocked cryptos array each time
      response = { data: { data: randomList.sort(() => Math.random() - 0.5) } }
    } else {
      response = await axios.get(`${API_BASE_URL}/symbols?access_key=${access_key}`);
    }
    const { data } = response.data
    return data;
  } catch (error) {
    console.error(error)
    return []
  }
};

export const getCrypto = async (symbol: string, minimizeLimit = 100, useMockData = useMock): Promise<Candle[]> => {
  try {
    let response
    const url = `${API_BASE_URL}/klines?access_key=${access_key}`
    // 90 days before
    let fromDate = new Date().getTime();
    fromDate = fromDate - 120 * 24 * 60 * 60 * 1000
    fromDate = fromDate / 1000
    if (useMockData) {
      // @ts-ignore mock data is only for demo purpose, avoiding additional interface ...
      response = { data: { data: klines[symbol].data } }
    } else {
      symbol = `${symbol}USDT`
      response = await axios.get(url, { params: { symbol, fromDate } });
    }
    let { data } = response.data
    if (data.length > minimizeLimit) {
      data = minimizeCandlesData(data as Candle[]);
    }
    return data as Candle[];
  } catch (error) {
    console.error(error)
    return [] as Candle[];
  }
};
