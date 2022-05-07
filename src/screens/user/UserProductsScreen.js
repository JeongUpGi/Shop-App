import React, {useCallback, useEffect} from 'react';
import {View, TouchableOpacity, Alert, FlatList} from 'react-native';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import * as productsActions from '../../store/actions/Products';

import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../assets/Icons/Global/Icons';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = id => {
    Alert.alert(
      '삭제하시겠습니까?',
      '삭제 후에는 복구가 불가능 할 수 있습니다.',
      [
        {text: '아니오', style: 'default'},
        {
          text: '네',
          style: 'destructive',
          onPress: () => {
            dispatch(productsActions.deleteProduct(id));
          },
        },
      ],
    );
  };
  const editProductHandler = id => {
    props.navigation.navigate('editProduct', {productId: id});
  };

  return (
    <Container>
      <HeaderBar.leftRightCenter
        leadingLeftIcon={<Icons.menu />}
        leadingLeftAction={() => {
          props.navigation.toggleDrawer();
        }}
        centerTitle="User Products"
        leadingRightIcon={<Icons.add />}
        leadingRightAction={() => {
          editProductHandler();
        }}
      />
      <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          //data는 model 즉, item들의 기반을 따온 거고 renderItem에서 객체를 반환하면서 rendering하는 개념.
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}>
            <ButtonWrapper>
              <TouchableOpacity
                onPress={() => {
                  editProductHandler(itemData.item.id);
                }}>
                <ButtonText>Edit</ButtonText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  //deleteHandler.bind(this, itemData.item.id)도 같은 기능을 함.
                  deleteHandler(itemData.item.id);
                }}>
                <ButtonText>Delete</ButtonText>
              </TouchableOpacity>
            </ButtonWrapper>
          </ProductItem>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 50px;
`;
const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center
  padding-horizontal: 40px;
  height: 20%;
`;
const ButtonText = styled.Text`
  color: ${props => props.theme.colors.mainColor};
`;

export default UserProductsScreen;
