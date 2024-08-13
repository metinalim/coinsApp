import React from 'react';
import { render } from '@testing-library/react-native';
import CryptoList from './CryptoList';
import { Provider } from 'react-redux';
import store from '../redux/store';

// mock useIsFocused, useNavigation  hook
jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// mock api call
jest.mock('../services/api', () => ({
  getCryptoList: () => Promise.resolve([]),
}));


jest.mock('../helpers/commonHelpers', () => ({
  formatLabel: (timestamp: number) => ({ time: timestamp.toString(), day: 'Monday' }),
}));

describe('CryptoList', () => {
  it('renders correctly', async () => {
    const { getByText } = await render(
      <Provider store={store}>
        <CryptoList />
      </Provider>
    );
    expect(getByText('Loading...')).not.toBeNull();
  });
});