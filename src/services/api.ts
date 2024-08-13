import axios from 'axios';
import { Candle } from '../redux/cryptoSlice';
import { minimizeCandlesData } from '../helpers/commonHelpers';

const access_key = '6163179b2f3AswGRx0OKM8699'
const API_BASE_URL = `http://localhost:7391/api/`;

export const listCryptos = async () => {
  try {
    // console.log("listCryptos")
    const response = await axios.get(`${API_BASE_URL}/symbols?access_key=${access_key}`);
    const { data } = response.data
    // console.log("api ls data", (data.length));
    return data;
  } catch (error) {
    console.error(error)
    return []
  }
};

export const getCrypto = async (symbol: string, minimizeLimit = 100): Promise<Candle[]> => {
  try {
    // console.log("getCrypto", symbol)
    const url = `${API_BASE_URL}/klines?access_key=${access_key}`
    // 90 days before
    let fromDate = new Date().getTime();
    fromDate = fromDate - 120 * 24 * 60 * 60 * 1000
    fromDate = fromDate / 1000
    symbol = `${symbol}USDT`
    const response = await axios.get(url, { params: { symbol, fromDate } });
    // console.log("response", response);
    let { data } = response.data
    // console.log("data", data)
    if (data.length > minimizeLimit) {
      data = minimizeCandlesData(data as Candle[]);
    }
    return data as Candle[];
  } catch (error) {
    console.error(error)
    return [] as Candle[];
  }
};
