import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import * as cartActions from '../../store/actions/Cart';

import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../assets/Icons/Global/Icons';

const ProductDetailScreen = props => {
  //제품 상세에 대한 screen이여서 전 screen에서 해당 상품 ID를 매개변수로 주어야 함.!!
  const productId = props.route.params.selectedId;
  console.log(props.route.params.selectedId);
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  const dispatch = useDispatch();
  return (
    <Container>
      <HeaderBar.leftCenter
        centerTitle={selectedProduct.title}
        leadingIcon={<Icons.arrowBack />}
        leadingAction={() => {
          props.navigation.goBack();
        }}
      />
      <ProductContainer>
        <ProductImage source={{uri: selectedProduct.imageUrl}} />
        <AddButton
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}>
          <ButtonText>Add to Cart</ButtonText>
        </AddButton>
        <Price>${selectedProduct.price.toFixed(2)}</Price>
        <Description>{selectedProduct.description}</Description>
      </ProductContainer>
    </Container>
  );
};

const Container = styled.View``;
const ProductContainer = styled.View``;
const ProductImage = styled.Image`
  width: 100%;
  height: 300px;
`;
const AddButton = styled.TouchableOpacity`
  margin-vertical: 10px;
  align-self: center;
`;
const ButtonText = styled.Text`
  color: ${props => props.theme.colors.mainColor};
  font-size: 20px;
`;
const Price = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.colors.gray2};
  text-align: center;
  margin-vertical: 20px;
  font-family: ${props => props.theme.fonts.pretendFont.bold};
`;
const Description = styled.Text`
  font-size: 14px;
  text-align: center;
  margin-horizontal: 20px;
  font-family: ${props => props.theme.fonts.pretendFont.regular};
`;

export default ProductDetailScreen;
