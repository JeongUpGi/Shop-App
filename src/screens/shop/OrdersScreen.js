import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as ordersActions from '../../store/actions/Orders';

import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../assets/Icons/Global/Icons';
import styled from 'styled-components';

import OrderItem from '../../components/shop/OrderItem';

const spinnerColor = 'rgb(136,95,255)';
const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  //orders에 주문 상품에 대한 정보를 가져옴.
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.setOrders()).then(() => {
      setIsLoading(false); //then은 async와 await을 사용하는 것과 동일한 효과 -> 비동기 처리를 위함.
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <LoadingView>
        <ActivityIndicator size="large" color={spinnerColor} />
      </LoadingView>
    );
  }

  return (
    <Container>
      <HeaderBar.leftCenter
        centerTitle="Your Orders"
        leadingIcon={<Icons.menu />}
        leadingAction={() => {
          props.navigation.toggleDrawer();
        }}
      />
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <OrderItem
            totalPrice={itemData.item.totalPrice.toFixed(2)}
            date={itemData.item.date}
            // items -> CartItem의 item들을 뜻함. 즉, items는 CartItem에서 속성한 변수명. (reducer -> state.items)
            item={itemData.item.items}
          />
        )}
      />
    </Container>
  );
};

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Container = styled.View``;

export default OrdersScreen;
