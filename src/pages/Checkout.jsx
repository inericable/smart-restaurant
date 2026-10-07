import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const cartItems = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const placeOrder = () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    const order = {
      id: "ORD" + Date.now(),
      items: cartItems,
      address,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
      status: "Order Placed",
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "latestOrder",
      JSON.stringify(order)
    );

    localStorage.removeItem("cart");

    navigate("/order-confirmation");
  };

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order details before placing your order.</p>
      </div>

      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-form">

          <div className="checkout-section">
            <h2>📍 Delivery Address</h2>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete delivery address"
            />
          </div>

          <div className="checkout-section">
            <h2>💳 Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                value="Cash on Delivery"
                checked={
                  paymentMethod === "Cash on Delivery"
                }
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              <span>UPI</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                value="Credit/Debit Card"
                checked={
                  paymentMethod === "Credit/Debit Card"
                }
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />
              <span>Credit / Debit Card</span>
            </label>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-summary">

          <h2>🛒 Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="empty-checkout">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <div>
                  <span>{item.name}</span>
                  <small>
                    × {item.quantity || 1}
                  </small>
                </div>

                <strong>
                  ₹
                  {Number(item.price) *
                    Number(item.quantity || 1)}
                </strong>
              </div>
            ))
          )}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <button
            className="place-order-btn"
            onClick={placeOrder}
            disabled={cartItems.length === 0}
          >
            Place Order
          </button>

          <button
            className="back-cart-btn"
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;