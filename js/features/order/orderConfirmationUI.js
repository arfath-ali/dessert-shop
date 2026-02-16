import DOM from '../../core/dom.js';

export function orderConfirmation() {
  const cartList = DOM.cartList;
  const orderConfirmationIcon = './images/icon-order-confirmed.svg';
  const totalOrderValue = DOM.cartTotalOrderValue.value;
  window.scrollTo(0, 0);

  delete document.body.dataset.scrollY;

  lockBodyScroll();

  DOM.body.insertAdjacentHTML(
    'beforeend',
    `<div class="order-confirmation-wrapper">
      <div class="order-confirmation">
        <img src='${orderConfirmationIcon}'/>
        <h2>Order Confirmed</h2>
        <p class="order-confirmation__note">We hope you enjoy your food!</p>
        <div>
        <ul class="order-confirmation__list"></ul>
        <div class="order-confirmation__order-total-block">
        <p class="order-confirmation__order-total-label">Order Total</p>
        <data value=${totalOrderValue} class="order-confirmation__order-total">$${totalOrderValue}</data>
        </div>
        </div>
        <button class="btn btn__text new-order__btn">Start New Order</button>
      </div>
    </div>`,
  );

  const confirmationList = document.querySelector('.order-confirmation__list');

  cartList.querySelectorAll('.cart__list-item').forEach((item) => {
    const productTitle = item.querySelector('.cart-item__title').textContent;
    const productImage = item.dataset.productId;
    const productQuantity = item.querySelector('.cart-item__quantity').value;
    const productPrice = item.querySelector('.cart-item__unit-price').value;
    const totalProductPrice = item.querySelector(
      '.cart-item__total-price',
    ).value;

    confirmationList.insertAdjacentHTML(
      'beforeend',
      `<li class="confirmation-list__item">
        <div class="confirmation-list__item-content">
          <img src='./images/image-${productImage}-thumbnail.jpg' class="confirmation-list__item-image"/>
          <div class="confirmation-list__item-info">
            <h3 class="confirmation-list__item-title"> ${productTitle}</h3>
              <div class="confirmation-list__pricing">
                <data value='${productQuantity}' class="confirmation-list__item-quantity">${productQuantity}x</data>
                <data value='${productPrice}' class="confirmation-list__item-price">@$${productPrice}</data>
              </div>
          </div>
        </div>
      <data value='${totalProductPrice}' class="confirmation-list__item-total"> $${totalProductPrice}</data>
    </li>
    `,
    );
  });
}

function lockBodyScroll() {
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflowY = 'scroll';
}


