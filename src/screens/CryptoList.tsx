import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Crypto, fetchCryptos } from '../redux/cryptoSlice';
import { NavigationProp, useNavigation, } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes'; // Adjust the import according to your project structure
import styles from '../styles/commonStyles';
import { useCryptoList } from '../helpers/customHooks';

const CryptoListScreen = () => {
  const dispatch = useAppDispatch();
  const cryptoList = useAppSelector((state) => state.crypto.cryptoList);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  useCryptoList()

  const CryptoListRow = ({ item }: { item: Crypto }) => {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('CryptoDetail', { symbol: item.symbol })}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.priceList}>{item.close}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={cryptoList}
        renderItem={CryptoListRow}
        keyExtractor={(item) => item.symbol}
      />
    </View>
  );
};

export default CryptoListScreen;