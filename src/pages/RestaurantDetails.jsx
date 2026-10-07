import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RestaurantDetails.css";

const restaurants = {
  1: {
    name: "The Bombay Kitchen",
    description:
      "Authentic Indian cuisine with delicious North Indian and Mughlai dishes.",
    rating: "4.6",
    reviews: 248,
    cuisine: "North Indian • Mughlai",
    location: "Sion, Mumbai",
    price: "₹₹ Moderate",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  },

  2: {
    name: "Spice Villa",
    description:
      "Aromatic Indian and Mughlai dishes prepared with traditional spices and fresh ingredients.",
    rating: "4.4",
    reviews: 186,
    cuisine: "Indian • Mughlai",
    location: "Matunga, Mumbai",
    price: "₹₹₹ Premium",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
  },

  3: {
    name: "Urban Bites",
    description:
      "Modern comfort food featuring delicious burgers, Italian favourites and refreshing drinks.",
    rating: "4.5",
    reviews: 214,
    cuisine: "Burgers • Italian",
    location: "Bandra, Mumbai",
    price: "₹₹ Moderate",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80",
  },
};

const menuItems = {
  1: [
    {
      id: 1,
      name: "Paneer Tikka",
      category: "Starters",
      description:
        "Grilled cottage cheese with Indian spices.",
      price: 220,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Butter Chicken",
      category: "Main Course",
      description:
        "Creamy tomato-based chicken curry.",
      price: 320,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Veg Biryani",
      category: "Rice",
      description:
        "Fragrant basmati rice with vegetables and spices.",
      price: 180,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Chicken Biryani",
      category: "Rice",
      description:
        "Aromatic basmati rice cooked with spiced chicken.",
      price: 260,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Garlic Naan",
      category: "Breads",
      description:
        "Soft naan topped with garlic and butter.",
      price: 70,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      name: "Gulab Jamun",
      category: "Desserts",
      description:
        "Soft milk-solid dumplings served in sugar syrup.",
      price: 100,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1666190094760-4b1f3e2b4c1a?auto=format&fit=crop&w=500&q=80",
    },
  ],

  2: [
    {
      id: 1,
      name: "Chicken Seekh Kebab",
      category: "Starters",
      description:
        "Juicy minced chicken kebabs cooked with aromatic spices.",
      price: 280,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Mughlai Chicken",
      category: "Main Course",
      description:
        "Rich and creamy Mughlai chicken curry.",
      price: 340,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Mutton Biryani",
      category: "Rice",
      description:
        "Fragrant basmati rice layered with tender spiced mutton.",
      price: 380,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Chicken Tikka",
      category: "Starters",
      description:
        "Tender chicken pieces marinated with Indian spices.",
      price: 300,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Butter Naan",
      category: "Breads",
      description:
        "Soft tandoori naan brushed with butter.",
      price: 60,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      name: "Rasmalai",
      category: "Desserts",
      description:
        "Soft cottage cheese dumplings in creamy saffron milk.",
      price: 130,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=500&q=80",
    },
  ],

  3: [
    {
      id: 1,
      name: "Classic Cheeseburger",
      category: "Burgers",
      description:
        "Juicy grilled patty with cheese, lettuce and special sauce.",
      price: 240,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Chicken Burger",
      category: "Burgers",
      description:
        "Crispy chicken patty with fresh vegetables and sauce.",
      price: 260,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Margherita Pizza",
      category: "Italian",
      description:
        "Classic pizza topped with tomato, mozzarella and basil.",
      price: 320,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Pasta Alfredo",
      category: "Italian",
      description:
        "Creamy Alfredo pasta with herbs and parmesan.",
      price: 280,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "French Fries",
      category: "Sides",
      description:
        "Crispy golden fries served with a dipping sauce.",
      price: 120,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      name: "Chocolate Shake",
      category: "Drinks",
      description:
        "Rich chocolate milkshake topped with whipped cream.",
      price: 160,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80",
    },
  ],
};

function RestaurantDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const restaurant = restaurants[id] || restaurants[1];
  const restaurantMenu = menuItems[id] || menuItems[1];

  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const categories = [
    "All",
    ...new Set(
      restaurantMenu.map((item) => item.category)
    ),
  ];

  let displayedItems = restaurantMenu.filter(
    (item) =>
      selectedCategory === "All" ||
      item.category === selectedCategory
  );

  if (sortOrder === "low") {
    displayedItems.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOrder === "high") {
    displayedItems.sort(
      (a, b) => b.price - a.price
    );
  }

  const addToCart = (item) => {
    /*
      Include restaurant ID in the cart item ID.
      This prevents dishes from different restaurants
      being treated as the same item.
    */

    const cartItemId = `${id}-${item.id}`;

    const existingItem = cart.find(
      (cartItem) => cartItem.cartItemId === cartItemId
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.cartItemId === cartItemId
          ? {
              ...cartItem,
              quantity:
                (cartItem.quantity || 1) + 1,
            }
          : cartItem
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...item,
          cartItemId,
          restaurantId: id,
          restaurant: restaurant.name,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <div className="details-page">

      {/* RESTAURANT HERO */}

      <section className="restaurant-hero">

        <div className="restaurant-cover">
          <img
            src={restaurant.image}
            alt={restaurant.name}
          />
        </div>

        <div className="restaurant-profile">

          <div>
            <span className="open-status">
              ● Open Now
            </span>

            <h1>{restaurant.name}</h1>

            <p className="restaurant-description">
              {restaurant.description}
            </p>

            <div className="restaurant-meta">

              <span>
                ⭐ {restaurant.rating} (
                {restaurant.reviews} Reviews)
              </span>

              <span>
                🍽️ {restaurant.cuisine}
              </span>

              <span>
                📍 {restaurant.location}
              </span>

              <span>
                {restaurant.price}
              </span>

            </div>
          </div>

          <button className="favorite-restaurant">
            ♡ Add to Favorites
          </button>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <div className="details-container">

        {/* MENU HEADER */}

        <div className="menu-header">

          <div>
            <p className="section-label">
              OUR MENU
            </p>

            <h2>Explore the Menu</h2>
          </div>

          <div className="menu-controls">

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
            >
              <option value="default">
                Sort by Price
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>
            </select>

          </div>

        </div>

        {/* CATEGORIES */}

        <div className="menu-categories">

          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-active"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}

        </div>

        {/* MENU GRID */}

        <div className="menu-grid">

          {displayedItems.map((item) => (

            <div
              className="menu-card"
              key={item.id}
            >

              <div className="menu-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <span className="dish-rating">
                  ★ {item.rating}
                </span>

              </div>

              <div className="menu-info">

                <div className="dish-title">

                  <h3>{item.name}</h3>

                  <strong>
                    ₹{item.price}
                  </strong>

                </div>

                <p>
                  {item.description}
                </p>

                <div className="dish-footer">

                  <span className="dish-category">
                    {item.category}
                  </span>

                  <button
                    className="add-cart"
                    onClick={() =>
                      addToCart(item)
                    }
                  >
                    + Add
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* CART BAR */}

      {cart.length > 0 && (

        <div className="cart-bar">

          <div>

            <strong>
              🛒{" "}
              {cart.reduce(
                (total, item) =>
                  total +
                  (item.quantity || 1),
                0
              )}{" "}
              item
              {cart.reduce(
                (total, item) =>
                  total +
                  (item.quantity || 1),
                0
              ) > 1
                ? "s"
                : ""}
            </strong>

            <span>
              {" "}
              • ₹
              {cart.reduce(
                (total, item) =>
                  total +
                  item.price *
                    (item.quantity || 1),
                0
              )}
            </span>

          </div>

          <button
            onClick={() => navigate("/cart")}
          >
            View Cart →
          </button>

        </div>

      )}

    </div>
  );
}

export default RestaurantDetails;