jest.unmock('../helpers/commonHelpers');
jest.mock('react-native-wagmi-charts', () => ({
  formatDatetime: jest.fn((datetime) => datetime),
}));

import { formatLabel, minimizeCandlesData } from "./commonHelpers";

describe("Common Helpers", () => {
  it("formatLabel formats the label correctly", () => {
    const timestamp = 1634152800000;

    const expectedTime = {
      "locale": "en-AU",
      "options": {
        "hour": "numeric",
        "minute": "numeric",
      },
      "value": 1634152800000,
    }
    const expectedDay = {
      "locale": "en-AU",
      "options": {
        "day": "numeric",
        "month": "numeric",
      },
      "value": 1634152800000,
    }
    const label = formatLabel(timestamp);

    expect(label).toEqual({ time: expectedTime, day: expectedDay });
  });

  it("minimizeCandlesData minimizes the candles data correctly", () => {
    const candles = [
      { close: 1, open: 1, high: 1, low: 1, timestamp: 1, symbol: "BTC" },
      { close: 2, open: 2, high: 2, low: 2, timestamp: 2, symbol: "BTC" },
      { close: 3, open: 3, high: 3, low: 3, timestamp: 3, symbol: "BTC" },
      { close: 4, open: 4, high: 4, low: 4, timestamp: 4, symbol: "BTC" },
      { close: 5, open: 5, high: 5, low: 5, timestamp: 5, symbol: "BTC" },
      { close: 6, open: 6, high: 6, low: 6, timestamp: 6, symbol: "BTC" },
      { close: 7, open: 7, high: 7, low: 7, timestamp: 7, symbol: "BTC" },
      { close: 8, open: 8, high: 8, low: 8, timestamp: 8, symbol: "BTC" },
      { close: 9, open: 9, high: 9, low: 9, timestamp: 9, symbol: "BTC" },
    ];
    const rollOn = 3;
    const newCandles = minimizeCandlesData(candles, rollOn);
    const expectedCandles = [
      { symbol: 'BTC', timestamp: 3, open: 1, close: 3, high: 3, low: 1 },
      { symbol: 'BTC', timestamp: 6, open: 4, close: 6, high: 6, low: 4 },
      { symbol: 'BTC', timestamp: 9, open: 7, close: 9, high: 9, low: 7 }
    ]
    expect(newCandles.length).toBe((candles.length / rollOn));
    expect(newCandles).toEqual(expectedCandles);
  });
});