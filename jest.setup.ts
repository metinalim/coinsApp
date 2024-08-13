
// mock the react-native-wagmi-charts module
jest.mock('react-native-wagmi-charts', () => {
  const CandlestickChart = () => null;
  CandlestickChart.Provider = ({ children }: { children: React.ReactNode }) => children;
  CandlestickChart.Candles = () => null;
  CandlestickChart.Crosshair = () => null;
  CandlestickChart.Tooltip = () => null;
  CandlestickChart.PriceText = () => null;
  return { CandlestickChart };
});

// mock formatDatetime function
jest.mock('./src/helpers/commonHelpers', () => ({
  formatLabel: (timestamp: number) => ({ time: timestamp.toString(), day: 'Monday' }),
}));