import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import styled from 'styled-components';

import * as cartActions from '../../store/actions/Cart';
import * as productsActions from '../../store/actions/Products';

import HeaderBar from '../../components/Global/HeaderBar';
import Icons from '../../assets/Icons/Global/Icons';
import ProductItem from '../../components/shop/ProductItem';

const spinnerColor = 'rgb(136,95,255)';
const ProductsOverViewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); //FlatList는 scroll이 가능 -> 현재 화면에서의 새로고침을 의미.
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  //useSelector로 store 폴더 reducers에 저장한 상품들을 가져옴. -- redux를 사용하기 위함.
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); // navigation간의 화면 호출에 있어 재호출이 안됨. -> useIsFocused()로 해결.
  //useIsFocused()는 화면의 초첨을 해제할 때 구성 요소가 재렌더링 될 수 있도록 함.

  const loadProducts = useCallback(async () => {
    if (isFocused) {
      setError(null);
      setIsRefreshing(true);
      try {
        await dispatch(productsActions.setProducts());
        console.log('LOAD PRODUCTS');
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
      setIsRefreshing(false);
    }
  }, [isFocused, dispatch, setIsLoading, setError]);

  //상품 개요 화면에서 프로젝트를 최신으로 갱신하는 행위를 useEffect로 하면서 갱신이 필요할 때만 호출.
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  //다음 screen에 선택된 상품의 id, title을 줄 수 있는 함수.
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('productDetail', {
      selectedId: id,
      selectedTitle: title,
    });
  };
  if (error) {
    return (
      <LoadingView>
        <Text>오류가 발생했습니다!</Text>
        <ErrorButton onPress={loadProducts}>
          <ErrorText>재시도</ErrorText>
        </ErrorButton>
      </LoadingView>
    );
  }

  // 새제품이 로딩되는 동안 로딩중임을 나타내기 위한 view
  if (isLoading) {
    return (
      <LoadingView>
        <ActivityIndicator size="large" color={spinnerColor} />
      </LoadingView>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <Container>
        <HeaderBar.leftRightCenter
          leadingLeftIcon={<Icons.menu />}
          leadingLeftAction={() => {
            props.navigation.toggleDrawer();
          }}
          centerTitle="All Products"
          leadingRightIcon={<Icons.cart />}
          leadingRightAction={() => {
            props.navigation.navigate('cart');
          }}
        />
        <AlertView>
          <Text>상품을 찾을 수 없습니다. 상품을 추가해주세요!</Text>
        </AlertView>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderBar.leftRightCenter
        leadingLeftIcon={<Icons.menu />}
        leadingLeftAction={() => {
          props.navigation.toggleDrawer();
        }}
        centerTitle="All Products"
        leadingRightIcon={<Icons.cart />}
        leadingRightAction={() => {
          props.navigation.navigate('cart');
        }}
      />
      {/* FlatList의 renderItem은 data로 받은 것들 각각의 item을 render시켜주는 콜백 함수 */}
      {/* 여기에서 data는 useSelector로 가져온 product들 --> reducer폴더에서 dummy-data로 가져온 상품들. */}
      {/* 즉 renderItem으로 콜백한 itemData는 각각의 상품을 의미. */}
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}>
            <ButtonWrapper>
              <TouchableOpacity
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }}>
                <ButtonText>View Details</ButtonText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                }}>
                <ButtonText>To Cart</ButtonText>
              </TouchableOpacity>
            </ButtonWrapper>
          </ProductItem>
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
const AlertView = styled.View`
  flex: 90%;
  justify-content: center;
  align-items: center;
`;
const Container = styled.View`
  flex: 1;
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
const ErrorButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100px;
  background-color: ${props => props.theme.colors.mainColor};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const ErrorText = styled.Text`
  font-size: 20px;
`;

export default ProductsOverViewScreen;
