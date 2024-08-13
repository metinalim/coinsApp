import React from 'react';
import { render } from '@testing-library/react-native';
import GraphView from './GraphView';

const candles = [
  { time: '1', close: 1, open: 1, high: 1, low: 1, timestamp: 1, symbol: 'BTC' },
  { time: '2', close: 2, open: 2, high: 2, low: 2, timestamp: 2, symbol: 'BTC' },
  { time: '3', close: 3, open: 3, high: 3, low: 3, timestamp: 3, symbol: 'BTC' },
];

describe('GraphView', () => {
  it('renders correctly', () => {
    const { getByText } = render(<GraphView candles={candles} />);
    expect(getByText('Symbol: BTC')).not.toBeNull();
    expect(getByText('Close: 3')).not.toBeNull();
    expect(getByText('High: 3')).not.toBeNull();
  });

  it('renders loading text when no candles are provided', () => {
    const { getByText } = render(<GraphView candles={[]} />);
    expect(getByText('Loading...')).not.toBeNull();
  });

  it('renders loading text when no candles are provided', () => {
    const { getByText } = render(<GraphView candles={[]} />);
    expect(getByText('Loading...')).not.toBeNull();
  });

});
