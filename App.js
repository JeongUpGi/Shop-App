/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
//import {composeWithDevTools} from 'redux-devtools-extension';

import {mainTheme} from './src/constants/Palette';
import {ThemeProvider} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import productsReducers from './src/store/reducers/Products';
import cartReducer from './src/store/reducers/Cart';
import ordersReducer from './src/store/reducers/Orders';
import authReducer from './src/store/reducers/Auth';
import {ShopNavigator} from './src/navigation/ShopNavigator';
import ReduxThunk from 'redux-thunk';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const rootReducer = combineReducers({
  products: productsReducers,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = props => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <ShopNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
