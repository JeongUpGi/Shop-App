import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import Icons from '../../assets/Icons/Global/Icons';

const CartItem = props => {
  return (
    <Container>
      <TextWrapper>
        <QuantityText>{props.quantity} </QuantityText>
        <TitleText>{props.title}</TitleText>
      </TextWrapper>
      <Wrapper>
        <AmountText>${props.amount.toFixed(2)}</AmountText>
        {props.deletable ? (
          <RemoveButton onPress={props.onRemove}>
            <Icons.trash />
          </RemoveButton>
        ) : null}
      </Wrapper>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  margin-horizontal: 20px;
`;
const TextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const QuantityText = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.pretendFont.regular};
`;
const TitleText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.gray1};
  font-family: ${props => props.theme.fonts.pretendFont.bold};
`;
const Wrapper = styled.View`
  flex-direction: row;
`;
const AmountText = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  color: ${props => props.theme.colors.gray1};
`;
const RemoveButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

export default CartItem;
