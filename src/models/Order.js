import moment from 'moment/locale/ko';

class Order {
  constructor(id, items, totalPrice, date) {
    this.id = id;
    this.items = items;
    this.totalPrice = totalPrice;
    this.date = dateToStr(date);
  }
}

//moment라이브러리를 사용하면 편하지만 한글용 포맷을 위해 직접 함수 설정
//달러는 영어, 주문시각은 한글로 되어 있음. clone coding이라 패스.
function dateToStr(date) {
  var week = new Array('일', '월', '화', '수', '목', '금', '토');

  var localTime = date.toLocaleTimeString();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var dayName = week[date.getDay()];

  return (
    year +
    '년 ' +
    month +
    '월 ' +
    day +
    '일 ' +
    dayName +
    '요일 ' +
    localTime.substring(0, 5)
  );
}

export default Order;
