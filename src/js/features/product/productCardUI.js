import {
  renderCartItemUI,
  updateCartItemUI,
  removeCartItemUI,
  updateCartCountUI,
} from '../cart/cartUI.js';

export function updateQuantityDisplayUI(actionBtn, productCard) {
  const productQuantity = productCard.querySelector('.btn__quantity');
  let quantity = Number(productQuantity.value);
  const MAX_QUANTITY = 20;

  if (actionBtn.classList.contains('product-card__btn--default')) {
    if (quantity < MAX_QUANTITY) {
      quantity++;
      syncQuantityUI();
      updateProductCardUI(actionBtn, productCard);
      updateCartCountUI(actionBtn);
      renderCartItemUI(productCard);
    }
  } else if (actionBtn.classList.contains('btn__increment')) {
    if (quantity < MAX_QUANTITY) {
      quantity++;
      syncQuantityUI();
      updateCartCountUI(actionBtn);
      updateCartItemUI(productCard);
    }
  } else if (actionBtn.classList.contains('btn__decrement')) {
    quantity--;
    syncQuantityUI();

    if (quantity < 1) {
      updateProductCardUI(actionBtn, productCard);
      removeCartItemUI(productCard.dataset.productId);
    }
    updateCartCountUI(actionBtn);
    updateCartItemUI(productCard);
  } else if (actionBtn.classList.contains('cart-item__remove')) {
    quantity = 0;
    removeCartItemUI(productCard.dataset.productId);
    updateProductCardUI(actionBtn, productCard);
    updateCartCountUI(actionBtn, Number(productQuantity.value));
    syncQuantityUI();
  } else if (actionBtn.classList.contains('new-order__btn')) {
    quantity = 0;
    syncQuantityUI();
  }

  function syncQuantityUI() {
    productQuantity.textContent = quantity;
    productQuantity.value = quantity;
  }
  return;
}

export function updateProductCardUI(actionBtn, productCard) {
  const defaultBtn = productCard.querySelector('.product-card__btn--default');
  const productMedia = productCard.querySelector('.product-card__media');
  const productQuantityBtn = productCard.querySelector(
    '.product-card__btn--quantity',
  );

  if (actionBtn.classList.contains('product-card__btn--default')) {
    productMedia.style.borderRadius = '10px';
    productMedia.style.borderColor = 'var(--red)';

    defaultBtn.style.display = 'none';
    productQuantityBtn.style.display = 'flex';
  } else if (
    actionBtn.classList.contains('btn__decrement') ||
    actionBtn.classList.contains('cart-item__remove') ||
    actionBtn.classList.contains('new-order__btn')
  ) {
    productMedia.style.borderRadius = '';
    productMedia.style.border = '';

    productQuantityBtn.style.display = 'none';
    defaultBtn.style.display = 'flex';
  }

  return;
}
