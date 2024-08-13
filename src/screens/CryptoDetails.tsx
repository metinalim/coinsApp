import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Candle, fetchCryptoDetail } from '../redux/cryptoSlice';
import GraphView from '../components/GraphView';
import styles from '../styles/commonStyles';
import { useGetCrypto } from '../helpers/customHooks';

const CryptoDetailScreen = ({ route }: any) => {
  const { symbol } = route.params;
  const dispatch = useAppDispatch();
  const candles: Candle[] = useAppSelector((state) => state.crypto.candles) as Candle[];

  useEffect(() => {
    dispatch(fetchCryptoDetail(symbol));
  }, [dispatch]);

  useGetCrypto(symbol);

  return (
    <View style={styles.container}>
      {candles && candles.length > 0 ? <GraphView candles={candles} /> : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default CryptoDetailScreen;
