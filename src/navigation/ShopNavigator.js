import React, {useState} from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailSCreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';

const activeTintColor = '#885FFF';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Products_AuthNavigator = props => {
  const auth = useSelector(state => state.auth);
  return auth.token === null ? (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="auth" component={AuthScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName="productsOverView"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="productsOverView"
        component={ProductsOverViewScreen}
      />
      <Stack.Screen name="productDetail" component={ProductDetailScreen} />
      <Stack.Screen name="userProducts" component={UserProductsScreen} />
      <Stack.Screen name="cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="orders"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
};

const AdminNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="userProducts"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="userProducts" component={UserProductsScreen} />
      <Stack.Screen name="editProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

export const ShopNavigator = props => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: activeTintColor,
      }}>
      <Drawer.Screen name="Products" component={Products_AuthNavigator} />
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
      <Drawer.Screen name="Admin" component={AdminNavigator} />
    </Drawer.Navigator>
  );
};
