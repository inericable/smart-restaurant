import { useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const order = JSON.parse(
    localStorage.getItem("latestOrder")
  );

  if (!order) {
    return (
      <div className="orders-page">
        <div className="no-orders">
          <div className="no-orders-icon">🛒</div>

          <h1>No Orders Yet</h1>

          <p>
            You haven't placed any orders yet.
            Start exploring restaurants and order
            something delicious!
          </p>

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
    <div className="orders-page">

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>View your recent SmartResto order.</p>
      </div>

      <div className="order-card">

        <div className="order-card-header">

          <div>
            <span className="order-label">
              ORDER ID
            </span>

            <h2>{order.id}</h2>
          </div>

          <span className="order-status">
            ✓ {order.status}
          </span>

        </div>

        <div className="order-date">
          Placed on {order.date}
        </div>

        <div className="order-divider"></div>

        <h3>Order Items</h3>

        <div className="order-items">

          {order.items.map((item) => (
            <div
              className="order-item"
              key={item.id}
            >
              <div>
                <strong>{item.name}</strong>

                <span>
                  × {item.quantity || 1}
                </span>
              </div>

              <strong>
                ₹
                {item.price *
                  (item.quantity || 1)}
              </strong>
            </div>
          ))}

        </div>

        <div className="order-divider"></div>

        <div className="order-info">

          <div>
            <span>📍 Delivery Address</span>
            <p>{order.address}</p>
          </div>

          <div>
            <span>💳 Payment Method</span>
            <p>{order.paymentMethod}</p>
          </div>

        </div>

        <div className="order-total">

          <span>Total Amount</span>

          <strong>₹{order.total}</strong>

        </div>

      </div>

      <button
        className="continue-shopping"
        onClick={() => navigate("/restaurants")}
      >
        ← Continue Shopping
      </button>

    </div>
  );
}

export default Orders;