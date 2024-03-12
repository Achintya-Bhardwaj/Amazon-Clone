import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: 1,
  deliveryDays: 7,
  priceInCents: 0
}, {
  id: 2,
  deliveryDays: 3,
  priceInCents: 499
}, {
  id: 3,
  deliveryDays: 1,
  priceInCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {

  let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === Number(deliveryOptionId)) {
        deliveryOption = option;
      }
    });
    
    return deliveryOption;
}

export function getDeliveryDate(deliveryOption){
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateFormat = deliveryDate.format('dddd, MMMM D');
  return dateFormat;
}