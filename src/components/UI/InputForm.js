import React, {useReducer, useEffect} from 'react';
import {Text, View} from 'react-native';

import styled from 'styled-components';

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

// 개별 inputForm을 관리하기 위한 컴포넌트.
const InputForm = props => {
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
  });

  const {onInputChange, id} = props;

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatchInputState({type: INPUT_CHANGE, value: text, isValid: isValid});
  };

  return (
    <FormWrapper>
      <FormTitle>{props.label}</FormTitle>
      <FormInput
        {...props}
        value={inputState.value}
        onChangeText={textChangeHandler}
      />
      {!inputState.isValid ? <ErrorText>{props.errorText}</ErrorText> : null}
    </FormWrapper>
  );
};

const FormWrapper = styled.View`
  width: 100%;
`;
const FormTitle = styled.Text`
  margin-vertical: 8px;
  font-family: ${props => props.theme.fonts.pretendFont.bold};
  color: ${props => props.theme.colors.black};
`;
const FormInput = styled.TextInput`
  padding-horizontal: 2px;
  padding-vertical: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.gray5};
  color: ${props => props.theme.colors.black};
`;
const ErrorText = styled.Text`
  font-size: 13px;
  color: red;
  font-family: ${props => props.theme.fonts.pretendFont.regular};
`;

export default InputForm;
