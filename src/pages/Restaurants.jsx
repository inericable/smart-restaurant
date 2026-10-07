import { useState } from "react";
import { Link } from "react-router-dom";
import "./Restaurants.css";

const restaurantData = [
  {
    id: 1,
    name: "The Bombay Kitchen",
    cuisine: "North Indian",
    type: "Veg",
    rating: 4.6,
    price: "₹₹",
    location: "Sion, Mumbai",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Spice Villa",
    cuisine: "Mughlai",
    type: "Non-Veg",
    rating: 4.4,
    price: "₹₹₹",
    location: "Matunga, Mumbai",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Urban Bites",
    cuisine: "Italian",
    type: "Veg",
    rating: 4.5,
    price: "₹₹",
    location: "Bandra, Mumbai",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Dragon House",
    cuisine: "Chinese",
    type: "Non-Veg",
    rating: 4.2,
    price: "₹₹",
    location: "Dadar, Mumbai",
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Green Leaf",
    cuisine: "Healthy",
    type: "Veg",
    rating: 4.7,
    price: "₹₹",
    location: "Bandra, Mumbai",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Royal Treat",
    cuisine: "Indian",
    type: "Non-Veg",
    rating: 4.3,
    price: "₹₹₹",
    location: "Kurla, Mumbai",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
  },
];

function Restaurants() {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [foodType, setFoodType] = useState("All");
  const [minRating, setMinRating] = useState("All");

  const filteredRestaurants = restaurantData.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(search.toLowerCase());

    const matchesCuisine =
      cuisine === "All" || restaurant.cuisine === cuisine;

    const matchesType =
      foodType === "All" || restaurant.type === foodType;

    const matchesRating =
      minRating === "All" || restaurant.rating >= Number(minRating);

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesType &&
      matchesRating
    );
  });

  return (
    <div className="restaurants-page">

      {/* HEADER */}
      <div className="listing-header">
        <div>
          <p className="section-label">DISCOVER</p>
          <h1>Restaurants Near You</h1>
          <p>
            Find restaurants, compare cuisines and explore menus.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="listing-search">
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search restaurant, cuisine or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Search</button>
      </div>

      <div className="listing-content">

        {/* FILTERS */}
        <aside className="filters">

          <div className="filter-title">
            <h3>Filters</h3>
            <button
              onClick={() => {
                setCuisine("All");
                setFoodType("All");
                setMinRating("All");
                setSearch("");
              }}
            >
              Clear
            </button>
          </div>

          <div className="filter-group">
            <h4>Cuisine</h4>

            {["All", "North Indian", "Mughlai", "Italian", "Chinese", "Healthy", "Indian"].map(
              (item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="cuisine"
                    checked={cuisine === item}
                    onChange={() => setCuisine(item)}
                  />
                  {item}
                </label>
              )
            )}
          </div>

          <div className="filter-group">
            <h4>Food Type</h4>

            {["All", "Veg", "Non-Veg"].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="foodType"
                  checked={foodType === item}
                  onChange={() => setFoodType(item)}
                />
                {item}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Rating</h4>

            {[
              ["All", "All Ratings"],
              ["4", "4.0+ ⭐"],
              ["4.5", "4.5+ ⭐"],
            ].map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === value}
                  onChange={() => setMinRating(value)}
                />
                {label}
              </label>
            ))}
          </div>

        </aside>

        {/* RESTAURANT RESULTS */}
        <main className="restaurant-results">

          <div className="results-header">
            <div>
              <h2>{filteredRestaurants.length} Restaurants Found</h2>
              <p>Showing restaurants based on your preferences</p>
            </div>

            <select>
              <option>Sort: Recommended</option>
              <option>Rating: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>

          <div className="listing-grid">

            {filteredRestaurants.map((restaurant) => (
              <div className="listing-card" key={restaurant.id}>

                <div className="listing-image">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                  />

                  <span className="food-badge">
                    {restaurant.type}
                  </span>

                  <button className="favorite">♡</button>
                </div>

                <div className="listing-info">

                  <div className="listing-name">
                    <h3>{restaurant.name}</h3>

                    <span className="rating-badge">
                      ★ {restaurant.rating}
                    </span>
                  </div>

                  <p className="listing-cuisine">
                    {restaurant.cuisine}
                  </p>

                  <div className="listing-location">
                    📍 {restaurant.location}
                    <span>{restaurant.price}</span>
                  </div>

                  <Link
  to={`/restaurant/${restaurant.id}`}
  className="view-menu">
  View Restaurant →
</Link>

                </div>

              </div>
            ))}

          </div>

          {filteredRestaurants.length === 0 && (
            <div className="no-results">
              <div>🍽️</div>
              <h2>No restaurants found</h2>
              <p>Try changing your search or filters.</p>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default Restaurants;