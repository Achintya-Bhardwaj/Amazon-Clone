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
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
  
    return deliveryOption;
}