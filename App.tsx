import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CryptoList from './src/screens/CryptoList';
import CryptoDetails from './src/screens/CryptoDetails';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  console.log("App")
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CryptoList">
        <Stack.Screen name="CryptoList" component={CryptoList} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const AppWrapper = () => {

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </Provider>
  )
}

export default AppWrapper;
