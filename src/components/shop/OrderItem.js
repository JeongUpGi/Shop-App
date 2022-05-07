import React, {useState} from 'react';
import {View} from 'react-native';

import styled from 'styled-components';

import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Container>
      <Wrapper>
        <PriceText>${props.totalPrice}</PriceText>
        <DateText>{props.date}</DateText>
      </Wrapper>
      <ButtonWrapper>
        <DetailButton
          onPress={() => {
            setShowDetails(!showDetails);
            console.log(showDetails);
          }}>
          <ButtonText>
            {showDetails === false ? 'Show Details' : 'Hide Details'}
          </ButtonText>
        </DetailButton>
      </ButtonWrapper>
      {showDetails === true
        ? (console.log(props.item),
          (
            //cartItem이라는 변수는 props.item과 동일함.
            //ex -> props.item이 CartItem의 모든 items들을 뜻한다면 cartItem 또한 같은 뜻.
            <View>
              {props.item.map(cartItem => (
                <CartItem
                  key={cartItem.productId}
                  quantity={cartItem.quantity}
                  title={cartItem.productTitle}
                  amount={cartItem.sum}
                  deletable={false}
                />
              ))}
            </View>
          ))
        : null}
    </Container>
  );
};

const Container = styled.View`
  margin: 20px;
  padding: 10px;
  shadow-color: black;
  shadow-opacity: 0.26;
  shadow-radius: 8px;
  elevation: 5;
  border-radius: 10px;
  background-color: white;
`;
const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const PriceText = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.pretendFont.bold}
  color: ${props => props.theme.colors.black};
`;
const ButtonWrapper = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-vertical: 10px;
`;
const DetailButton = styled.TouchableOpacity``;
const ButtonText = styled.Text`
  font-size: 18px;
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  color: ${props => props.theme.colors.mainColor};
`;
const DateText = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.pretendFont.regular};
  color: ${props => props.theme.colors.gray2};
`;

export default OrderItem;
