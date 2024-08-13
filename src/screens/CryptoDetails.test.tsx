// test for CryptoDetails
import React from 'react';
import { render } from '@testing-library/react-native';
import CryptoDetails from './CryptoDetails';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { formatLabel } from '../helpers/commonHelpers';

// mock useIsFocused hook
jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
}));

// mock api call
jest.mock('../services/api', () => ({
  getCandles: () => Promise.resolve([]),
}));

jest.mock('react-native-wagmi-charts', () => {
  const CandlestickChart = () => null;
  CandlestickChart.Provider = ({ children }: { children: React.ReactNode }) => children;
  CandlestickChart.Candles = () => null;
  CandlestickChart.Crosshair = () => null;
  CandlestickChart.Tooltip = () => null;
  CandlestickChart.PriceText = () => null;
  return { CandlestickChart };
});

jest.mock('../helpers/commonHelpers', () => ({
  formatLabel: (timestamp: number) => ({ time: timestamp.toString(), day: 'Monday' }),
}));

describe('CryptoDetails', () => {
  it('renders correctly', async () => {
    const symbol = 'BTC';
    // pass symbol as navigation prop
    const { getByText } = await render(
      <Provider store={store}>
        <CryptoDetails route={{ params: { symbol } }} />
      </Provider>
    );
    expect(getByText('Loading...')).not.toBeNull();
  });
});