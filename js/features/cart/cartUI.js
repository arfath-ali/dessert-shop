import DOM from '../../core/dom.js';
import {
  updateQuantityDisplayUI,
  updateProductCardUI,
} from '../product/productCardUI.js';

export function renderCartItemUI(productCard) {
  const productId = productCard.dataset.productId;
  const productTitle = productCard.querySelector('.product-card__title');
  const productQuantity = productCard.querySelector('.btn__quantity');
  const productPrice = productCard.querySelector('.product-card__price');
  const totalProductPrice =
    Number(productQuantity.value) * Number(productPrice.value);
  const removeIcon = './images/icon-remove-item.svg';

  DOM.cartList.insertAdjacentHTML(
    'beforeend',
    `
        <li class="cart__list-item" data-product-id="${productId}">
          <div class="cart-item__content">
            <h3 class="cart-item__title">${productTitle.textContent}</h3>
            <div class="cart-item__pricing">
              <data class="cart-item__quantity" value="${productQuantity.value}">${productQuantity.value}x</data>
              <data class="cart-item__unit-price" value="${productPrice.value}">@ $${productPrice.value}</data>
              <data class="cart-item__total-price" value="${totalProductPrice.toFixed(2)}">$${totalProductPrice.toFixed(2)}</data>
            </div>
          </div>

          <button class="btn btn__text cart-item__remove" aria-label="Remove item">
            <img src='${removeIcon}' alt=""/>
          </button>
        </li>
        `,
  );

  updateOrderTotal();

  return;
}

export function updateCartItemUI(productCard) {
  const productId = productCard.dataset.productId;
  const productQuantity = productCard.querySelector('.btn__quantity');
  const productPrice = productCard.querySelector('.product-card__price');
  const cartListItems = DOM.cartList.querySelectorAll('.cart__list-item');

  cartListItems.forEach((item) => {
    if (item.dataset.productId === productId) {
      const cartItemQuantity = item.querySelector('.cart-item__quantity');
      const cartItemTotalPrice = item.querySelector('.cart-item__total-price');

      cartItemQuantity.textContent = `${productQuantity.value}x`;
      cartItemQuantity.value = productQuantity.value;

      const totalPrice =
        Number(productQuantity.value) * Number(productPrice.value);

      cartItemTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
      cartItemTotalPrice.value = totalPrice;
    }
  });

  updateOrderTotal();

  return;
}

export function removeCartItemUI(productId) {
  const cartListItems = DOM.cartList.querySelectorAll('.cart__list-item');

  cartListItems.forEach((item) => {
    if (item.dataset.productId === productId) {
      item.remove();
    }
  });

  updateOrderTotal();
}

export function updateCartCountUI(actionBtn, productQuantity = 1) {
  let cartCountData = Number(DOM.cartCount.value);

  if (
    actionBtn.classList.contains('product-card__btn--default') ||
    actionBtn.classList.contains('btn__increment')
  )
    cartCountData++;
  else if (actionBtn.classList.contains('btn__decrement'))
    cartCountData = Math.max(0, cartCountData - 1);
  else if (actionBtn.classList.contains('cart-item__remove'))
    cartCountData = cartCountData - productQuantity;
  else if (actionBtn.classList.contains('new-order__btn')) {
    cartCountData = 0;
  }

  if (
    actionBtn.classList.contains('product-card__btn--default') &&
    cartCountData > 0
  ) {
    DOM.cartEmpty.style.display = 'none';
    DOM.cartItems.style.display = 'block';
  }

  if (cartCountData === 0) {
    DOM.cartEmpty.style.display = 'block';
    DOM.cartItems.style.display = 'none';
  }

  DOM.cartCount.textContent = cartCountData;
  DOM.cartCount.value = cartCountData;

  return;
}

export function resetUIstates(actionBtn) {
  const orderConfirmationMessage = DOM.body.querySelector(
    '.order-confirmation-wrapper',
  );
  orderConfirmationMessage.remove();
  unlockBodyScroll();
  DOM.cartList.innerHTML = '';
  updateCartCountUI(actionBtn);
  updateOrderTotal();
  DOM.products.forEach((productCard) => {
    updateQuantityDisplayUI(actionBtn, productCard);
    updateProductCardUI(actionBtn, productCard);
  });
}

function updateOrderTotal() {
  let cartTotal = 0;

  const cartItemTotalPrices = DOM.cartList.querySelectorAll(
    '.cart-item__total-price',
  );

  cartItemTotalPrices.forEach((itemPrice) => {
    cartTotal += Number(itemPrice.value);
  });

  DOM.cartTotalOrderValue.value = cartTotal.toFixed(2);
  DOM.cartTotalOrderValue.textContent = `$${cartTotal.toFixed(2)}`;

  return;
}

function unlockBodyScroll() {
  const scrollY = document.body.dataset.scrollY;

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflowY = '';

  delete document.body.dataset.scrollY;

  window.scrollTo(0, parseInt(scrollY || '0'));
}
