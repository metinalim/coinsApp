import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { Candle } from '../redux/cryptoSlice';
import { formatLabel } from '../helpers/commonHelpers';
import XLabelsView, { XLabel } from '../components/XLabelsView'; // Import XLabel type
import styles from '../styles/commonStyles';

const { width } = Dimensions.get('window');

interface CryptoDetailsProps {
  candles: Candle[];
}

const GraphView = ({ candles }: CryptoDetailsProps) => {
  const candle = candles[candles.length - 1];
  if (candles.length === 0) {
    return (<Text>Loading...</Text>);
  }

  const xLabels: XLabel[] = useMemo(() => {
    const count = 5;
    const start = candles[0].timestamp;
    const end = candles[candles.length - 1].timestamp;
    const step = (end - start) / (count - 1);
    const labels: XLabel[] = [];

    for (let i = 0; i < count - 1; i++) {
      labels.push(formatLabel((start + step * i)));
    }

    labels.push(formatLabel(end));
    return labels;
  }, [candles]);

  return (
    <>
      <Text style={styles.title}>Symbol: {candle.symbol}</Text>
      <Text style={styles.price}>Close: {candle.close}</Text>
      <Text style={styles.price}>High: {candle.high}</Text>
      <Text style={styles.price}>Low: {candle.low}</Text>
      <View style={styles.chartView}>
        <CandlestickChart.Provider data={candles}>
          <CandlestickChart width={(width - 60)} height={(width - 50)}>
            <CandlestickChart.Candles positiveColor="#20bb00" negativeColor="#990000" />
            <CandlestickChart.Crosshair color="#999999">
              <CandlestickChart.Tooltip />
            </CandlestickChart.Crosshair>
            <CandlestickChart.PriceText precision={12} />
          </CandlestickChart>
        </CandlestickChart.Provider>
        <XLabelsView xLabels={xLabels} width={(width - 60)} />
      </View>
    </>
  )
}

export default GraphView;