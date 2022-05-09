import React, {useState, useCallback, useEffect, useReducer} from 'react';
import {Text, Alert, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as productActions from '../../store/actions/Products';

import HeaderBar from '../../components/Global/HeaderBar';
import styled from 'styled-components';
import Icons from '../../assets/Icons/Global/Icons';

import InputForm from '../../components/UI/InputForm';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

const spinnerColor = 'rgb(136,95,255)';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
// store/reducers에서 사용하는 폴더와 같은 구조.
const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      //action(dispatch)에 의해 동적으로 행동하게 됨.
      [action.input]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    //각 객체에 대한 유효성 검사.
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    //기존 초기배열을 action을 통해 동적으로 바꾸는 것이 최종목표임.
    return {
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const prodId = props.route.params.productId;
  const editedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.id === prodId),
  );
  // useReducer를 쓰는이유 -> useState로 관리하기에는 변수가 많은 상태일 때
  // const [state, dispatch] = useReducer(reducer이름, 관리하려는 초기상태) -> 관리하려는 상태가 배열이기에 배열 변수로 설정.
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      price: editedProduct ? Number(editedProduct.price) : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      price: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const inputChangeHandler = useCallback(
    //inputIdentifier는 props.id를 뜻하고
    //inputValue는 InputForm에서 념거준 inputState.value를 뜻함.
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('오류가 발생했습니다.', error, [{text: '확인'}]);
    }
  }, [error]);

  //useCallback은 최초 실행 후 deps(의존성)에 있는 배열이 변경되지 않는 한 리렌더링이되도 함수 호출이 일어나지 않음.
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('잘못된 입력입니다', '입력란을 다시 확인해주세요.', [
        {
          text: 'Okay',
        },
      ]);
    } else {
      setError(null);
      setIsLoading(true);
      try {
        if (editedProduct) {
          await dispatch(
            productActions.updateProduct(
              prodId,
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              Number(formState.inputValues.price),
            ),
          );
        } else {
          // ADD_PRODUCT는 애초에 reducer에서 id를 new Date.toString()으로 고정했기에 따로 값을 안줘도 됨.
          await dispatch(
            productActions.addProduct(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              Number(formState.inputValues.price),
            ),
          );
        }
        props.navigation.goBack();
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    }
  }, [dispatch, prodId, formState]);

  if (isLoading) {
    return (
      <LoadingView>
        <ActivityIndicator size="large" color={spinnerColor} />
      </LoadingView>
    );
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <HeaderBar.leftRightCenter
        leadingLeftIcon={<Icons.arrowBack />}
        leadingLeftAction={() => {
          props.navigation.goBack();
        }}
        centerTitle={editedProduct ? 'Edit Product' : 'Add Product'}
        leadingRightIcon={<Icons.save />}
        leadingRightAction={submitHandler}
      />
      <ScrollContainer>
        <FormContainer>
          <InputForm
            id="title"
            label="Title"
            errorText="올바른 제목을 입력해주세요"
            keyboardType="default"
            required
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={editedProduct ? true : true}
          />
          <InputForm
            id="imageUrl"
            label="Image Url"
            errorText="올바른 주소를 입력해주세요"
            keyboardType="default"
            required
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={editedProduct ? true : true}
          />
          <InputForm
            id="price"
            label="Price"
            errorText="올바른 가격을 입력해주세요"
            keyboardType="decimal-pad"
            required
            min={0.1}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.price.toString() : ''}
            initiallyValid={editedProduct ? true : true}
          />
          <InputForm
            id="description"
            label="Description"
            errorText="올바른 설명을 입력해주세요"
            keyboardType="default"
            multiLine={true}
            required
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={editedProduct ? true : true}
          />
        </FormContainer>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ScrollContainer = styled.ScrollView``;
const FormContainer = styled.View`
  margin: 20px;
`;

export default EditProductScreen;
