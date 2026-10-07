import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const navigate = useNavigate();

  const order = JSON.parse(
    localStorage.getItem("latestOrder")
  );

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="no-order">
          <h1>No Order Found</h1>
          <p>We couldn't find a recent order.</p>

          <button
            onClick={() => navigate("/restaurants")}
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">

      <div className="confirmation-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="confirmation-message">
          Thank you for ordering with SmartResto.
        </p>

        <div className="order-id">
          Order ID: <strong>{order.id}</strong>
        </div>

        <div className="confirmation-details">

          <div className="details-section">
            <h2>🛒 Order Details</h2>

            {order.items.map((item) => (
              <div
                className="confirmation-item"
                key={item.id}
              >
                <span>
                  {item.name} × {item.quantity || 1}
                </span>

                <strong>
                  ₹
                  {item.price *
                    (item.quantity || 1)}
                </strong>
              </div>
            ))}
          </div>

          <div className="details-section">
            <h2>📍 Delivery Address</h2>

            <p>{order.address}</p>
          </div>

          <div className="details-section">
            <h2>💳 Payment Method</h2>

            <p>{order.paymentMethod}</p>
          </div>

          <div className="total-section">
            <span>Total Amount</span>

            <strong>₹{order.total}</strong>
          </div>

          <div className="status-section">
            <span>Order Status</span>

            <strong>{order.status}</strong>
          </div>

        </div>

        <div className="confirmation-actions">

          <button
            className="orders-btn"
            onClick={() => navigate("/orders")}
          >
            View My Orders
          </button>

          <button
            className="shopping-btn"
            onClick={() => navigate("/restaurants")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderConfirmation;