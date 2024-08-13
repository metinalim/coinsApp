// tests for GraphView component
// import mock from 'react-native-reanimated/mock'

// jest.mock('react-native-reanimated', () => { });
// jest.mock('react-native-reanimated', () => { });
// Remove the unnecessary declaration statement

const mock = require('react-native-reanimated/mock');
jest.mock('react-native-reanimated', () => mock);

import React from 'react';
import { render } from '@testing-library/react-native';
import GraphView from './GraphView';


const candles = [
  { time: '1', close: 1, open: 1, high: 1, low: 1, timestamp: 1, symbol: 'BTC' },
  { time: '3', close: 3, open: 3, high: 3, low: 3, timestamp: 3, symbol: 'ETH' },
  { time: '2', close: 2, open: 2, high: 2, low: 2, timestamp: 2, symbol: 'XRP' },
];

describe('GraphView', () => {
  it('renders correctly', () => {
    const { getByText } = render(<GraphView candles={candles} />);
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });
});
