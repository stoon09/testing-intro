function assertValidQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом');
  }
}

function assertInStock(quantity, stock) {
  if (quantity > stock) {
    throw new RangeError(`Нельзя выбрать больше, чем есть на складе (${stock})`);
  }
}

function addToCart(cart, product, quantity = 1) {
  assertValidQuantity(quantity);

  const existing = cart.find((item) => item.id === product.id);
  const newQuantity = (existing ? existing.quantity : 0) + quantity;
  assertInStock(newQuantity, product.stock);

  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }
  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  assertValidQuantity(quantity);

  const existing = cart.find((item) => item.id === productId);
  if (!existing) return [...cart];
  assertInStock(quantity, existing.stock);

  return cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;