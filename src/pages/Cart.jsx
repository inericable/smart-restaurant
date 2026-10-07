import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
);

const navigate = useNavigate();

  const increaseQuantity = (id) => {
  const updatedCart = cartItems.map((item) =>
    item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  setCartItems(updatedCart);
  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
};

  const decreaseQuantity = (id) => {
  const updatedCart = cartItems
    .map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCartItems(updatedCart);
  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
};

  const removeItem = (id) => {
  const updatedCart = cartItems.filter(
    (item) => item.id !== id
  );

  setCartItems(updatedCart);
  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
};

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your items before placing your order.</p>
      </div>

      <div className="cart-container">

        <div className="cart-items">

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>🛒 Your cart is empty</h2>
              <p>Add some delicious food to continue.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                <div className="item-info">
                  <h3>{item.name}</h3>

                  <p>{item.restaurant}</p>

                  <span>₹{item.price} each</span>
                </div>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <div className="item-total">
                  ₹{item.price * item.quantity}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>

              </div>
            ))
          )}

        </div>

        {cartItems.length > 0 && (
          <div className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

              <button className="checkout-btn" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;