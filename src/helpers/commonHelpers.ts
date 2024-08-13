import { formatDatetime } from 'react-native-wagmi-charts';
import { Candle } from '../redux/cryptoSlice';

export const formatLabel = (value: number) => {
  return {
    time: formatDatetime({
      value,
      locale: 'en-AU',
      options: { hour: 'numeric', minute: 'numeric' },
    }),
    day: formatDatetime({
      value,
      locale: 'en-AU',
      options: { day: 'numeric', month: 'numeric' },
    }),
  };
};

export const minimizeCandlesData = (candles: Candle[], maxCandles: number = 22) => {
  const newCandles: Candle[] = []
  let newCandle: Candle | null = null;
  const rollOn = Math.floor(candles.length / maxCandles);
  for (let i = 0; i < candles.length; i += 1) {
    if (i === 0 || i % rollOn === 0) {
      newCandle = {
        symbol: candles[i].symbol,
        timestamp: candles[i].timestamp,
        open: candles[i].open,
        close: candles[i].close,
        high: candles[i].high,
        low: candles[i].low,
      }
    }
    if (!newCandle) {
      continue
    }
    if (candles[i].high > newCandle.high) {
      newCandle.high = candles[i].high
    }
    if (candles[i].low < newCandle.low) {
      newCandle.low = candles[i].low
    }
    if (newCandle && i % rollOn === rollOn - 1) {
      newCandle.close = candles[i].close
      newCandle.timestamp = candles[i].timestamp
      newCandles.push(newCandle)
    } else if (newCandle && i === candles.length - 1) {
      newCandle.close = candles[i].close
      newCandle.timestamp = candles[i].timestamp
      newCandles.push(newCandle)
    }
  }
  return newCandles
}
