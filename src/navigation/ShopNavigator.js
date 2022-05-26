import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

import * as authActions from '../store/actions/Auth';
import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailSCreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';

const activeTintColor = '#885FFF';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Products_AuthNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="startUp"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="startUp" component={StartUpScreen} />
      <Stack.Screen
        options={{gestureEnabled: false}} // 뒤로가는 기능 방지_IOS
        name="auth"
        component={AuthScreen}
      />
      <Stack.Screen
        options={{gestureEnabled: false}} // 뒤로가는 기능 방지_IOS
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

// drawer에서 로그아웃을 위한 Custom Content
const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <ButtonWrapper>
        <LogoutButton
          activeOpacity={0.5}
          onPress={() => {
            dispatch(authActions.logout());
            //상품 화면이 아닌 로그인 화면으로 이동해야함. (token삭제 과정 필요)
            props.navigation.navigate('Products');
          }}>
          <ButtonTitle>Logout</ButtonTitle>
        </LogoutButton>
      </ButtonWrapper>
    </DrawerContentScrollView>
  );
};

export const ShopNavigator = props => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: activeTintColor,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Products" component={Products_AuthNavigator} />
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
      <Drawer.Screen name="Admin" component={AdminNavigator} />
    </Drawer.Navigator>
  );
};

const ButtonWrapper = styled.View`
  flex: 1;
  padding: 20px;
`;
const LogoutButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const ButtonTitle = styled.Text`
  color: ${props => props.theme.colors.heartColor};
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  font-size: 16px;
`;
