import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
       const navigate = useNavigate();

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (restaurant) => restaurant.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="empty-favorites">
          <div className="empty-heart">♡</div>

          <h1>No Favorites Yet</h1>

          <p>
            Save your favorite restaurants here so you
            can find them quickly later.
          </p>

          <button
            onClick={() => navigate("/restaurants")}
          >
            Explore Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">

      <div className="favorites-header">
        <p className="section-label">YOUR COLLECTION</p>

        <h1>My Favorites</h1>

        <p>
          Your saved restaurants in one place.
        </p>
      </div>

      <div className="favorites-grid">

        {favorites.map((restaurant) => (

          <div
            className="favorite-card"
            key={restaurant.id}
          >

            <div className="favorite-image">
              <img
                src={restaurant.image}
                alt={restaurant.name}
              />

              <button
                className="remove-favorite"
                onClick={() =>
                  removeFavorite(restaurant.id)
                }
              >
                ♥
              </button>
            </div>

            <div className="favorite-content">

              <h2>{restaurant.name}</h2>

              <p className="favorite-cuisine">
                {restaurant.cuisine}
              </p>

              <div className="favorite-meta">

                <span>
                  ⭐ {restaurant.rating}
                </span>

                <span>
                  📍 {restaurant.location}
                </span>

                <span>
                  {restaurant.price}
                </span>

              </div>

              <button
                className="view-favorite"
                onClick={() =>
                  navigate(
                    `/restaurant/${restaurant.id}`
                  )
                }
              >
                View Restaurant →
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Favorites;