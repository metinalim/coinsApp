import React from 'react';
import { render } from '@testing-library/react-native';
import XLabelsView from './XLabelsView';

const xLabels = [
  { time: '1', day: 'Monday' },
  { time: '2', day: 'Tuesday' },
  { time: '3', day: 'Wednesday' },
];

describe('XLabelsView', () => {
  it('renders correctly', () => {
    const { getByText } = render(<XLabelsView xLabels={xLabels} width={100} />);
    expect(getByText('1')).not.toBeNull();
    expect(getByText('Monday')).not.toBeNull();
    expect(getByText('2')).not.toBeNull();
    expect(getByText('Tuesday')).not.toBeNull();
    expect(getByText('3')).not.toBeNull();
    expect(getByText('Wednesday')).not.toBeNull();
  });
});