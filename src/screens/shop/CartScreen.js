import React, {useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';

import styled from 'styled-components';
import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../assets/Icons/Global/Icons';
import {useSelector, useDispatch} from 'react-redux';

import CartItem from '../../../src/components/shop/CartItem';
import * as cartActions from '../../store/actions/Cart';
import * as orderActions from '../../store/actions/Orders';

const CartScreen = props => {
  const cartTotalPrice = useSelector(state => state.cart.totalPrice);
  // cartItems는 객체, 그래서 장바구니에 넣어논 상품을 위해 transformedCartItems라는 배열을 새로 만듦.
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    // cart에 있는 item목록에 아이디가 존재한다면 --> 그냥 선택한 item을 transformedCartItems배열에 넣기
    for (const key in state.cart.items) {
      transformedCartItems.push({
        //productId가 index를 의미하기도 하니까 items[productId]는 알맞는 item을 찾게 됨.
        productId: key,
        productTitle: state.cart.items[key].prodTitle,
        productPrice: state.cart.items[key].prodPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const spinnerColor = 'rgb(136,95,255)';
  const sentToOrder = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalPrice));
    setIsLoading(false);
  };

  return (
    <View>
      <HeaderBar.leftCenter
        centerTitle="Cart"
        leadingIcon={<Icons.arrowBack />}
        leadingAction={() => {
          props.navigation.goBack();
        }}
      />
      <Container>
        <Wrapper>
          <SummaryText>
            Total:
            <PriceText>
              {' '}
              ${Math.round(cartTotalPrice.toFixed(2) * 100) / 100}
            </PriceText>
          </SummaryText>

          {isLoading ? (
            <ActivityIndicator size="small" color={spinnerColor} />
          ) : (
            <Button
              disabled={cartItems.length === 0}
              activeOpacity={0.5}
              onPress={sentToOrder}>
              <ButtonText active={cartItems.length}>Order Now</ButtonText>
            </Button>
          )}
        </Wrapper>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable={true}
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </Container>
    </View>
  );
};

const Container = styled.View`
  margin: 20px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  shadow-color: black;
  shadow-opacity: 0.26;
  shadow-radius: 8px;
  elevation: 5;
  border-radius: 10px;
  background-color: white;
`;
const SummaryText = styled.Text`
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  font-size: 18px;
`;
const PriceText = styled.Text`
  color: ${props => props.theme.colors.mainColor};
`;
const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text`
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  color: ${props =>
    props.active ? props.theme.colors.heartColor : props.theme.colors.gray4};
`;
const SubWrapper = styled.View``;
const SubText = styled.Text``;

export default CartScreen;
