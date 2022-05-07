import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

const ProductItem = props => {
  return (
    <Wrapper activeOpacity={0.8} onPress={props.onSelect}>
      <ProductWrapper>
        <ImageContainer>
          <ProductImage source={{uri: props.image}} />
        </ImageContainer>
        <TextWrapper>
          <Title>{props.title}</Title>
          <Price>${props.price.toFixed(2)}</Price>
        </TextWrapper>
        {/* props.children을 통해 props통한 screen에 그냥 자식 요소를 받을 수 있음.
        단, ProductItem 컴포넌트는 <Product> </Product>로 사용해야 사이에 자식 컴포넌트 넣기가 당연히 가능. */}
        {props.children}
      </ProductWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity``;
const ProductWrapper = styled.View`
  shadow-color: black;
  shadow-opacity: 0.26;
  shadow-radius: 8px;
  elevation: 5;
  border-radius: 10px;
  background-color: white;
  height: 300px;
  margin: 20px;
`;
const ImageContainer = styled.View`
  width: 100%;
  height: 60%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;
const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const TextWrapper = styled.View`
  align-items: center;
  height: 20%;
  padding: 10px;
`;
const Title = styled.Text`
  font-size: 18px;
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  margin-vertical: 4px;
`;
const Price = styled.Text`
  font-size: 14px;
  font-family: ${props => props.theme.fonts.pretendFont.regular};
  color: ${props => props.theme.colors.gray4};
`;

export default ProductItem;
