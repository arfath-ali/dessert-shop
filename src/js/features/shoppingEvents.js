import DOM from '../core/dom.js';
import { updateQuantityDisplayUI } from './product/productCardUI.js';
import { orderConfirmation } from './order/orderConfirmationUI.js';
import { resetUIstates } from './cart/cartUI.js';

export function initShoppingEvents() {
  document.addEventListener('click', handleClick);
}

function handleClick(e) {
  const actionBtn = e.target.closest('.btn');
  if (!actionBtn) return;

  const productMedia = actionBtn.closest('.product-card__media');
  const removeBtn = actionBtn.closest('.cart-item__remove');
  const confirmBtn = actionBtn.closest('.cart__confirm-btn');
  const newOrderBtn = actionBtn.closest('.new-order__btn');

  if (productMedia) {
    const productCard = productMedia.closest('.product-card');

    const defaultBtn = e.target.closest('.product-card__btn--default');
    const incrementBtn = e.target.closest('.btn__increment');
    const decrementBtn = e.target.closest('.btn__decrement');

    if (defaultBtn) handleDefaultBtn(defaultBtn, productCard);
    if (incrementBtn) handleIncrementBtn(incrementBtn, productCard);
    if (decrementBtn) handleDecrementBtn(decrementBtn, productCard);
  }

  if (confirmBtn) {
    handleConfirmBtn();
  }

  if (removeBtn) {
    handleRemoveBtn(removeBtn);
  }

  if (newOrderBtn) {
    handleNewOrderBtn(newOrderBtn);
  }

  function handleDefaultBtn(defaultBtn, productCard) {
    updateQuantityDisplayUI(defaultBtn, productCard);
    return;
  }

  function handleIncrementBtn(incrementBtn, productCard) {
    updateQuantityDisplayUI(incrementBtn, productCard);
    return;
  }

  function handleDecrementBtn(decrementBtn, productCard) {
    updateQuantityDisplayUI(decrementBtn, productCard);
    return;
  }

  function handleRemoveBtn(removeBtn) {
    const productId = removeBtn.closest('.cart__list-item').dataset.productId;

    DOM.products.forEach((productCard) => {
      if (productCard.dataset.productId === productId) {
        updateQuantityDisplayUI(removeBtn, productCard);
      }
    });
    return;
  }

  function handleConfirmBtn() {
    orderConfirmation();
    return;
  }

  function handleNewOrderBtn(newOrderBtn) {
    resetUIstates(newOrderBtn);
  }
}
