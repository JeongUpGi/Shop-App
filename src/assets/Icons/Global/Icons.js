import React, {Component} from 'react';
import Svg, {Defs, Path, G, Mask, Use, Text, TSpan} from 'react-native-svg';

/* ArrowBack(뒤로가기) 실행 Icon */
class ArrowBack extends Component {
  render() {
    return (
      <Svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
        <G fill="none" fillRule="evenodd">
          <Path d="M0 24h24V0H0z" />
          <Path
            stroke="#151516"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.125 6L5 12l6.125 6m-5.25-6H19"
          />
        </G>
      </Svg>
    );
  }
}

/* cart(장바구니(카트)에 담은 상품.) Icon */
class Cart extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 32 32">
        <Path
          stroke="#151516"
          d="M1 2.4c0 .2 1.6.6 3.5.8 1.9.2 3.5 0 3.5-.4S6.4 2 4.5 2 1 2.2 1 2.4zM8.2 7c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3zM13.5 9.6c7 .8 17.3.8 16.8.1-.2-.4-4.8-.6-10.1-.5-5.3 0-8.3.3-6.7.4zM9.2 12c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3zM29.1 13.2c-.1 1-.5 1.8-1.1 1.8-.5 0-.7.7-.3 1.7.5 1.4.8 1.2 1.5-.7.5-1.3.7-2.8.4-3.4-.2-.6-.5-.3-.5.6zM10.2 17c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3zM24 20l-3.5.7 3.2.2c1.7 0 3.5-.4 3.8-.9.3-.6.5-.9.3-.9-.2.1-1.9.5-3.8.9zM4.8 20.7c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5-1.4 0-1.9.2-1.2.5zM10.4 22.3c-.4 1.3-.1 2.5 1 3.2.8.7 1.3 1.5.9 1.9-.4.4 0 .4 1 0 .9-.3 1.7-.1 1.7.4 0 .6-1.9 1.3-4.2 1.5l-4.3.4 4.5-.1c3.6-.1 4.5-.4 4.4-1.9-.1-1.3.6-1.7 3.6-1.7s3.7.4 3.6 1.7c0 1 .6 1.8 1.4 1.8.8 0 1.5-.7 1.5-1.5s.5-1.8 1-2.2c.6-.4-2.7-.8-7.2-.8-6.5 0-8.3-.3-8.3-1.4 0-.9 1.2-1.6 3.3-1.8l3.2-.3-3.2-.6c-2.7-.4-3.4-.2-3.9 1.4zM25 28c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zM2.8 23.7c1.2.2 3.2.2 4.5 0 1.2-.2.2-.4-2.3-.4s-3.5.2-2.2.4z"
        />
      </Svg>
    );
  }
}

/* item Remove Icon */
class Trash extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 50 50">
        <Path
          stroke="#e21a3a"
          d="M18.7.6c-.4.4-.7 1.6-.7 2.6 0 1.5-.8 1.8-5.5 1.8C7.7 5 5.1 6.2 8 7.2c.6.2 1.9 9.4 2.9 20.5 1.1 11.1 2.2 20.7 2.6 21.2.8 1.5 22.2 1.5 23 0 .4-.5 1.5-10.1 2.6-21.2 1-11.1 2.3-20.3 2.9-20.5 2.8-1 .4-2.2-4.4-2.2-4.9 0-5.5-.2-5.8-2.3-.3-2-.9-2.2-6.3-2.5-3.4-.2-6.4 0-6.8.4zM30 3.5C30 4.6 28.8 5 25 5s-5-.4-5-1.5S21.2 2 25 2s5 .4 5 1.5zm8.6 8.2c-.3 2.7-1 10.4-1.6 17.3-.6 6.9-1.3 14-1.6 15.7l-.5 3.3H15.1l-.5-3.2c-.3-1.8-1-8.9-1.6-15.8-.6-6.9-1.3-14.6-1.6-17.3L10.8 7h28.4l-.6 4.7z"
        />
        <Path
          stroke="#e21a3a"
          d="M18 27.5c0 11 .4 17.5 1 17.5s1-6.5 1-17.5S19.6 10 19 10s-1 6.5-1 17.5zM24 27.5c0 11 .4 17.5 1 17.5s1-6.5 1-17.5S25.6 10 25 10s-1 6.5-1 17.5zM30 27.5c0 11 .4 17.5 1 17.5s1-6.5 1-17.5S31.6 10 31 10s-1 6.5-1 17.5z"
        />
      </Svg>
    );
  }
}

/* Nav Menu Icon */
class Menu extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 30 30">
        <Path
          stroke="#151516"
          d="M2 8c0 .6 5 1 13 1s13-.4 13-1-5-1-13-1S2 7.4 2 8zM2 15c0 .6 5 1 13 1s13-.4 13-1-5-1-13-1-13 .4-13 1zM2 22c0 .6 5 1 13 1s13-.4 13-1-5-1-13-1-13 .4-13 1z"
        />
      </Svg>
    );
  }
}

class Add extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 30 30">
        <Path
          stroke="#151516"
          d="M10.5 3.9c-4.5 2-7 6-7 11.2 0 4.2.5 5.3 3.3 8.1s3.9 3.3 8.2 3.3c4.3 0 5.4-.5 8.2-3.3 2.8-2.8 3.3-3.9 3.3-8.2 0-4.2-.5-5.4-3.1-8.1-3.3-3.3-9.2-4.6-12.9-3zm5.5 7.6c0 2 .5 2.5 2.5 2.5 1.4 0 2.5.4 2.5 1 0 .5-1.1 1-2.5 1-2 0-2.5.5-2.5 2.5 0 1.4-.4 2.5-1 2.5-.5 0-1-1.1-1-2.5 0-2-.5-2.5-2.5-2.5-1.4 0-2.5-.5-2.5-1 0-.6 1.1-1 2.5-1 2 0 2.5-.5 2.5-2.5 0-1.4.5-2.5 1-2.5.6 0 1 1.1 1 2.5z"
        />
      </Svg>
    );
  }
}

class Save extends Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 30 30">
        <Path
          stroke="#151516"
          d="M4.4 5.3c-.3.8-.3 5.6-.2 10.8l.3 9.4h21l.3-8.9c.2-7.2 0-9.2-1.4-10.7-2.7-3-4.4-2.4-4.4 1.6V11H9V7.5C9 4.6 8.6 4 7 4c-1.1 0-2.3.6-2.6 1.3zm17.4 14.9.3 3.8H8v-3.3c0-1.9.3-3.7.7-4.1.4-.4 3.4-.6 6.8-.4l6 .3.3 3.7z"
        />
        <Path
          stroke="#151516"
          d="M16 6.5c0 1.4.5 2.5 1 2.5.6 0 1-1.1 1-2.5S17.6 4 17 4c-.5 0-1 1.1-1 2.5z"
        />
      </Svg>
    );
  }
}

export default Icons = {
  arrowBack: ArrowBack,
  cart: Cart,
  trash: Trash,
  menu: Menu,
  add: Add,
  save: Save,
};
