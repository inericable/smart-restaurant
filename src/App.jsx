import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
const restaurants = [
  {
    id: 1,
    name: "The Bombay Kitchen",
    cuisine: "North Indian • Chinese",
    rating: "4.6",
    price: "₹₹",
    location: "Sion, Mumbai",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 2,
    name: "Spice Villa",
    cuisine: "Indian • Mughlai",
    rating: "4.4",
    price: "₹₹₹",
    location: "Matunga, Mumbai",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 3,
    name: "Urban Bites",
    cuisine: "Burgers • Italian",
    rating: "4.5",
    price: "₹₹",
    location: "Bandra, Mumbai",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  },
];

function Home() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span>🍴</span> Smart<span>Resto</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="/restaurants">Restaurants</a>
          <a href="/reviews">Reviews</a>
          <a href="/orders">My Orders</a>
        </div>

        <div className="nav-actions">
  {user ? (
    <>
      <span className="welcome-user">
        Hi, {user.name} 👋
      </span>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <a href="/login" className="login-btn">
        Login
      </a>

      <a href="/register" className="signup-btn">
        Sign Up
      </a>
    </>
  )}
</div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-tag">🍽️ Discover • Compare • Order</p>

          <h1>
            Find Your Perfect
            <span> Restaurant</span>
          </h1>

          <p className="hero-text">
            Discover nearby restaurants, compare dishes and prices,
            read reviews, and order your favourite food — all in one place.
          </p>

          {/* SEARCH */}
          <div className="search-box">
            <div className="search-location">
              <span>📍</span>
              <div>
                <small>Location</small>
                <p>Mumbai</p>
              </div>
            </div>

            <div className="search-divider"></div>

            <div className="search-input">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search restaurants, cuisines or dishes..."
              />
            </div>

            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="section-heading">
          <div>
            <p className="section-label">EXPLORE</p>
            <h2>What are you craving?</h2>
          </div>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">🍕</div>
            <h3>Pizza</h3>
            <p>25+ Restaurants</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🍔</div>
            <h3>Burgers</h3>
            <p>30+ Restaurants</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🍛</div>
            <h3>Indian</h3>
            <p>45+ Restaurants</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🍜</div>
            <h3>Chinese</h3>
            <p>20+ Restaurants</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🥗</div>
            <h3>Healthy</h3>
            <p>15+ Restaurants</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🍰</div>
            <h3>Desserts</h3>
            <p>18+ Restaurants</p>
          </div>
        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="restaurants" id="restaurants">
        <div className="restaurant-header">
          <div>
            <p className="section-label">NEAR YOU</p>
            <h2>Popular Restaurants</h2>
            <p className="sub-heading">
              Explore highly rated restaurants around you
            </p>
          </div>

          <button className="view-all">View All →</button>
        </div>

        <div className="restaurant-grid">
          {restaurants.map((restaurant, index) => (
            <div className="restaurant-card" key={index}>

              <div className="restaurant-image">
                <img src={restaurant.image} alt={restaurant.name} />
                <span className="veg-badge">● Pure Veg</span>
                <button className="heart">♡</button>
              </div>

              <div className="restaurant-info">
                <div className="restaurant-title">
                  <h3>{restaurant.name}</h3>
                  <span className="rating">
                    ★ {restaurant.rating}
                  </span>
                </div>

                <p className="cuisine">{restaurant.cuisine}</p>

                <div className="restaurant-details">
                  <span>📍 {restaurant.location}</span>
                  <span>{restaurant.price}</span>
                </div>

                <button className="menu-btn">
                  View Menu →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">🔎</div>
          <div>
            <h3>Discover Nearby</h3>
            <p>Find restaurants based on location and cuisine.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">💰</div>
          <div>
            <h3>Compare Prices</h3>
            <p>Compare dishes and prices before ordering.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">⭐</div>
          <div>
            <h3>Real Reviews</h3>
            <p>Read restaurant and dish-level reviews.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">🛒</div>
          <div>
            <h3>Order Online</h3>
            <p>Add dishes to your cart and place orders.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          🍴 Smart<span>Resto</span>
        </div>

        <p>
          Discover restaurants. Compare prices. Read reviews. Order food.
        </p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#restaurants">Restaurants</a>
          <a href="#reviews">Reviews</a>
          <a href="#orders">Orders</a>
        </div>

        <p className="copyright">
          © 2026 SmartResto. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/restaurants" element={<Restaurants />} />
  <Route
    path="/restaurant/:id"
    element={<RestaurantDetails />}
  />
  <Route path="/reviews" element={<Reviews />} />
  <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/order-confirmation" element={<OrderConfirmation />}/>
<Route path="/orders" element={<Orders />} />



</Routes>

    </BrowserRouter>
  );
}

export default App;